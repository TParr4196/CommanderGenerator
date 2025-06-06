// import { Deck } from "@/types/deck"
import { Colors } from "@/types/colors"
import { createContext, ReactNode, useContext, useEffect, useState } from "react"

type DeckContextType = {
    colors: Colors,
    // deck: Deck[] | undefined;
    bracket: number;
    setColors: (colors: Colors) => void;
    setBracket: (limit: number) => void;
    // fetchExample: () => void;
}

const deckContext = createContext<DeckContextType | undefined>(undefined);

export const DeckProvider = ({children} : {children: ReactNode})=> {
    const [colors, setColors] = useState<Colors>({white: false, blue: false, black: false, red: false, green: false})
    // const [deck, setDeck] = useState<Deck[] | undefined>(undefined);
    const [bracket, setBracket] = useState<number>(2);

    // useEffect(() => {
    //     fetchExample();
    // }, [])
    // useEffect(()=>{
    //     fetchExample();
    // },[limit]);

    // function fetchExample(){
    //     fetch(`/api/example?limit=${limit}`).
    //     then((r)=>r.json()).
    //     then((d)=>setDeck(d))
    // }
    return (
        <deckContext.Provider value={{colors, bracket, setColors, setBracket }}>
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