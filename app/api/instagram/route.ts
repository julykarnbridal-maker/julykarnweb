import { NextResponse } from 'next/server'

const BEHOLD_URL = 'https://feeds.behold.so/YPQMOE1Yc6FeE1JsN9Iz'

export async function GET() {
  try {
    const res = await fetch(BEHOLD_URL, {
      next: { revalidate: 3600 }, // cache 1 hour
    })

    if (!res.ok) {
      return NextResponse.json({ posts: [] })
    }

    const data = await res.json()

    const posts = (data.posts as {
      id: string
      permalink: string
      thumbnailUrl?: string
      sizes?: { medium?: { mediaUrl: string } }
    }[])
      .slice(0, 6)
      .map(p => ({
        id: p.id,
        url: p.sizes?.medium?.mediaUrl || p.thumbnailUrl || '',
        permalink: p.permalink,
      }))
      .filter(p => p.url)

    return NextResponse.json({ posts })
  } catch (err) {
    console.error('Behold fetch error:', err)
    return NextResponse.json({ posts: [] })
  }
}
