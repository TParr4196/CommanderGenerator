'use client'
import { Commander } from "@/types/commander";
import { Box, Card, CardMedia, CardContent, Typography, } from "@mui/material";
import { useDeckProvider } from "../context/deckContext";
import { useEffect } from "react";
import { scryCard } from "@/types/scryfallCard";
import { setColorInCache } from "@/services/cache";


export default function CommanderPicker() {
    const { colors, commanders, setCommanders, setActiveCommander } = useDeckProvider();
    const headers = [
        "Name",
        "Card",
        "Number of Decks",
    ];
    useEffect(() => {
        if (commanders[0]?.imgurl == null) {
            fetchPhotos()
        }
    }, []);
    useEffect(() => {
        if (commanders[0]?.imgurl == null) {
            fetchPhotos()
        }
    }, [commanders]);

    async function fetchPhotos() {
        if (commanders.length > 0) {
            let col = colors
            let newCommanders = JSON.parse(JSON.stringify(commanders))

            // original design: used below code for performance
            // for (let i=0; i<newCommanders.length; i++){
            //     if(!newCommanders[i].is_partner){
            //         const scryurl = `https://api.scryfall.com/cards/named?exact=${newCommanders[i].name.split(" ").join("+")}`
            //         const scrydata = await fetch(scryurl)
            //         let scryresults = await scrydata.json() as scryCard
            //         newCommanders[i].imgurl=scryresults.image_uris?.large??null
            //     }
            // }

            //got help from chatgpt with promise.all syntax
            const fetchPromises = newCommanders.map(async (commander: Commander) => {
                if (!commander.is_partner) {
                    const scryurl = `https://api.scryfall.com/cards/named?exact=${commander.name.split(" ").join("+")}`;
                    const scrydata = await fetch(scryurl);
                    const scryresults = await scrydata.json() as scryCard;
                    commander.imgurl = scryresults.image_uris?.large ?? null;
                    if(!commander.imgurl){
                      console.log(scryresults)
                    }
                }
            })
            await Promise.all(fetchPromises);
            setColorInCache(`https://json.edhrec.com/pages/commanders/${col}.json`, newCommanders)
            setCommanders(newCommanders)
        }
    }

    return (
        //adapted from lastfm project
        <Box sx={{ 
      width: '99%', 
      height: '100%', 
      overflowX: 'auto', 
      display: 'flex', 
      flexDirection: 'row',
      gap: 2,
    }}>
      {commanders.length>0? commanders.map((commander, index) => (
        <Card onClick={()=>setActiveCommander(commanders[index])} key={index} sx={{ minWidth: 200 }}>
          <CardMedia
            component="img"
            height="275"
            image={commander.imgurl}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div" sx={{justifyContent: "center", textAlign: "center", fontSize: 12}}>
              {commander.name}
              <br />
              {commander.inclusion} Decks
            </Typography>
          </CardContent>
        </Card>
      )) : <Typography>Select A Commander</Typography>}
    </Box>
    )
}