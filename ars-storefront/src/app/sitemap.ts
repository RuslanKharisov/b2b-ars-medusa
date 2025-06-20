// app/sitemap.ts

import { sdk } from '@/lib/config'
import { listCategories } from '@/lib/data/categories'
import { listCollections } from '@/lib/data/collections'
import { getAuthHeaders } from '@/lib/data/cookies'
import { listRegions } from '@/lib/data/regions'
import type { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://arselectronic.ru'
    const date = new Date().toISOString()

    const defaultCountryCode = 'ru'

    const [{ products }, { collections }, categories] = await Promise.all([
        sdk.store.product.list(
            { limit: 1000, fields: 'handle,updated_at' },
            { next: { tags: ['products'] }, ...(await getAuthHeaders()) }
        ),
        listCollections({ limit: '100', offset: '0' }),
        listCategories(),
    ])

    const urls: MetadataRoute.Sitemap = []

    // Главная
    urls.push({
        url: `${baseUrl}/${defaultCountryCode}`,
        lastModified: date,
    })

    // Категории
    categories.forEach((cat) => {
        const segments = cat.handle.split('/')
        segments.forEach((_, i) => {
            const path = segments.slice(0, i + 1).join('/')
            urls.push({
                url: `${baseUrl}/${defaultCountryCode}/categories/${path}`,
                lastModified: date,
            })
        })
    })

    // Коллекции
    collections?.forEach((col) => {
        urls.push({
            url: `${baseUrl}/${defaultCountryCode}/collections/${col.handle}`,
            lastModified: date,
        })
    })

    // Продукты
    products.forEach((prod) => {
        urls.push({
            url: `${baseUrl}/${defaultCountryCode}/products/${prod.handle}`,
            lastModified: prod.updated_at || date,
        })
    })

    // Статические
    urls.push(
        { url: `${baseUrl}/${defaultCountryCode}/cart`, lastModified: date },
        { url: `${baseUrl}/${defaultCountryCode}/store`, lastModified: date }
    )

    return urls
}
