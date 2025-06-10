import { Side } from "./card"

export type Commander = {
    name: string,
    sanitized: string,
    sanitized_wo: string,
    url: string,
    cards?: Side[],
    is_partner?: boolean,
    names?: string[],
    inclusion: number,
    label: string,
    num_decks: number,
    imgurl?: string
}