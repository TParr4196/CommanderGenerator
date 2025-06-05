import { ExampleType } from "@/types/deck";

// map variable
const cachedExamples= new Map<string, ExampleType>()

// setPokemonInCache
export function setExampleInCache(url: string, example: ExampleType){
    cachedExamples.set(url, example)
}

// getPokemonFromCache
export function getExampleFromCache(url: string) {
    return cachedExamples.get(url)
}