import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

const SLOT_DURATION = 60 // minutes

// Working hours per day of week (0=Sun … 6=Sat), null = closed
const WORK_HOURS: Record<number, { start: number; end: number } | null> = {
  0: { start: 10, end: 20 }, // Sunday
  1: { start: 10, end: 20 }, // Monday
  2: { start: 10, end: 20 }, // Tuesday
  3: { start: 10, end: 20 }, // Wednesday
  4: { start: 10, end: 20 }, // Thursday
  5: { start: 10, end: 14 }, // Friday
  6: null,                    // Saturday — closed
}

async function getAccessToken(): Promise<string | null> {
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID ?? '',
      client_secret: process.env.GOOGLE_CLIENT_SECRET ?? '',
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN ?? '',
      grant_type: 'refresh_token',
    }),
  })
  const data = await res.json()
  return data.access_token ?? null
}

function toIsraelMinutes(dateStr: string): number {
  const d = new Date(dateStr)
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Jerusalem',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  }).formatToParts(d)
  let h = parseInt(parts.find(p => p.type === 'hour')?.value ?? '0')
  const m = parseInt(parts.find(p => p.type === 'minute')?.value ?? '0')
  if (h === 24) h = 0
  return h * 60 + m
}

export async function GET(req: NextRequest) {
  const date = req.nextUrl.searchParams.get('date') // YYYY-MM-DD
  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json({ error: 'Invalid date' }, { status: 400 })
  }

  // Day of week in Israel timezone
  const dayOfWeekStr = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Jerusalem',
    weekday: 'short',
  }).format(new Date(date + 'T12:00:00+02:00'))
  const dayMap: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }
  const hours = WORK_HOURS[dayMap[dayOfWeekStr]]

  if (!hours) {
    return NextResponse.json({ slots: [] }, { headers: { 'Cache-Control': 'no-store' } })
  }

  const accessToken = await getAccessToken()
  if (!accessToken) {
    return NextResponse.json({ error: 'Calendar unavailable' }, { status: 500 })
  }

  // Fetch events for the day
  const timeMin = encodeURIComponent(`${date}T00:00:00+02:00`)
  const timeMax = encodeURIComponent(`${date}T23:59:59+03:00`)

  const eventsRes = await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=${timeMin}&timeMax=${timeMax}&singleEvents=true`,
    { headers: { Authorization: `Bearer ${accessToken}` } }
  )
  const eventsData = await eventsRes.json()

  // Extract busy intervals (in Israel minutes from midnight)
  const busy: Array<{ start: number; end: number }> = []
  for (const event of eventsData.items ?? []) {
    if (event.start?.dateTime && event.end?.dateTime) {
      busy.push({
        start: toIsraelMinutes(event.start.dateTime),
        end: toIsraelMinutes(event.end.dateTime),
      })
    }
  }

  // Today in Israel — block past slots (+60min buffer)
  const israelToday = new Intl.DateTimeFormat('sv-SE', { timeZone: 'Asia/Jerusalem' }).format(new Date())
  const isToday = date === israelToday
  let nowMinutes = 0
  if (isToday) {
    const nowParts = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Asia/Jerusalem',
      hour: 'numeric',
      minute: 'numeric',
      hour12: false,
    }).formatToParts(new Date())
    const nh = parseInt(nowParts.find(p => p.type === 'hour')?.value ?? '0')
    const nm = parseInt(nowParts.find(p => p.type === 'minute')?.value ?? '0')
    nowMinutes = nh * 60 + nm + 60 // +60min buffer
  }

  // Generate available slots
  const slots: string[] = []
  for (let m = hours.start * 60; m + SLOT_DURATION <= hours.end * 60; m += SLOT_DURATION) {
    if (isToday && m < nowMinutes) continue
    const overlaps = busy.some(b => m < b.end && m + SLOT_DURATION > b.start)
    if (!overlaps) {
      const hh = String(Math.floor(m / 60)).padStart(2, '0')
      const mm = String(m % 60).padStart(2, '0')
      slots.push(`${hh}:${mm}`)
    }
  }

  return NextResponse.json({ slots }, { headers: { 'Cache-Control': 'no-store' } })
}
