import Button from "@/modules/common/components/button"
import Link from "next/link"

const SeoArticle = () => {
  return (
    <section className="bg-white py-12">
      <div className="content-container mx-auto flex flex-col gap-y-4 px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          Добро пожаловать в ARS Electronic — ваш надежный поставщик SoM -
          модулей и embedded решений
        </h2>

        <p className="text-lg">
          Компания <strong> ARS Electronic </strong> специализируется на
          разработке систем на модуле (SoM) в индустриальном исполнении,
          встраиваемых контроллеров и компонентов микроэлектроники для
          промышленной автоматизации, машиностроения, нефтегазовой отрасли и
          других направлений.Мы предлагаем решения на базе российских
          процессоров от компании
          <strong> НПЦ ЭЛВИС.</strong>
        </p>
        <p>
          Также разработан модуль на базе процессора<strong>RK3588</strong> от
          <strong>Rockchip</strong>.
        </p>

        <p className="text-lg ">Наши клиенты получают:</p>

        <ul className="list-disc pl-5 space-y-2 text-lg ">
          <li>
            <strong>Готовые вычислительные модули </strong> для быстрого вывода
            продукта на рынок;
          </li>
          <li>
            <strong>Поддержку Linux, FreeRTOS и QNX </strong> для разработки
            программного обеспечения;
          </li>
          <li>
            <strong>Работу в экстремальных условиях </strong> — температурный
            диапазон от -40°C до +85°C;
          </li>
          <li>
            <strong>
              Полное соответствие требованиям законодательства РФ{" "}
            </strong>{" "}
            при участии в государственных тендерах.
          </li>
        </ul>

        <p className="text-lg ">
          Если вы ищете <strong> российские контроллеры </strong> для задач
          автоматизации,
          <strong> промышленные SoM - модули </strong> или решения для систем с
          длительным сроком эксплуатации — мы поможем вам подобрать оптимальное
          оборудование, сертифицированное и готовое к внедрению в любую область
          применения.
        </p>

        <p className="text-lg ">У нас вы найдете:</p>

        <ul className="list-disc pl-5 space-y-2 text-lg ">
          <li>Промышленные компьютеры на модуле(SoM); </li>
          <li> Высоконадёжные решения с низким энергопотреблением; </li>
          <li>
            {" "}
            Модули с широкой поддержкой интерфейсов: UART, SPI, CAN, I²C,
            Ethernet;{" "}
          </li>
          <li>
            {" "}
            Техническую поддержку и индивидуальные условия сотрудничества.
          </li>
        </ul>

        <p className="text-lg ">
          Мы помогаем нашим клиентам реализовывать проекты с использованием
          современной отечественной микроэлектроники. Все наши решения
          адаптированы для работы в суровых условиях: высокая вибрация,
          влажность, перепады температуры.
        </p>

        <p className="text-lg ">
          Для получения более подробной информации о наших продуктах и условиях
          сотрудничества воспользуйтесь формой запроса коммерческого
          предложения.{" "}
        </p>

        <div className="flex justify-center mt-8">
          <Link href="/store" className="btn btn-primary">
            <Button
              variant="secondary"
              size="xlarge"
              className="w-full md:w-fit"
            >
              Посмотреть каталог SoM - модулей
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

export { SeoArticle }
