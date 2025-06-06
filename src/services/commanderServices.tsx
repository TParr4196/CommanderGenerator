import type { Commander } from "@/types/commander"
import { getColorFromCache, setColorInCache } from "@/services/commanderCache"

export async function fetchColor(colors: string){
    const url = `https://json.edhrec.com/pages/commanders/${colors}.json`
    const r = await fetch(url)
    const data = await r.json()
    const results = data.container.json_dict.cardlists[0].cardviews
    // example return from api
    console.log(results)
    return {}
    // return await fetchColor(results.json_dict.cardlists[0]);
}

export async function fetchCommander(commander: number) {
    
}

// async function fetchColor(url: string){

//     let example = getColorFromCache(url)
//     if (example){
//         return example
//     }

//     // console.log(`Fetching: ${url}`);
//     // const r = await fetch(url);
//     // const data = await r.json();
//     const data = {
//         "arbitrary": "arbitrary",
//         "arbitraryArray": ["arbitrary1", "arbitrary2"],
//         "arbitraryObject": {
//             "arbitrary1": "arbitrary1",
//             "arbitrary2": "arbitrary2"
//             }
//     } // example return from api

//     const idArray = url.split("/");
//     const id = parseInt(idArray[idArray.length - 2]);
//     example = {
//         id: id,
//         name: `example ${id}`,
//         imgUrl: `imageurl/${id}`,
//         arbitrary: data["arbitrary"],
//         arbitraryArray: data["arbitraryArray"],
//         arbitraryObject: data["arbitraryObject"],
//     }
//     setExampleInCache(url, example)
//     return example
// }