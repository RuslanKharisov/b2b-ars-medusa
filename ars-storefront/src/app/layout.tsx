import { getBaseURL } from "@/lib/util/env"
import { Toaster } from "@medusajs/ui"
import { GeistSans } from "geist/font/sans"
import { Metadata } from "next"
import "@/styles/globals.css"
import YandexMetrikaContainer from "@/modules/common/components/yandex-metrika"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default function RootLayout(props: { children: React.ReactNode }) {
  const analyticsEnabled = !!(process.env.NODE_ENV === "production")
  return (
    <html lang="ru" data-mode="light" className={GeistSans.variable}>
      <body>
        <main className="relative">{props.children}</main>
        <Toaster className="z-[99999]" position="bottom-left" />
        <YandexMetrikaContainer enabled={analyticsEnabled} />
      </body>
    </html>
  )
}
