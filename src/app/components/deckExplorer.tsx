'use client'
import { Commander } from "@/types/commander";
import { Box, Card, CardMedia, CardContent, Typography, TableCell, TableContainer, Table, TableHead, TableRow, TableBody } from "@mui/material";
import { useDeckProvider } from "../context/deckContext";
import { useEffect } from "react";
import { CardList } from "@/types/cardlist";
import { TagLink } from "@/types/deck";

export default function DeckExplorer() {
    const { colors, deck, activeCommander: commander } = useDeckProvider();
    const headers = [
        "Popular Tags",
    ];

    useEffect(()=>{
        console.log(deck)
    },[deck])

    return (
        //adapted from lastfm project
        <Box sx={{
            backgroundColor: "white",
            width: '100%', 
            height: '100%', 
            overflowX: 'auto', 
            display: 'flex', 
            flexDirection: 'row',
            justifyContent: 'center',
            gap: 2,
            }}>
        <Card sx={{ minWidth: 200 }}>
          <CardMedia
            component="img"
            height="275"
            image={commander?.imgurl}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div" sx={{justifyContent: "center", textAlign: "center", fontSize: 12}}>
              {commander?.name}
              <br />
              {commander?.inclusion} Decks
            </Typography>
          </CardContent>
        </Card>
        <Box sx={{
            width: '100%', 
            height: '300px',
            overflowY: 'auto',
            display: 'flex', 
            flexDirection: 'column',
            gap: 2,
            }}>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            {headers.map((header, i) =>
                                <TableCell key={i}>{header}</TableCell>
                            )}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {deck? deck.panels.taglinks.slice(0, 5).map((t: TagLink, i) =>
                            <TableRow key={i}>
                                <TableCell>{t.value}</TableCell>
                            </TableRow>
                        ): 
                        <TableRow>
                            <TableCell>Loading...</TableCell>
                        </TableRow>}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    </Box>
    )
}