import { ExampleType } from "@/types/deck"

import { getExampleFromCache, setExampleInCache } from "@/services/exampleCache"

export async function fetchSomeExamples(limit: number){
    // const url = `https://genericapi.com/api/v2/example?limit=${limit}`
    // // const r = await fetch(url)
    // // const data = await r.json()
    // // const results = data["results"]
    const results: {[url:string]:string}[] = [];
    for (let i = 0; i < limit; i++){
        results.push({
            "url": `https://exampleapi.co/api/v2/${i+1}}/`
        });
    }
    // example return from api
    const examples: ExampleType[] = [];

    for (let i = 0; i < results.length; i++){
        examples.push(await fetchExample(results[i]["url"]))
    }
    return examples;
}

async function fetchExample(url: string){

    let example = getExampleFromCache(url)
    if (example){
        return example
    }

    // console.log(`Fetching: ${url}`);
    // const r = await fetch(url);
    // const data = await r.json();
    const data = {
        "arbitrary": "arbitrary",
        "arbitraryArray": ["arbitrary1", "arbitrary2"],
        "arbitraryObject": {
            "arbitrary1": "arbitrary1",
            "arbitrary2": "arbitrary2"
            }
    } // example return from api

    const idArray = url.split("/");
    const id = parseInt(idArray[idArray.length - 2]);
    example = {
        id: id,
        name: `example ${id}`,
        imgUrl: `imageurl/${id}`,
        arbitrary: data["arbitrary"],
        arbitraryArray: data["arbitraryArray"],
        arbitraryObject: data["arbitraryObject"],
    }
    setExampleInCache(url, example)
    return example
}