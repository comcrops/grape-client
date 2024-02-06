import type {Paste} from "@/model/paste"
import type {PasteTextResponse, UrlResponse} from "@/model/response"
import {vModelText} from "vue";

export async function createPaste(paste: Paste | Partial<Paste>): Promise<UrlResponse | undefined> {
    if (!paste.password || paste.password == "") {
        delete paste.password
    }

    if (!paste.url || paste.url == "") {
        delete paste.url
    }

    try {
        const response: Response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(paste),
        })

        const text = await response.text()

        if (response.status === 201) {
            return {
                url: text
            }
        } else {
            return {
                error: text
            }
        }
    } catch (error: any) {
        return error
    }
}

export async function getPaste(url: string): Promise<PasteTextResponse | string | undefined> {
    try {
        const response: Response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/${url}`, {
            method: "GET",
        })
        switch (response.status) {
            case 200:
                return {text: await response.text()}
            case 401:
                return "Password protected"
            case 410:
                return await response.text()
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
        const response: Response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/${url}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({password: password}),
        })
        switch (response.status) {
            case 200:
                return {text: await response.text()}
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
