import { CircleCheck } from "@/shared/icons/circle-check"
import { Button } from "@medusajs/ui"
import Image from "next/image"
import Link from "next/link"

const features = [
  {
    title: "Готовое к использованию решение",
  },
  {
    title: "Ускорение выхода на рынок и сокращение времени разработки",
  },
  {
    title: "Надежная и долгосрочная доступность продукции",
  },
  {
    title:
      "Работает в экстремальных условиях, при высокой вибрации и высокой влажности",
  },
]

const Brief = () => {
  return (
    <section className="mb-10">
      <div className="content-container mx-auto px-4 py-10">
        <h2 className="text-center md:mb-10">Подобрать SoM модуль</h2>
        <div className="flex flex-col lg:flex-row w-full justify-center items-center gap-6">
          <div className="">
            <Image
              src="/images/home/hero/Q7-Skif-hero.webp"
              alt="Toradex Module"
              width={350}
              height={350}
              className="w-full h-auto"
            />
          </div>
          <div className=" space-y-4">
            {features.map((feature, i) => (
              <div key={i} className="flex items-center space-x-4">
                <div className="small-icon">
                  <CircleCheck width={40} height={40} />
                </div>
                <div className="small-icon-info">
                  <p className="">{feature.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col md:flex-row gap-5 justify-center items-center space-x-4">
          <Link href="/store" className="w-full md:w-fit">
            <Button
              variant="secondary"
              size="xlarge"
              className="w-full md:w-fit"
            >
              Выбрать модуль в каталоге
            </Button>
          </Link>
          <Button
            variant="primary"
            size="xlarge"
            className="w-full md:w-fit !ml-0"
          >
            Помочь подобрать
          </Button>
        </div>
      </div>
    </section>
  )
}

export default Brief
