import { listCategories } from "@/lib/data/categories"
import { listCollections } from "@/lib/data/collections"
import { Text, clx } from "@medusajs/ui"
import Image from "next/image"

import LocalizedClientLink from "@/modules/common/components/localized-client-link"
import MedusaCTA from "@/modules/layout/components/medusa-cta"

export default async function Footer() {
  const { collections } = await listCollections({
    offset: "0",
    limit: "6",
  })
  const product_categories = await listCategories({
    offset: 0,
    limit: 6,
  })

  return (
    <footer className="border-t border-ui-border-base w-full">
      <div className="content-container flex flex-col w-full">
        <div className="flex flex-col gap-y-6 xsmall:flex-row items-start justify-between py-40">
          <div className="w-full sm:w-auto">
            <LocalizedClientLink
              href="/"
              className="txt-compact-xlarge-plus hover:text-ui-fg-base uppercase h-full py-2 w-1/2 md:w-full flex justify-center items-center"
              data-testid="nav-store-link"
            >
              <Image
                src="/images/home/ARS logo black_transparent.svg"
                width={240}
                height={60}
                alt="ARS Electronic Logo"
                className="h-full"
              />
            </LocalizedClientLink>
          </div>

          {/* Основной контейнер для 4 колонок */}
          <div className="text-small-regular gap-10 md:gap-x-16 grid grid-cols-2 sm:grid-cols-4">
            {/* Категории */}
            {product_categories && product_categories?.length > 0 && (
              <div className="flex flex-col gap-y-2">
                <span className="txt-small-plus txt-ui-fg-base">Категории</span>
                <ul className="grid grid-cols-1 gap-2 text-ui-fg-subtle txt-small">
                  {product_categories?.slice(0, 6).map((c) => {
                    if (c.parent_category) {
                      return null
                    }

                    const children =
                      c.category_children?.map((child) => ({
                        name: child.name,
                        handle: child.handle,
                        id: child.id,
                      })) || null

                    return (
                      <li
                        className="flex flex-col gap-2 text-ui-fg-subtle txt-small"
                        key={c.id}
                      >
                        <LocalizedClientLink
                          className={clx(
                            "hover:text-ui-fг-base",
                            children && "txt-small-plus"
                          )}
                          href={`/categories/${c.handle}`}
                          data-testid="category-link"
                        >
                          {c.name}
                        </LocalizedClientLink>
                        {children && (
                          <ul className="grid grid-cols-1 ml-3 gap-2">
                            {children.map((child) => (
                              <li key={child.id}>
                                <LocalizedClientLink
                                  className="hover:text-ui-fg-base"
                                  href={`/categories/${child.handle}`}
                                  data-testid="category-link"
                                >
                                  {child.name}
                                </LocalizedClientLink>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    )
                  })}
                </ul>
              </div>
            )}

            {/* Контакты */}
            <div className="flex flex-col gap-y-2">
              <span className="txt-small-plus txt-ui-fг-base">Контакты</span>
              <ul className="grid grid-cols-1 gap-y-2 text-ui-fг-subtle txt-small">
                <li> Россия, Республика Татарстан</li>
                <li> г. Казань, ул. Сибгата Хакима, д. 5А</li>
                <li>
                  <a href="tel:+7 (917) 869-64-82" title="Свяжитесь с нами">
                    📞 +7 (917) 869-64-82
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:hrr@keravt.ru"
                    title="Свяжитесь с нами"
                    target="_blank"
                  >
                    📧 hrr@keravt.ru
                  </a>
                </li>
              </ul>
            </div>

            {/* Коллекции */}
            {collections && collections.length > 0 && (
              <div className="flex flex-col gap-y-2">
                <span className="txt-small-plus txt-ui-fг-base">Коллекции</span>
                <ul
                  className={clx(
                    "grid grid-cols-1 gap-2 text-ui-fг-subtle txt-small",
                    {
                      "grid-cols-2": (collections?.length || 0) > 3,
                    }
                  )}
                >
                  {collections?.slice(0, 6).map((c) => (
                    <li key={c.id}>
                      <LocalizedClientLink
                        className="hover:text-ui-fг-base"
                        href={`/collections/${c.handle}`}
                      >
                        {c.title}
                      </LocalizedClientLink>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* О нас */}
            <div className="flex flex-col gap-y-2">
              <span className="txt-small-plus txt-ui-fг-base">О компании</span>
              <ul className="grid grid-cols-1 gap-y-2 text-ui-fг-subtle txt-small">
                <li>
                  <LocalizedClientLink
                    href={`/`}
                    className={clx("hover:text-ui-fг-base")}
                  >
                    О компании
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    href={`/`}
                    className={clx("hover:text-ui-fг-base")}
                  >
                    Политика конфиденчности
                  </LocalizedClientLink>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex w-full mb-16 justify-between text-ui-fг-muted">
          <Text className="txt-compact-small">
            © {new Date().getFullYear()} ARS Electronic.
          </Text>
          <MedusaCTA />
        </div>
      </div>
    </footer>
  )
}
