"use client"

import { SubmitButton } from "@/modules/checkout/components/submit-button"
import Input from "@/modules/common/components/input"
import { Checkbox, Label, Select, Text, Textarea, toast } from "@medusajs/ui"
import { ChangeEvent, useState } from "react"
import * as Dialog from "@radix-ui/react-dialog"
import { XCircle } from "@medusajs/icons"
import { validatePhone } from "@/lib/util/validate-phone"
import { QuoteFormData } from "@/types/quote/telegram-msg"
import { createTelegramQuoteMessage } from "@/lib/data/quotes"
import PhoneInput from "react-phone-input-2"
import "react-phone-input-2/lib/style.css"

const ramSizes = ["2ГБ", "4ГБ", "8ГБ", "16ГБ", "32ГБ", "64ГБ"]
const romSizes = ["4ГБ", "8ГБ", "16ГБ", "32ГБ", "64ГБ", "128ГБ", "256ГБ"]

const RequestQuoteForm = ({ children }: { children: React.ReactNode }) => {
  const [formData, setFormData] = useState<QuoteFormData>({
    name: "",
    phone: "",
    email: "",
    company: "",
    moduleType: "",
    ramSize: "",
    romSize: "",
    question: "",
  })
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [phoneState, setPhoneState] = useState("")

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: keyof QuoteFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePhoneChange = (phone: string) => {
    setFormData((prev) => ({ ...prev, phone }))
  }

  const isValid =
    termsAccepted &&
    !!formData.name &&
    !!validatePhone(formData.phone) &&
    !!formData.email &&
    !!formData.company

  // ... остальные функции (sendToTelegram, handleSubmit) остаются без изменений

  const formAction = async () => {
    setIsSubmitting(true)

    console.log("formAction formData ==> ", formData)

    createTelegramQuoteMessage(formData)
      .catch((e) => toast.error(e.message))
      .finally(() => setIsSubmitting(false))
  }

  const moduleTypes = ["SMARC", "SODIMM", "Q7"]

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/50 data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content
          className="fixed inset-x-4 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-slate py-10 px-6 md:px-10 
                    shadow-lg rounded-xl w-11/12 max-h-[80vh] overflow-y-auto mt-10"
        >
          <Dialog.Title className="flex justify-between items-center font-sans font-medium h2-core text-ui-fg-base mb-4">
            Получить коммерческое предложение
            <Dialog.Close asChild>
              <XCircle className="text-gray-500 hover:text-gray-700 cursor-pointer" />
            </Dialog.Close>
          </Dialog.Title>

          {isSuccess ? (
            <div className="text-center py-8">
              <Text className="text-lg mb-4">Спасибо за ваш запрос!</Text>
              <Text>Мы свяжемся с вами в ближайшее время.</Text>
            </div>
          ) : (
            <form action={formAction} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Имя"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                />
                <PhoneInput
                  country={"ru"}
                  onlyCountries={["ru"]}
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  inputClass="phone-input"
                  buttonClass="phone-button"
                  containerClass="phone-container"
                  dropdownClass="dropdown-container"
                />
                <Input
                  label="Email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
                <Input
                  label="Компания"
                  name="company"
                  required
                  value={formData.company}
                  onChange={handleChange}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="mb-2 block">Тип</Label>
                  <Select
                    value={formData.moduleType}
                    onValueChange={(value) =>
                      handleSelectChange("moduleType", value)
                    }
                  >
                    <Select.Trigger className="rounded-lg h-12 px-4">
                      <Select.Value placeholder="Выберите тип" />
                    </Select.Trigger>
                    <Select.Content>
                      {moduleTypes.map((type) => (
                        <Select.Item key={type} value={type}>
                          {type}
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select>
                </div>
                <div>
                  <Label className="mb-2 block">ОЗУ</Label>
                  <Select
                    value={formData.ramSize}
                    onValueChange={(value) =>
                      handleSelectChange("ramSize", value)
                    }
                  >
                    <Select.Trigger className="rounded-lg h-12 px-4">
                      <Select.Value placeholder="Выберите ОЗУ" />
                    </Select.Trigger>
                    <Select.Content>
                      {ramSizes.map((size) => (
                        <Select.Item key={size} value={size}>
                          {size}
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select>
                </div>

                <div>
                  <Label className="mb-2 block">ПЗУ</Label>
                  <Select
                    value={formData.romSize}
                    onValueChange={(value) =>
                      handleSelectChange("romSize", value)
                    }
                  >
                    <Select.Trigger className="rounded-lg h-12 px-4">
                      <Select.Value placeholder="Выберите ПЗУ" />
                    </Select.Trigger>
                    <Select.Content>
                      {romSizes.map((size) => (
                        <Select.Item key={size} value={size}>
                          {size}
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select>
                </div>
              </div>

              {/* Остальная часть формы остается без изменений */}
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-1 block">
                  Вопрос
                </Label>
                <Textarea
                  name="question"
                  maxLength={500}
                  rows={3}
                  value={formData.question}
                  onChange={handleChange}
                />
              </div>

              <div className="flex items-center gap-2">
                <Checkbox
                  name="terms"
                  id="terms-checkbox"
                  data-testid="terms-checkbox"
                  checked={termsAccepted}
                  onCheckedChange={(checked) => setTermsAccepted(!!checked)}
                ></Checkbox>
                <Label
                  id="terms-label"
                  className="flex items-center text-ui-fg-base !text-xs hover:cursor-pointer !transform-none"
                  htmlFor="terms-checkbox"
                  data-testid="terms-label"
                >
                  Cоглаcен с Пользовательским соглашением и Политикой
                  конфиденциальности.
                </Label>
              </div>

              <SubmitButton
                className="w-full mt-4"
                disabled={!isValid || isSubmitting}
              >
                {isSubmitting ? "Отправка..." : "Отправить"}
              </SubmitButton>
            </form>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default RequestQuoteForm
