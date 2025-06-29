import { retrieveCart } from "@/lib/data/cart"
import { retrieveCustomer } from "@/lib/data/customer"
import AccountButton from "@/modules/account/components/account-button"
import CartButton from "@/modules/cart/components/cart-button"
import LocalizedClientLink from "@/modules/common/components/localized-client-link"
import FilePlus from "@/modules/common/icons/file-plus"
import LogoIcon from "@/modules/common/icons/logo"
import { MegaMenuWrapper } from "@/modules/layout/components/mega-menu"
import { RequestQuoteConfirmation } from "@/modules/quotes/components/request-quote-confirmation"
import { RequestQuotePrompt } from "@/modules/quotes/components/request-quote-prompt"
import SkeletonAccountButton from "@/modules/skeletons/components/skeleton-account-button"
import SkeletonCartButton from "@/modules/skeletons/components/skeleton-cart-button"
import SkeletonMegaMenu from "@/modules/skeletons/components/skeleton-mega-menu"
import { Suspense } from "react"
import Image from "next/image"
import RequestQuoteForm from "@/modules/quotes/components/request-quote-form"
import Button from "@/modules/common/components/button"

export async function NavigationHeader() {
  const customer = await retrieveCustomer().catch(() => null)
  const cart = await retrieveCart()

  return (
    <div className="sticky top-0 inset-x-0 group bg-white text-zinc-900 small:p-4 p-2 text-sm border-b duration-200 border-ui-border-base z-50">
      <header className="flex w-full content-container relative small:mx-auto justify-between">
        <div className="small:mx-auto flex justify-between items-center min-w-full">
          <div className="flex items-center small:space-x-4">
            <LocalizedClientLink
              href="/"
              className="txt-compact-xlarge-plus hover:text-ui-fg-base uppercase h-full py-2 w-full flex justify-center items-center"
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

            <nav>
              <ul className="space-x-4 hidden small:flex">
                <li>
                  <Suspense fallback={<SkeletonMegaMenu />}>
                    <MegaMenuWrapper />
                  </Suspense>
                </li>
              </ul>
            </nav>
          </div>
          <div className="flex justify-end items-center gap-2">
            <div className="relative mr-2 hidden small:inline-flex">
              <input
                disabled
                type="text"
                placeholder="Поиск ..."
                className="bg-gray-100 text-zinc-900 px-4 py-2 rounded-full pr-10 shadow-borders-base hidden small:inline-block hover:cursor-not-allowed"
                title="Install a search provider to enable product search"
              />
            </div>

            <div className="h-4 w-px bg-neutral-300" />

            <RequestQuoteForm>
              <Button className="px-5 min-w-44">
                <FilePlus size={24} />
                <span className="small:inline-block">Запросить КП</span>
              </Button>
            </RequestQuoteForm>

            {/* {customer && cart?.items && cart.items.length > 0 ? (
              <RequestQuoteConfirmation>
                <button
                  className="flex gap-1.5 items-center rounded-2xl bg-none shadow-none border-none hover:bg-neutral-100 px-2 py-1"
                  // disabled={isPendingApproval}
                >
                  <FilePlus />
                  <span className="hidden small:inline-block">
                    Запросить КП1
                  </span>
                </button>
              </RequestQuoteConfirmation>
            ) : (
              <RequestQuotePrompt>
                <button className="flex gap-1.5 items-center rounded-2xl bg-none shadow-none border-none hover:bg-neutral-100 px-2 py-1">
                  <FilePlus />
                  <span className="hidden small:inline-block">
                    Запросить КП2
                  </span>
                </button>
              </RequestQuotePrompt>
            )} */}

            {/* <Suspense fallback={<SkeletonAccountButton />}>
              <AccountButton customer={customer} />
            </Suspense> */}

            {/* <Suspense fallback={<SkeletonCartButton />}>
              <CartButton />
            </Suspense> */}
          </div>
        </div>
      </header>
    </div>
  )
}
