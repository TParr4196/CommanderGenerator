import { Box, Card, CardContent, Typography, CardMedia } from "@mui/material"
import { useDeckProvider } from "../context/deckContext"
import { useEffect, useState } from "react";
import { Card as MTGCard } from "@/types/card";
import { ScryCard } from "@/types/scryfallCard";
import { getSynergizedCardsInCache, setSynergizedCardsInCache } from "@/services/cache";

export default function SynergizedCards() {
    const { deck, activeCommander } = useDeckProvider();
    const [synergizedCards, setSynergizedCards] = useState<MTGCard[]>([])

    useEffect(()=>{
            async function fetchPhotos() {
            if(deck && activeCommander){
                const check = getSynergizedCardsInCache(activeCommander.sanitized)
                if (check){
                    setSynergizedCards(check)
                } else {
                    const fetchPromises = deck.container.json_dict.cardlists[1].cardviews.map(async (card: MTGCard) => {
                        if (!card.cards) {
                            const scryurl = `https://api.scryfall.com/cards/named?exact=${card.name.split(" ").join("+").replace("&", "")}`;
                            const scrydata = await fetch(scryurl);
                            const scryresults = await scrydata.json() as ScryCard;
                            card.imgurl = scryresults.image_uris?.large ?? null
                        } else {
                            for (let i = 0; i < card.cards.length; i++) {
                                const scryurl = `https://api.scryfall.com/cards/named?exact=${card.cards[i].name.split(" ").join("+").replace("&", "")}`;
                                const scrydata = await fetch(scryurl);
                                const scryresults = await scrydata.json() as ScryCard;
                                card.cards[i].imgurl = scryresults.card_faces[i].image_uris.large ?? null;
                            }
                        }
                    })
                    await Promise.all(fetchPromises);
                    setSynergizedCards(deck.container.json_dict.cardlists[1].cardviews)
                    setSynergizedCardsInCache(activeCommander.sanitized, deck.container.json_dict.cardlists[1].cardviews)
                }
            }
        }
        if(deck){
            fetchPhotos()
        }
    },[deck, activeCommander])

    

    return (
        <Box sx={{
            width: '100%',
            height: '400px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
        }}>
            <Typography>Popular Cards in the 99</Typography>
            <Box sx={{
                width: '99%',
                height: '100%',
                overflowX: 'auto',
                display: 'flex',
                flexDirection: 'row',
                gap: 2,
            }}>
                {deck ? synergizedCards.map((card, index) => (
                    card.cards ?
                        <Card key={index} sx={{ minWidth: 450 }}>
                            <Box sx={{ display: "flex" }}>
                                <CardMedia
                                    component="img"
                                    sx={{ width: '50%', height: 310 }}
                                    image={card.cards[0].imgurl}
                                />
                                <CardMedia
                                    component="img"
                                    sx={{ width: '50%', height: 310 }}
                                    image={card.cards[1].imgurl}
                                />
                            </Box>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div" sx={{ justifyContent: "center", textAlign: "center", fontSize: 12 }}>
                                    {card.name}
                                    <br />
                                    {card.inclusion} Decks
                                </Typography>
                            </CardContent>
                        </Card>
                        : <Card key={index} sx={{ minWidth: 225 }}>
                            <CardMedia
                                component="img"
                                height="310"
                                image={card.imgurl}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div" sx={{ justifyContent: "center", textAlign: "center", fontSize: 12 }}>
                                    {card.name}
                                    <br />
                                    {card.inclusion} Decks
                                </Typography>
                            </CardContent>
                        </Card>
                )) : <Typography>Loading...</Typography>}
            </Box>
        </Box>
    )
}