import { NextResponse } from "next/server";

export async function GET() {
    const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url><loc>https://arselectronic.ru/ru</loc></url> 
      <url><loc>https://arselectronic.ru/en</loc></url> 
    </urlset>
  `;
    return new NextResponse(sitemap, {
        headers: {
            "Content-Type": "text/xml",
        },
    });
}