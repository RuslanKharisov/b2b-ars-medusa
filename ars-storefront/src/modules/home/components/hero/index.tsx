"use client"

import { Github } from "@medusajs/icons"
import { Heading } from "@medusajs/ui"
import Button from "@/modules/common/components/button"
import Image from "next/image"

const Hero = () => {
  return (
    <div className="h-[65vh] w-full border-b border-ui-border-base bg-ui-bg-subtle">
      <div className="content-container h-full px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 flex-col flex lg:flex-row overflow-hidden">
        <div className="mr-auto place-self-center">
          <h1 className="max-w-2xl mb-4">Компьютер на модуле (SoM)</h1>
          <p className="max-w-2xl mb-6 lg:mb-8">
            Компьютеры на модулях (CoM) / Системы на модулях (SoM) предлагают
            надежную и экономически эффективную встроенную платформу для
            создания конечных продуктов. ARS Electronic предлагает широкий
            спектр CoM, использующих ведущие системы на чипах (SoC) на базе Arm
          </p>

          <Button variant="secondary" size="xlarge" className="">
            Подобрать SoM модуль
          </Button>
        </div>
        <div className="hidden lg:mt-0 lg:flex  ">
          <Image
            src="/images/home/hero/Q7-Skif-hero.webp"
            width={700}
            height={700}
            alt="SoM module Q7"
            className="object-cover"
          />
        </div>
      </div>
    </div>
  )
}

export default Hero
