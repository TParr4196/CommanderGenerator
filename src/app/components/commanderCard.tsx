import { Box, Card, CardMedia, CardContent, Typography } from "@mui/material"
import { useDeckProvider } from "../context/deckContext"

export default function CommanderCard(){
    const { activeCommander: commander } = useDeckProvider();
    return(
        <Box>
        {commander?.cards ?
                <Card sx={{ minWidth: 450 }}>
                    <Box sx={{ display: "flex" }}>
                        <CardMedia
                            component="img"
                            height="310"
                            image={commander.cards[0].imgurl}
                        />
                        <CardMedia
                            component="img"
                            height="310"
                            image={commander.cards[1].imgurl}
                        />
                    </Box>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div" sx={{ justifyContent: "center", textAlign: "center", fontSize: 12 }}>
                            {commander?.name}
                            <br />
                            {commander?.inclusion} Decks
                        </Typography>
                    </CardContent>
                </Card>
                : <Card sx={{ minWidth: 225 }}>

                    <CardMedia
                        component="img"
                        height="310"
                        image={commander?.imgurl}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div" sx={{ justifyContent: "center", textAlign: "center", fontSize: 12 }}>
                            {commander?.name}
                            <br />
                            {commander?.inclusion} Decks
                        </Typography>
                    </CardContent>
                </Card>}
                </Box>
    );
}