import { NextResponse } from "next/server";
import { sdk } from "@/lib/config";
import { getAuthHeaders } from "@/lib/data/cookies";
import { listRegions } from "@/lib/data/regions";
import { listCategories } from "@/lib/data/categories";
import { listCollections } from "@/lib/data/collections";

export async function GET() {
  const baseUrl = "https://arselectronic.ru";
  const date = new Date().toISOString();

  try {
    // Получаем регионы и определяем countryCode
    const regions = await listRegions();
    const defaultCountryCode = regions?.[0]?.countries?.[0]?.iso_2 || "ru";

    // Получаем данные параллельно
    const [
      { products },
      { collections },
      categories
    ] = await Promise.all([
      sdk.store.product.list(
        { limit: 1000, fields: "handle,updated_at" },
        { next: { tags: ["products"] }, ...(await getAuthHeaders()) }
      ),
      listCollections({ limit: "100", offset: "0" }),
      listCategories()
    ]);

    const generateUrl = (path: string, priority: number, changefreq: string, lastmod?: string) => `
      <url>
        <loc>${baseUrl}${path}</loc>
        <lastmod>${lastmod || date}</lastmod>
        <changefreq>${changefreq}</changefreq>
        <priority>${priority}</priority>
      </url>
    `;

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <!-- Основные страницы -->
        ${generateUrl(`/${defaultCountryCode}`, 1.0, 'daily')}
        
        <!-- Категории (с учетом вложенности) -->
        ${categories.map(cat => {
      const pathSegments = cat.handle.split('/');
      return pathSegments.map((_, index) => {
        const path = pathSegments.slice(0, index + 1).join('/');
        return generateUrl(
          `/${defaultCountryCode}/categories/${path}`,
          index === pathSegments.length - 1 ? 0.8 : 0.7,
          'weekly'
        );
      }).join('');
    }).join('')}
        
        <!-- Коллекции -->
        ${collections?.map(col =>
      generateUrl(
        `/${defaultCountryCode}/collections/${col.handle}`,
        0.85,
        'weekly'
      )
    ).join('') || ''}
        
        <!-- Товары -->
        ${products.map(prod => {
      const lastmod = prod.updated_at ? prod.updated_at : undefined;
      return generateUrl(
        `/${defaultCountryCode}/products/${prod.handle}`,
        0.7,
        'monthly',
        lastmod
      );
    }).join('')}
        
        <!-- Статические страницы -->
        ${generateUrl(`/${defaultCountryCode}/cart`, 0.5, 'monthly')}
        ${generateUrl(`/${defaultCountryCode}/store`, 0.6, 'weekly')}
      </urlset>
    `;

    return new NextResponse(sitemap, {
      headers: {
        "Content-Type": "text/xml",
        "Cache-Control": "public, max-age=3600, stale-while-revalidate=1800",
      },
    });
  } catch (error) {
    console.error("Sitemap generation error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}