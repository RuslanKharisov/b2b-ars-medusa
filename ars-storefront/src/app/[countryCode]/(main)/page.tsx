import { listRegions } from "@/lib/data/regions"
import Brief from "@/modules/home/components/brief"
import FeaturedProducts from "@/modules/home/components/featured-products"
import Hero from "@/modules/home/components/hero"
import { SocFamilies } from "@/modules/home/components/soc-families"
import SkeletonFeaturedProducts from "@/modules/skeletons/templates/skeleton-featured-products"
import { Metadata } from "next"
import { Suspense } from "react"

export const dynamicParams = true

export const metadata: Metadata = {
  title: "ARS Electronic, SOM Модули Российского производства",
  description: "Разработка и производство SOM модулей в России.",
}

export async function generateStaticParams() {
  const countryCodes = await listRegions().then(
    (regions) =>
      regions
        ?.map((r) => r.countries?.map((c) => c.iso_2))
        .flat()
        .filter(Boolean) as string[]
  )
  return countryCodes.map((countryCode) => ({ countryCode }))
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
        <FeaturedProducts countryCode={countryCode} />
      </Suspense>
    </div>
  )
}
