import { addToCartEventBus } from "@/lib/data/cart-event-bus"
import { getProductPrice } from "@/lib/util/get-product-price"
import { HttpTypes, StoreProduct, StoreProductVariant } from "@medusajs/types"
import { clx, Table } from "@medusajs/ui"
import Button from "@/modules/common/components/button"
import ShoppingBag from "@/modules/common/icons/shopping-bag"
import { useState } from "react"
import BulkTableQuantity from "../bulk-table-quantity"
import RequestQuoteForm from "@/modules/quotes/components/request-quote-form"
import FilePlus from "@/modules/common/icons/file-plus"

const ProductVariantsTable = ({
  product,
  region,
}: {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
}) => {
  const [isAdding, setIsAdding] = useState(false)
  const [lineItemsMap, setLineItemsMap] = useState<
    Map<
      string,
      StoreProductVariant & {
        product: StoreProduct
        quantity: number
      }
    >
  >(new Map())

  const totalQuantity = Array.from(lineItemsMap.values()).reduce(
    (acc, curr) => acc + curr.quantity,
    0
  )

  const handleQuantityChange = (variantId: string, quantity: number) => {
    setLineItemsMap((prev) => {
      const newLineItems = new Map(prev)

      if (!prev.get(variantId)) {
        newLineItems.set(variantId, {
          ...product.variants?.find((v) => v.id === variantId)!,
          product,
          quantity,
        })
      } else {
        newLineItems.set(variantId, {
          ...prev.get(variantId)!,
          quantity,
        })
      }

      return newLineItems
    })
  }

  const handleAddToCart = async () => {
    setIsAdding(true)

    const lineItems = Array.from(lineItemsMap.entries()).map(
      ([variantId, { quantity, ...variant }]) => ({
        productVariant: {
          ...variant,
        },
        quantity,
      })
    )

    addToCartEventBus.emitCartAdd({
      lineItems,
      regionId: region.id,
    })

    setIsAdding(false)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="overflow-x-auto p-px">
        <Table className="w-full rounded-xl overflow-hidden shadow-borders-base border-none ">
          <Table.Header className="border-t-0">
            <Table.Row className="bg-neutral-100 border-none hover:!bg-neutral-100">
              <Table.HeaderCell className="px-4">SKU</Table.HeaderCell>
              {product.options?.map((option) => {
                if (option.title === "Default option") {
                  return null
                }
                return (
                  <Table.HeaderCell key={option.id} className="px-4 border-x">
                    {option.title}
                  </Table.HeaderCell>
                )
              })}
              <Table.HeaderCell className="px-4 border-x">
                Price
              </Table.HeaderCell>
              <Table.HeaderCell className="px-4">Количество</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body className="border-none">
            {product.variants?.map((variant, index) => {
              const { variantPrice } = getProductPrice({
                product,
                variantId: variant.id,
              })

              return (
                <Table.Row
                  key={variant.id}
                  className={clx({
                    "border-b-0": index === product.variants?.length! - 1,
                  })}
                >
                  <Table.Cell className="px-4">{variant.sku}</Table.Cell>
                  {variant.options?.map((option, index) => {
                    if (option.value === "Default option value") {
                      return null
                    }
                    return (
                      <Table.Cell key={option.id} className="px-4 border-x">
                        {option.value}
                      </Table.Cell>
                    )
                  })}
                  <Table.Cell className="px-4 border-x">
                    {variantPrice?.calculated_price}
                  </Table.Cell>
                  <Table.Cell className="pl-1 !pr-1">
                    <BulkTableQuantity
                      variantId={variant.id}
                      onChange={handleQuantityChange}
                    />
                  </Table.Cell>
                </Table.Row>
              )
            })}
          </Table.Body>
        </Table>
      </div>
      <RequestQuoteForm>
        <Button className="w-full h-10">
          <FilePlus size={24} />
          <span className="small:inline-block">Запросить КП</span>
        </Button>
      </RequestQuoteForm>
      {/* <Button
        onClick={handleAddToCart}
        variant="primary"
        className="w-full h-10"
        isLoading={isAdding}
        disabled={totalQuantity === 0}
        data-testid="add-product-button"
      >
        <ShoppingBag
          className="text-white"
          fill={totalQuantity === 0 ? "none" : "#fff"}
        />
        {totalQuantity === 0 ? "Выбрать вариант(ы) выше" : "Добавить в корзину"}
      </Button> */}
    </div>
  )
}

export default ProductVariantsTable
