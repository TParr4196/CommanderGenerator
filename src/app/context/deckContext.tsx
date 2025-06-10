import { Deck } from "@/types/deck"
import { Colors } from "@/types/colors"
import { Commander } from "@/types/commander";
import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { getColors } from "@/services/getColors";
import { Card } from "@/types/card";
import { getSynergizedCardsInCache, setSynergizedCardsInCache } from "@/services/cache";
import { ScryCard } from "@/types/scryfallCard";

type DeckContextType = {
    colors: Colors,
    deck: Deck | undefined;
    bracket: number;
    activeCommander: Commander | null;
    commanders: Commander[];
    synergizedCards: Card[];
    setDeck: (deck: Deck | undefined) => void;
    setColors: (colors: Colors) => void;
    setBracket: (limit: number) => void;
    setSynergizedCards: (cards: Card[])=>void;
    setActiveCommander: (activeCommander: Commander) => void;
    setCommanders: (commanders: Commander[]) => void;
    // fetchExample: () => void;
}

const deckContext = createContext<DeckContextType | undefined>(undefined);

export const DeckProvider = ({children} : {children: ReactNode})=> {
    const [colors, setColors] = useState<Colors>({white: false, blue: false, black: false, red: false, green: false})
    const [deck, setDeck] = useState<Deck | undefined>(undefined);
    const [bracket, setBracket] = useState<number>(2);
    const [activeCommander, setActiveCommander] = useState<Commander | null>(null);
    const [commanders, setCommanders] = useState<Commander[]>([])
    const [synergizedCards, setSynergizedCards] = useState<Card[]>([])

    useEffect(()=>{
        const identity = getColors(colors)
        fetch(`/api/colors?color=${identity.toLowerCase()}`)
        .then((r)=>r.json())
        .then((d)=>setCommanders(d as Commander[]))
    },[colors])

    useEffect(()=>{
        if(activeCommander){
            fetch(`/api/commander?commander=${activeCommander?.sanitized}`)
                .then((r)=>r.json())
                .then((d)=>setDeck(d as Deck))
        }
    },[activeCommander]);

     useEffect(()=>{
        async function fetchPhotos() {
            if(deck){
                console.log(deck)
                const check = getSynergizedCardsInCache(deck.container.description)
                if (check){
                    console.log(check)
                    setSynergizedCards(check)
                } else {
                    setSynergizedCards([])
                    const newCardViews: Card[]=[]
                    const fetchPromises = deck.container.json_dict.cardlists[1].cardviews.map(async (card: Card) => {
                        if (!card.cards) {
                            const scryurl = `https://api.scryfall.com/cards/named?exact=${card.name.split(" ").join("+").replace("&", "")}`;
                            const scrydata = await fetch(scryurl);
                            const scryresults = await scrydata.json() as ScryCard;
                            //got help from chatgpt with mapping a new object to help with rerendering correctly
                            newCardViews.push({...card, imgurl: scryresults.image_uris?.large ?? null})
                        }
                        else {
                            const newCard={...card}
                            for (let i = 0; i < card.cards.length; i++) {
                                const scryurl = `https://api.scryfall.com/cards/named?exact=${card.cards[i].name.split(" ").join("+").replace("&", "")}`;
                                const scrydata = await fetch(scryurl);
                                const scryresults = await scrydata.json() as ScryCard;
                                if(newCard.cards){
                                    newCard.cards[i].imgurl = scryresults.card_faces[i].image_uris.large ?? null;
                                }
                            }
                            newCardViews.push(newCard)
                        }
                    })
                    await Promise.all(fetchPromises);
                    setSynergizedCards(newCardViews)
                    setSynergizedCardsInCache(deck.container.description, newCardViews)
                }
            }
        }
        fetchPhotos()
    },[deck])

    return (
        <deckContext.Provider value={{deck, colors, activeCommander, commanders, bracket, synergizedCards, setSynergizedCards, setDeck, setColors, setBracket, setActiveCommander, setCommanders }}>
            {children}
        </deckContext.Provider>
    );
}

export function useDeckProvider() {
    const context = useContext(deckContext);
    if (context===undefined) {
        throw new Error("Do better");
    }

    return context;
}