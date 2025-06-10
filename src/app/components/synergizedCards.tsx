import { Box, Card, CardContent, Typography, CardMedia } from "@mui/material"
import { useDeckProvider } from "../context/deckContext"

export default function SynergizedCards() {
    const { synergizedCards } = useDeckProvider();

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
                {synergizedCards.map((card, index) => (
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
                ))}
            </Box>
        </Box>
    )
}