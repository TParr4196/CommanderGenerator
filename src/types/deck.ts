import { CardList } from "./cardlist"

type Archidekt = {
    c: string,
    f: number,
    q: number,
    u: string
}

export type TagLink = {
    "count": number,
    "slug": string,
    "value": string
}

type Item = {
    "href": string,
    "value": string,
    "current": boolean
}

type Link = {
    "header": string,
    "items": Item[],
    "separator"?: boolean
}

type Article = {
    "alt": string,
    "date": string,
    "href": string,
    "site": {
        "api": string,
        "auth": string,
        "id": string,
        "name": string,
        "parent_page_id": number,
        "tags": true
    },
    "value": string,
    "author": {
        "avatar": string,
        "id": number,
        "link": string,
        "name": string
    },
    "excerpt": string,
    "media": string
}

type Price = {
    "name"?: string,
    "price": 2.78,
    "rawName"?: string,
    "url": string,
    "set"?: string,
    "slug"?: string
}

type Vendors = {
    "cardhoarder": Price,
    "cardkingdom": Price,
    "cardmarket": Price,
    "face2face": Price,
    "manapool": Price,
    "mtgstocks": Price,
    "scg": Price,
    "tcgplayer": Price,
    "tcgl": Price
}

type Content = {
    "label": string,
    "value": number,
    "color": string
}

type Combo = {
    "value": string,
    "alt": string,
    "href": string
}

type ImageURI = {
    "normal": string,
    "art_crop": string
}

//got help from chatgpt with the dictionary type below
type CMC = {
  [cmc: number]: number;
};

type RankOverTime = {
    [date: string]: Rank
}

type Similar = {
    "aetherhub_uri": string,
    "archidekt_uri": string,
    "color_identity": string[],
    "cmc": number,
    "deckstats_uri": string,
    "image_uris": ImageURI[],
    "layout": string,
    "moxfield_uri": string,
    "mtggoldfish_uri": string,
    "name": string,
    "names": string[],
    "prices": Vendors,
    "primary_type": string,
    "rarity": "rare",
    "salt": number,
    "sanitized": string,
    "sanitized_wo": string,
    "scryfall_uri": string,
    "spellbook_uri": string,
    "type": string,
    "combos": boolean,
    "legal_commander": boolean,
    "url": string
}

type Rank = {
    "commander_count": number,
    "perc_of_decks_overall": number,
    "rank": number
}

type Breadcrumb = {
    [route: string]: string
}

export type Deck = {
  "creature": number,
  "instant": number,
  "sorcery": number,
  "artifact": number,
  "enchantment": number,
  "battle": number,
  "planeswalker": number,
  "land": number,
  "basic": number,
  "nonbasic": number,
  "archidekt": Archidekt[],
  "similar": Similar[],
  "header": string,
  "panels": {
    "piechart": {
      "content": Content[],
      "title": string
    },
    "links": Link[],
    "taglinks": TagLink[],
    "mana_curve": CMC,
    "rank_over_time": RankOverTime,
    "combocounts": Combo[],
    "articles": Article[]
  },
  "description": string,
  "container": {
    "breadcrumb": Breadcrumb[],
    "description": string,
    "json_dict": {
      "cardlists": CardList[],
      "card": {
        "inclusion": number,
        "num_decks": number,
        "potential_decks": number,
        "aetherhub_uri": string,
        "archidekt_uri": string,
        "color_identity": string[],
        "cmc": number,
        "deckstats_uri": string,
        "image_uris": [
          {
            "normal": string,
            "art_crop": string
          }
        ],
        "layout": string,
        "moxfield_uri": string,
        "mtggoldfish_uri": string,
        "name": string,
        "names": string[],
        "prices": Vendors,
        "primary_type": string,
        "rarity": string,
        "salt": number,
        "sanitized": string,
        "sanitized_wo": string,
        "scryfall_uri": string,
        "spellbook_uri": string,
        "type": string,
        "combos": boolean,
        "is_commander": boolean,
        "label": string,
        "legal_commander": boolean,
        "url"?: string
      }
    },
    "keywords": string,
    "title": string
  }
}