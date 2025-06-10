export type Side = {
    name: string,
    url: string,
    imgurl?: string
}

export type Card = {
    "name": string,
    "sanitized": string,
    "sanitized_wo": string,
    "url": string,
    "cards"?: Side[],
    "synergy": number,
    "inclusion": number,
    "label": number,
    "num_decks": number,
    "potential_decks": number
}