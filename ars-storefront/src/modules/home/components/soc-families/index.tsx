import SocFamilyItem from "./soc-family-item.tsx"

const SocFamilyList = [
  {
    title: "АО НПЦ «ЭЛВИС»",
    text: "SoM на базе SoC СКИФ® (1892VA01). Энергоэффективное и масштабируемое решение, разработанное для промышленных систем и встраиваемых приложений. Модуль сочетает низкое энергопотребление с надёжной производительностью, поддерживая широкий спектр промышленных интерфейсов.",
    iconUrl: "/images/home/soc-families/ElvisLogo.webp",
  },
  {
    title: "АО НПЦ «ЭЛВИС»",
    text: "SoM на базе процессора 1892ВМ14Я. Встраиваемое вычислительное решение с низким энергопотреблением, предназначенное для высоконадёжных систем. Применяется в станках, системах управления и промышленной электронике.",
    iconUrl: "/images/home/soc-families/ElvisLogo.webp",
  },
  {
    title: "Rockchip Electronics Co., Ltd.",
    text: "SoM на базе RK3588 — высокопроизводительный ARM-модуль для периферийных вычислений, мультимедиа и мобильных приложений. Оборудован четырьмя ядрами Cortex-A76 и четырьмя Cortex-A55. Подходит для систем с высокими требованиями к графической мощности и AI.",
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
            Мы предлагаем широкий выбор встраиваемых решений на базе российских
            и международных процессоров. Наши SoM-модули подходят для задач
            промышленной автоматизации, мультимедийных терминалов, систем
            управления оборудованием и других требовательных проектов.
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
