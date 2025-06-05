export type Deck = {
    id: number,
    name: string,
    imgUrl: string,
    arbitrary: string,
    arbitraryArray: string[],
    //https://stackoverflow.com/questions/57336063/what-type-to-use-for-a-dictionary-like-object-in-typescript
    arbitraryObject: { [key: string]: string},
}

