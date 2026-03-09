import { NextRequest, NextResponse } from 'next/server'

const SLOT_DURATION = 60 // minutes

async function getCalendarAccessToken(): Promise<string | null> {
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

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { firstName, lastName, phone, date, time, message, email } = body

    if (!firstName || !lastName || !phone) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const fullName = `${firstName} ${lastName}`
    const now = new Date().toISOString()
    const notes = [
      message ? `Сообщение: ${message}` : '',
      date ? `Желаемая дата встречи: ${date}${time ? ` в ${time}` : ''}` : '',
    ].filter(Boolean).join('\n')

    // ── Race condition check ───────────────────────────
    // If date + time selected — verify slot is still free before saving anything
    if (date && time && process.env.GOOGLE_CLIENT_ID) {
      try {
        const accessToken = await getCalendarAccessToken()
        if (accessToken) {
          const timeMin = encodeURIComponent(`${date}T00:00:00+02:00`)
          const timeMax = encodeURIComponent(`${date}T23:59:59+03:00`)
          const eventsRes = await fetch(
            `https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=${timeMin}&timeMax=${timeMax}&singleEvents=true`,
            { headers: { Authorization: `Bearer ${accessToken}` } }
          )
          const eventsData = await eventsRes.json()

          const [slotH, slotM] = time.split(':').map(Number)
          const slotStart = slotH * 60 + slotM
          const slotEnd = slotStart + SLOT_DURATION

          const isBusy = (eventsData.items ?? []).some((event: { start?: { dateTime?: string }; end?: { dateTime?: string } }) => {
            if (!event.start?.dateTime || !event.end?.dateTime) return false
            const eStart = toIsraelMinutes(event.start.dateTime)
            const eEnd = toIsraelMinutes(event.end.dateTime)
            return slotStart < eEnd && slotEnd > eStart
          })

          if (isBusy) {
            return NextResponse.json({ error: 'slot_taken' }, { status: 409 })
          }
        }
      } catch (e) {
        console.error('[RACE CHECK ERROR]', e)
        // Don't block submission if check fails
      }
    }

    // ── Notion ────────────────────────────────────────
    const notionToken = process.env.NOTION_TOKEN
    const notionDb = process.env.NOTION_DATABASE_ID

    if (notionToken && notionDb) {
      const properties: Record<string, unknown> = {
        'Account name': {
          title: [{ text: { content: fullName } }],
        },
        'Phone number': {
          phone_number: phone,
        },
        'Date': {
          date: { start: now },
        },
        'Status': {
          select: { name: 'New' },
        },
      }

      if (email) {
        properties['Contact email'] = { email }
      }

      if (notes) {
        properties['Notes'] = {
          rich_text: [{ text: { content: notes } }],
        }
      }

      await fetch('https://api.notion.com/v1/pages', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${notionToken}`,
          'Content-Type': 'application/json',
          'Notion-Version': '2022-06-28',
        },
        body: JSON.stringify({
          parent: { database_id: notionDb },
          properties,
        }),
      }).then(async r => {
        if (!r.ok) console.error('[NOTION ERROR]', await r.text())
      }).catch(e => console.error('[NOTION FETCH ERROR]', e))
    }

    // ── Telegram ──────────────────────────────────────
    const botToken = process.env.TELEGRAM_BOT_TOKEN
    const chatId = process.env.TELEGRAM_CHAT_ID
    const groupId = '-1003854328820'

    if (botToken) {
      const text = [
        '🌹 *Новая заявка — Julie Karn Bridal*',
        '',
        `👤 *Имя:* ${fullName}`,
        `📞 *Телефон:* ${phone}`,
        email ? `✉️ *Email:* ${email}` : '',
        date ? `📅 *Дата:* ${date}${time ? ` в ${time}` : ''}` : '',
        message ? `💬 *Сообщение:* ${message}` : '',
        '',
        `🕐 ${new Date().toLocaleString('he-IL', { timeZone: 'Asia/Jerusalem' })}`,
      ].filter(l => l !== '').join('\n')

      const sendTo = async (id: string) => {
        await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ chat_id: id, text, parse_mode: 'Markdown' }),
        }).catch(() => {})
      }

      if (chatId) await sendTo(chatId)
      await sendTo(groupId)
    }

    // ── Google Calendar ───────────────────────────────
    if (date && time && process.env.GOOGLE_CLIENT_ID) {
      try {
        const accessToken = await getCalendarAccessToken()
        if (accessToken) {
          const [hh, mm] = time.split(':').map(Number)
          const endHh = String(hh + 1).padStart(2, '0')
          const startDt = `${date}T${time}:00`
          const endDt = `${date}T${endHh}:${String(mm).padStart(2, '0')}:00`

          const description = [
            `שם: ${fullName}`,
            `טלפון: ${phone}`,
            email ? `אימייל: ${email}` : '',
            message ? `הודעה: ${message}` : '',
          ].filter(Boolean).join('\n')

          await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              summary: `👗 מדידה — ${fullName}`,
              description,
              start: { dateTime: startDt, timeZone: 'Asia/Jerusalem' },
              end: { dateTime: endDt, timeZone: 'Asia/Jerusalem' },
              reminders: {
                useDefault: false,
                overrides: [
                  { method: 'email', minutes: 24 * 60 },
                  { method: 'popup', minutes: 60 },
                ],
              },
            }),
          }).then(async r => {
            if (!r.ok) console.error('[GCAL ERROR]', await r.text())
          })
        }
      } catch (e) {
        console.error('[GCAL FETCH ERROR]', e)
      }
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[LEAD ERROR]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
