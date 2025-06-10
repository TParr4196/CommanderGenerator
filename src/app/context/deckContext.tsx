import { Deck } from "@/types/deck"
import { Colors } from "@/types/colors"
import { Commander } from "@/types/commander";
import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { getColors } from "@/services/getColors";

type DeckContextType = {
    colors: Colors,
    deck: Deck | undefined;
    bracket: number;
    activeCommander: Commander | null;
    commanders: Commander[];
    setDeck: (deck: Deck | undefined) => void;
    setColors: (colors: Colors) => void;
    setBracket: (limit: number) => void;
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

    useEffect(()=>{
        fetchCommanders();
    },[colors])

    function fetchCommanders(){
        let identity = getColors(colors)
        fetch(`/api/colors?color=${identity.toLowerCase()}`)
        .then((r)=>r.json())
        .then((d)=>setCommanders(d as Commander[]))
    }

    useEffect(()=>{
        if(activeCommander){
            fetchCommander();
        }
    },[activeCommander]);

    function fetchCommander(){
        fetch(`/api/commander?commander=${activeCommander?.sanitized}`)
        .then((r)=>r.json())
        .then((d)=>setDeck(d as Deck))
    }

    useEffect(()=>{
        console.log(deck)
    },[deck])

    return (
        <deckContext.Provider value={{deck, colors, activeCommander, commanders, bracket, setDeck, setColors, setBracket, setActiveCommander, setCommanders }}>
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