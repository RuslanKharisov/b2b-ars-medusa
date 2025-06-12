import SocFamilyItem from "./soc-family-item.tsx"

const SocFamilyList = [
  {
    title: "АО НПЦ «ЭЛВИС»",
    text: "SoM на базе SoC СКИФ® (1892VA01). Энергоэффективное и масштабируемое решение, разработанное для промышленных систем и встраиваемых приложений. Модуль сочетает низкое энергопотребление с надёжной производительностью, поддерживая широкий спектр промышленных интерфейсов.",
    iconUrl: "/images/home/soc-families/ElvisLogo.webp",
  },
  {
    title: "АО НПЦ «ЭЛВИС»",
    text: "SoM на базе SoC (1892ВМ14Я ). Встраиваемое вычислительное решение с низким энергопотреблением. Этот процессор разработан научно-производственным центром «ЭЛВИС» и используется в различных высоконадёжных системах",
    iconUrl: "/images/home/soc-families/ElvisLogo.webp",
  },
  {
    title: "Rockchip Electronics Co., Ltd.",
    text: "SoM на базе RK3588. Высокопроизводительный и энергоэффективный модуль для ARM-устройств, поддерживающий периферийные вычисления, мультимедиа и мобильные приложения. В состав процессора входят четыре ядра Cortex-A76 и четыре ядра Cortex-A55.",
    iconUrl: "/images/home/soc-families/RockChipLogo.webp",
  },
]

const SocFamilies = () => {
  return (
    <section className="bg-gradient-slate">
      <div className="content-container py-8 sm:py-16 lg:px-6">
        <div className="mb-8 max-w-screen-md lg:mb-16 mx-auto">
          <h2 className="mb-4 text-center">Выбрать семейство SoM.</h2>
          <p className="md:text-lg text-center">
            Преимущества к которым мы стремимся, это предоставить возможность
            потребителю оперативно вывести на рынок продукт, не затрачивая
            усилий на собственную разработку компонентов продукта,
            сосредоточившись на его характеристиках.
          </p>
        </div>

        <div className="space-y-8 md:grid md:grid-cols-2 md:gap-12 md:space-y-0 lg:grid-cols-3">
          {SocFamilyList.map((item, idx) => (
            <SocFamilyItem
              key={idx}
              title={item.title}
              text={item.text}
              iconUrl={item.iconUrl}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export { SocFamilies }
