import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules:
        {
            userAgent: '*',
            allow: ['/ru/', '/ru/products/', '/ru/collections/', '/ru/categories/', '/ru/store'],
            disallow: ['/ru/account', '/ru/checkout', '/ru/order', '/api/', '/admin/', '/private/'],
        },
        sitemap: 'https://arselectronic.ru/sitemap.xml',
        host: 'https://arselectronic.ru',
    }
}