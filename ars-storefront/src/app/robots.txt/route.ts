export const dynamic = "force-dynamic"

import { NextResponse } from 'next/server'
import { listRegions } from "@/lib/data/regions"

export async function GET() {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://arselectronic.ru"
    const regions = await listRegions()
    const defaultCountryCode = regions?.[0]?.countries?.[0]?.iso_2 || "ru"

    const isProd = process.env.NODE_ENV === "production";
    const hostLine = isProd ? `Host: ${baseUrl}` : "";
    const sitemapLine = isProd ? `Sitemap: ${baseUrl}/sitemap.xml` : ""

    const robotsText = `
User-Agent: *
Allow: /${defaultCountryCode}$
Allow: /${defaultCountryCode}/products/
Allow: /${defaultCountryCode}/collections/
Allow: /${defaultCountryCode}/categories/
Allow: /${defaultCountryCode}/store$
Disallow: /${defaultCountryCode}/account
Disallow: /${defaultCountryCode}/checkout
Disallow: /${defaultCountryCode}/order
Disallow: /api/
Disallow: /admin/
Disallow: /private/

User-Agent: YandexBot
Allow: /${defaultCountryCode}$
Allow: /${defaultCountryCode}/products/
Allow: /${defaultCountryCode}/collections/
Disallow: /${defaultCountryCode}/cart
Disallow: /${defaultCountryCode}/checkout
Disallow: /${defaultCountryCode}/account
Crawl-delay: 1

User-Agent: Googlebot
Allow: /${defaultCountryCode}$
Allow: /${defaultCountryCode}/products/
Allow: /${defaultCountryCode}/collections/
Disallow: /${defaultCountryCode}/cart
Disallow: /${defaultCountryCode}/checkout
Disallow: /${defaultCountryCode}/account
Crawl-delay: 1

Host: ${hostLine}
Sitemap: ${sitemapLine}
`

    return new NextResponse(robotsText, {
        headers: {
            'Content-Type': 'text/plain',
            'Cache-Control': 'public, max-age=86400'
        }
    })
}