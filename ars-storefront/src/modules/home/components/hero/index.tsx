"use client"

import Image from "next/image"
import RequestQuoteForm from "@/modules/quotes/components/request-quote-form"
import Button from "@/modules/common/components/button"

const Hero = () => {
  return (
    <div className="md:h-[65vh] w-full border-b border-ui-border-base bg-gradient-slate">
      <div className="content-container h-full px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 flex-col flex lg:flex-row overflow-hidden">
        <div className="mr-auto place-self-center">
          <h1 className="max-w-2xl mb-4">
            SoM-модули от ARS Electronic: решения для промышленных систем и
            встраиваемых приложений
          </h1>
          <p className="max-w-2xl mb-6 lg:mb-8">
            Компьютеры на модулях (SoM / CoM) — надёжная и экономически
            эффективная платформа для создания промышленного оборудования,
            автоматизации производства и импортозамещения. ARS Electronic
            предлагает готовые вычислительные модули на базе российских
            процессоров ЭЛВИС и Rockchip RK3588 — решения с поддержкой Linux,
            FreeRTOS и QNX.
          </p>

          <RequestQuoteForm>
            <Button variant="secondary" size="xlarge">
              Подобрать SoM модуль
            </Button>
          </RequestQuoteForm>
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
