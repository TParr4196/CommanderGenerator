import { Card } from "@/types/card"
import { Commander } from "@/types/commander"
import { Deck } from "@/types/deck"

const cachedColors = new Map<string, Commander[]>()
const cachedCommanders = new Map<string, Deck>()
const cachedSynergizedCards = new Map<string, Card[]>()

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

export function setSynergizedCardsInCache(name: string, cards: Card[]){
    cachedSynergizedCards.set(name, cards)
}

export function getSynergizedCardsInCache(name: string){
    return cachedSynergizedCards.get(name)
}