'use client';

import { Deck } from "@/types/deck"
import { Colors } from "@/types/colors"
import { createContext, ReactNode, useContext, useEffect, useState } from "react"

type DeckContextType = {
    colors: Colors,
    deck: Deck[];
    limit: number;
    setColors: (colors: Colors) => void;
    setLimit: (limit: number) => void;
    fetchExample: () => void;
}

const deckContext = createContext<DeckContextType | undefined>(undefined);

export const DeckProvider = ({children} : {children: ReactNode})=> {
    const [colors, setColors] = useState<Colors>({white: false, blue: false, black: false, red: false, green: false})
    const [deck, setDeck] = useState<Deck[]>([]);
    const [limit, setLimit] = useState<number>(20);

    function fetchExample(){
        fetch(`/api/example?limit=${limit}}`).
        then((r)=>r.json()).
        then((d)=>setDeck(d))
    }
    return (
        <deckContext.Provider value={{colors, deck, limit, setColors, setLimit, fetchExample}}>
            {children}
        </deckContext.Provider>
    );
}

export function useExampleProvider() {
    const context = useContext(deckContext);
    if (context===undefined) {
        throw new Error("Do better");
    }
    useEffect(() => {
        context.fetchExample();
    }, [])
    useEffect(()=>{
        context.fetchExample();
    },[context.limit]);

    return context;
}