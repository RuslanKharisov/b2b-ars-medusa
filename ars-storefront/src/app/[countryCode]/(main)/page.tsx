import { listRegions } from "@/lib/data/regions"
import Brief from "@/modules/home/components/brief"
import FeaturedProducts from "@/modules/home/components/featured-products"
import Hero from "@/modules/home/components/hero"
import { SeoArticle } from "@/modules/home/components/seo-article"
import { SocFamilies } from "@/modules/home/components/soc-families"
import SkeletonFeaturedProducts from "@/modules/skeletons/templates/skeleton-featured-products"
import { Metadata } from "next"
import { Suspense } from "react"

export const dynamicParams = true

export const metadata: Metadata = {
  title: "SoM модули и промышленные контроллеры | ARS Electronic",
  description:
    "Высокопроизводительные SoM-модули и российские промышленные контроллеры для импортозамещения и автоматизации производства.",
  keywords: [
    "sом модуль",
    "компьютер на модуле",
    "arm процессоры",
    "rk3588",
    "элвис",
    "промышленные контроллеры",
    "embedded systems",
    "linux",
    "qnx",
    "freertos",
    "ars electronic",
  ],
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params

  const { countryCode } = params

  return (
    <div className="flex flex-col gap-y-2 m-2">
      <Suspense fallback={<SkeletonFeaturedProducts />}>
        <Hero />
        <Brief />
        <SocFamilies />
        <SeoArticle />
        <FeaturedProducts countryCode={countryCode} />
      </Suspense>
    </div>
  )
}
