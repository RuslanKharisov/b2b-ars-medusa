import type { MetadataRoute } from 'next'
import { listRegions } from "@/lib/data/regions";

export default async function robots(): Promise<MetadataRoute.Robots> {
    const baseUrl = 'https://arselectronic.ru';
    const regions = await listRegions();
    const defaultCountryCode = regions?.[0]?.countries?.[0]?.iso_2 || "ru";

    return {
        rules: [
            {
                userAgent: '*',
                allow: [
                    `/${defaultCountryCode}`,
                    `/${defaultCountryCode}/products/`,
                    `/${defaultCountryCode}/collections/`,
                    `/${defaultCountryCode}/categories/`,
                    `/${defaultCountryCode}/store`
                ],
                disallow: [
                    `/${defaultCountryCode}/account`,
                    `/${defaultCountryCode}/checkout`,
                    `/${defaultCountryCode}/order`,
                    '/api',
                    '/admin',
                    '/private'
                ],
            },
            {
                userAgent: 'YandexBot',
                allow: [
                    `/${defaultCountryCode}`,
                    `/${defaultCountryCode}/products/`,
                    `/${defaultCountryCode}/collections/`,
                    `/${defaultCountryCode}/categories/`
                ],
                disallow: [
                    `/${defaultCountryCode}/cart`,
                    `/${defaultCountryCode}/checkout`
                ],
                crawlDelay: 1,
            }
        ],
        sitemap: `${baseUrl}/sitemap.xml`,
        host: baseUrl,
    };
}