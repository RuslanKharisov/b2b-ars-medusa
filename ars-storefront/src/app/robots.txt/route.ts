import { NextResponse } from 'next/server'
import { listRegions } from "@/lib/data/regions"

export async function GET() {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://arselectronic.ru"
    const regions = await listRegions()
    const defaultCountryCode = regions?.[0]?.countries?.[0]?.iso_2 || "ru"

    const robotsText = `
User-Agent: *
Allow: /${defaultCountryCode}$
Allow: /${defaultCountryCode}/products/.+$
Allow: /${defaultCountryCode}/collections/.+$
Allow: /${defaultCountryCode}/categories/.+$
Allow: /${defaultCountryCode}/store$
Disallow: /${defaultCountryCode}/account
Disallow: /${defaultCountryCode}/checkout
Disallow: /${defaultCountryCode}/order
Disallow: /api/
Disallow: /admin/
Disallow: /private/

User-Agent: YandexBot
User-Agent: Googlebot
Allow: /${defaultCountryCode}$
Allow: /${defaultCountryCode}/products/.+$
Allow: /${defaultCountryCode}/collections/.+$
Disallow: /${defaultCountryCode}/cart
Disallow: /${defaultCountryCode}/checkout
Disallow: /${defaultCountryCode}/account
Crawl-delay: 1

Host: ${baseUrl}
Sitemap: ${baseUrl}/sitemap.xml
`

    return new NextResponse(robotsText, {
        headers: {
            'Content-Type': 'text/plain',
            'Cache-Control': 'public, max-age=86400'
        }
    })
}