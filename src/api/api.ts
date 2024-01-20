import type { Paste } from "@/model/paste"
import type { PasteTextResponse, URLResponse } from "@/model/response"

export async function createPaste(paste: Paste): Promise<URLResponse | undefined> {
  try {
    const response: Response = await fetch(`${import.meta.env.BACKEND_URL}/api/v1/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paste),
    })
    if (response.status === 201) {
      return await response.json()
    }
  } catch (error) {
    console.error(error)
  }
}

export async function getPaste(url: string): Promise<PasteTextResponse | string | undefined> {
  try {
    const response: Response = await fetch(`${import.meta.env.BACKEND_URL}/api/v1/${url})`, {
      method: "GET",
    })
    switch (response.status) {
      case 201:
        return await response.json()
      case 401:
        return "Password protected"
      case 404:
        return "Paste not found"
      default:
        return "Unknown error"
    }
  } catch (error) {
    console.error(error)
  }
}

export async function getPasteWithPassword(
  url: string,
  password: string,
): Promise<PasteTextResponse | string | undefined> {
  try {
    const response: Response = await fetch(`${import.meta.env.BACKEND_URL}/api/v1/${url})`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password: password }),
    })
    switch (response.status) {
      case 201:
        return await response.json()
      case 401:
        return "Wrong Password"
      case 404:
        return "Paste not found"
      default:
        return "Unknown error"
    }
  } catch (error) {
    console.error(error)
  }
}
