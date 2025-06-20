import type { MetadataRoute } from 'next'
import { listRegions } from "@/lib/data/regions";

export default async function robots(): Promise<MetadataRoute.Robots> {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://arselectronic.ru";
    const defaultCountryCode = "ru";

    return {
        rules: [
            {
                userAgent: '*',
                allow: [
                    `/${defaultCountryCode}$`,
                    `/${defaultCountryCode}/products/`,
                    `/${defaultCountryCode}/collections/`,
                    `/${defaultCountryCode}/categories/`,
                    `/${defaultCountryCode}/store$`
                ],
                disallow: [
                    `/${defaultCountryCode}/account`,
                    `/${defaultCountryCode}/checkout`,
                    `/${defaultCountryCode}/order`,
                    '/api/',
                    '/admin/',
                    '/private/'
                ],
            },
            {
                userAgent: ['YandexBot'],
                allow: [
                    `/${defaultCountryCode}$`,
                    `/${defaultCountryCode}/products/`,
                    `/${defaultCountryCode}/collections/`
                ],
                disallow: [
                    `/${defaultCountryCode}/cart`,
                    `/${defaultCountryCode}/checkout`,
                    `/${defaultCountryCode}/account`
                ],
                crawlDelay: 1,
            },
            {
                userAgent: ['Googlebot'],
                allow: [
                    `/${defaultCountryCode}$`,
                    `/${defaultCountryCode}/products/`,
                    `/${defaultCountryCode}/collections/`
                ],
                disallow: [
                    `/${defaultCountryCode}/cart`,
                    `/${defaultCountryCode}/checkout`,
                    `/${defaultCountryCode}/account`
                ],
                crawlDelay: 1,
            }
        ],
        sitemap: `${baseUrl}/sitemap.xml`,
        host: baseUrl,
    };
}