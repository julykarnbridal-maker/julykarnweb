import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { firstName, lastName, phone, date, message, email } = body

    if (!firstName || !lastName || !phone) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const fullName = `${firstName} ${lastName}`
    const now = new Date().toISOString()
    const notes = [
      message ? `Сообщение: ${message}` : '',
      date ? `Желаемая дата встречи: ${date}` : '',
    ].filter(Boolean).join('\n')

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
        date ? `📅 *Желаемая дата:* ${date}` : '',
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

      // Send to personal chat and group
      if (chatId) await sendTo(chatId)
      await sendTo(groupId)
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[LEAD ERROR]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
