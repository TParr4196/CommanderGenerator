'use client'
import { Commander } from "@/types/commander";
import { Box, Card, CardMedia, CardContent, Typography, } from "@mui/material";
import { useDeckProvider } from "../context/deckContext";
import { useEffect } from "react";
import { ScryCard } from "@/types/scryfallCard";
import { setColorInCache } from "@/services/cache";

export default function CommanderPicker() {
  const { colors, commanders, setCommanders, setActiveCommander } = useDeckProvider();

  useEffect(() => {
    async function fetchPhotos() {
      if (commanders.length > 0) {
        const col = colors
        const newCommanders = JSON.parse(JSON.stringify(commanders))
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
          if (!commander.cards) {
            const scryurl = `https://api.scryfall.com/cards/named?exact=${commander.name.split(" ").join("+").replace("&", "")}`;
            const scrydata = await fetch(scryurl);
            const scryresults = await scrydata.json() as ScryCard;
            commander.imgurl = scryresults.image_uris?.large ?? null;
          } else {
            for (let i = 0; i < commander.cards.length; i++) {
              const scryurl = `https://api.scryfall.com/cards/named?exact=${commander.cards[i].name.split(" ").join("+").replace("&", "")}`;
              const scrydata = await fetch(scryurl);
              const scryresults = await scrydata.json() as ScryCard;
              if (commander.is_partner) {
                commander.cards[i].imgurl = scryresults.image_uris?.large ?? null;
              } else {
                commander.cards[i].imgurl = scryresults.card_faces[i].image_uris.large ?? null;
              }
            }
          }
        })
        await Promise.all(fetchPromises);
        setColorInCache(`https://json.edhrec.com/pages/commanders/${col}.json`, newCommanders)
        setCommanders(newCommanders)
      }
    }
    if (commanders[0]?.imgurl == null) {
      fetchPhotos()
    }
  }, [commanders, colors, setCommanders]);

  return (
    //adapted from lastfm project
    <Box sx={{
      width: '99%',
      height: '100%',
      overflowX: 'auto',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: 2,
    }}>
      {commanders.length > 0 ? commanders.map((commander, index) => (
        commander.cards ?
          <Card onClick={() => setActiveCommander(commanders[index])} key={index} sx={{ minWidth: 450 }}>
            <Box sx={{ display: "flex" }}>
              <CardMedia
                component="img"
                sx={{ width: '50%', height: 310 }}
                image={commander.cards[0].imgurl}
              />
              <CardMedia
                component="img"
                sx={{ width: '50%', height: 310 }}
                image={commander.cards[1].imgurl}
              />
            </Box>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div" sx={{ justifyContent: "center", textAlign: "center", fontSize: 12 }}>
                {commander.name}
                <br />
                {commander.inclusion} Decks
              </Typography>
            </CardContent>
          </Card>
          : <Card onClick={() => setActiveCommander(commanders[index])} key={index} sx={{ minWidth: 225 }}>
            <CardMedia
              component="img"
              height="310"
              image={commander.imgurl}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div" sx={{ justifyContent: "center", textAlign: "center", fontSize: 12 }}>
                {commander.name}
                <br />
                {commander.inclusion} Decks
              </Typography>
            </CardContent>
          </Card>
      )) : <Typography>Select A Color</Typography>}
    </Box>
  )
}