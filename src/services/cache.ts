import { Commander } from "@/types/commander"
import { Deck } from "@/types/deck"

const cachedColors = new Map<string, Commander[]>()

const cachedCommanders = new Map<string, Deck>()

export function setColorInCache(url: string, commander: Commander[]){
    cachedColors.set(url, commander)
}

export function getColorFromCache(url: string) {
    return cachedColors.get(url)
}

export function setCommanderInCache(url: string, deck: Deck){
    cachedCommanders.set(url, deck)
}

export function getCommanderFromCache(url: string) {
    return cachedCommanders.get(url)
}