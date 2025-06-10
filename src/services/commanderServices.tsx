import type { Commander } from "@/types/commander"
import { getColorFromCache, getCommanderFromCache, setColorInCache, setCommanderInCache } from "@/services/cache"
import { Deck } from "@/types/deck"

export async function fetchColor(colors: string){
    const url = `https://json.edhrec.com/pages/commanders/${colors}.json`
    const commander = getColorFromCache(url)
    if (commander){
        return commander
    }
    const r = await fetch(url)
    const data = await r.json()
    //got help with .slice from chatgpt
    const results: Commander[] = (data.container.json_dict.cardlists[0].cardviews as Commander[]).slice(0, 30)
    setColorInCache(url, results)
    return results
}

export async function fetchCommander(commandername: string) {
    const url = `https://json.edhrec.com/pages/commanders/${commandername}.json`
    const commander = getCommanderFromCache(url)
    if (commander){
        return commander
    }

    const r = await fetch(url)
    const data = await r.json()
    const results: Deck = (data as Deck)
    setCommanderInCache(url, results)
    return results
}