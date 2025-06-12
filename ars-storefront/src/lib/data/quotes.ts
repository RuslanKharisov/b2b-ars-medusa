"use server"

import { sdk } from "@/lib/config"
import {
  getAuthHeaders,
  getCacheOptions,
  getCacheTag,
  getCartId,
} from "@/lib/data/cookies"
import {
  QuoteFilterParams,
  StoreCreateQuoteMessage,
  StoreQuotePreviewResponse,
  StoreQuoteResponse,
  StoreQuotesResponse,
} from "@/types"
import { QuoteFormData } from "@/types/quote/telegram-msg"
import { track } from "@vercel/analytics/server"
import { revalidateTag } from "next/cache"

export const createQuote = async () => {
  const headers = {
    ...(await getAuthHeaders()),
  }

  const cartId = await getCartId()

  return sdk.client
    .fetch<StoreQuoteResponse>(`/store/quotes`, {
      method: "POST",
      body: { cart_id: cartId },
      headers,
    })
    .then((quote) => {
      track("quote_created", {
        quote_id: quote.quote.id,
      })

      return quote
    })
}

export const fetchQuotes = async (query?: QuoteFilterParams) => {
  const headers = {
    ...(await getAuthHeaders()),
  }

  const next = {
    ...(await getCacheOptions("quotes")),
  }

  return sdk.client.fetch<StoreQuotesResponse>(
    `/store/quotes?order=-created_at`,
    {
      method: "GET",
      query,
      headers,
      next,
    }
  )
}

export const fetchQuote = async (id: string, query?: QuoteFilterParams) => {
  const headers = {
    ...(await getAuthHeaders()),
  }

  const next = {
    ...(await getCacheOptions(["quote", id].join("-"))),
  }

  return sdk.client.fetch<StoreQuoteResponse>(`/store/quotes/${id}`, {
    method: "GET",
    query,
    headers,
    next,
  })
}

export const fetchQuotePreview = async (
  id: string,
  query?: QuoteFilterParams
) => {
  const headers = {
    ...(await getAuthHeaders()),
  }

  const next = {
    ...(await getCacheOptions(["quotePreview", id].join("-"))),
  }

  return sdk.client.fetch<StoreQuotePreviewResponse>(
    `/store/quotes/${id}/preview`,
    {
      method: "GET",
      query,
      headers,
      next,
    }
  )
}

export const acceptQuote = async (id: string) => {
  const headers = {
    ...(await getAuthHeaders()),
  }

  return sdk.client
    .fetch<StoreQuoteResponse>(`/store/quotes/${id}/accept`, {
      method: "POST",
      body: {},
      headers,

      cache: "force-cache",
    })
    .then((res) => {
      track("quote_accepted", {
        quote_id: res.quote.id,
      })

      return res
    })
    .finally(async () => {
      const tags = await Promise.all([
        getCacheTag("quotes"),
        getCacheTag(["quote", id].join("-")),
        getCacheTag(["quotePreview", id].join("-")),
      ])
      tags.forEach((tag) => revalidateTag(tag))
    })
}

export const rejectQuote = async (id: string) => {
  const headers = {
    ...(await getAuthHeaders()),
  }

  return sdk.client
    .fetch<StoreQuoteResponse>(`/store/quotes/${id}/reject`, {
      method: "POST",
      body: {},
      headers,

      cache: "force-cache",
    })
    .finally(async () => {
      const tags = await Promise.all([
        getCacheTag("quotes"),
        getCacheTag(["quote", id].join("-")),
        getCacheTag(["quotePreview", id].join("-")),
      ])
      tags.forEach((tag) => revalidateTag(tag))
    })
}

export const createQuoteMessage = async (
  id: string,
  body: StoreCreateQuoteMessage
) => {
  const headers = {
    ...(await getAuthHeaders()),
  }

  return sdk.client
    .fetch<StoreQuoteResponse>(`/store/quotes/${id}/messages`, {
      method: "POST",
      body,
      headers,

      cache: "force-cache",
    })
    .then((res) => {
      track("quote_message_created", {
        quote_id: res.quote.id,
      })

      return res
    })
    .finally(async () => {
      const tags = await Promise.all([
        getCacheTag("quotes"),
        getCacheTag(["quote", id].join("-")),
        getCacheTag(["quotePreview", id].join("-")),
      ])
      tags.forEach((tag) => revalidateTag(tag))
    })
}


export const createTelegramQuoteMessage = async (
  formData: QuoteFormData
) => {
  try {
    const botToken = process.env.TELEGRAM_BOT_TOKEN
    const chatId = process.env.TELEGRAM_CHAT_ID

    if (!botToken || !chatId) {
      throw new Error("Telegram credentials not configured")
    }


    // Форматируем сообщение
    const message = `
📄 Новый запрос на коммерческое предложение:
👤 Имя: ${formData.name}
📞 Телефон: ${formData.phone}
✉️ Email: ${formData.email}
🏢 Компания: ${formData.company}
💻 Тип модуля: ${formData.moduleType || "Не указан"}
🧠 ОЗУ: ${formData.ramSize || "Не указано"}
💾 ПЗУ: ${formData.romSize || "Не указано"}
❓ Вопрос: ${formData.question || "Не указан"}
    `.trim()

    console.log("Sending to Telegram:", message)

    // Отправляем сообщение в Telegram
    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: "HTML",
        }),
      }
    )

    if (!telegramResponse.ok) {
      const errorData = await telegramResponse.json()
      console.error("Telegram API error:", errorData)
      throw new Error("Failed to send message to Telegram")
    }

    return {
      success: true,
      message: "Request sent successfully"
    }
  } catch (error) {
    console.error("Error sending to Telegram:", error)
    return {
      success: false,
      message: "Failed to send request",
      error: error instanceof Error ? error.message : "Unknown error"
    }
  }
}