import { Commander } from "@/types/commander"

// map variable
const cachedColors= new Map<string, Commander[]>()

// setPokemonInCache
export function setColorInCache(url: string, commander: Commander[]){
    cachedColors.set(url, commander)
}

// getPokemonFromCache
export function getColorFromCache(url: string) {
    return cachedColors.get(url)
}