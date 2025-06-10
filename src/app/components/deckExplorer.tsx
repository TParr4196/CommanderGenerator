'use client'
import { Box, Typography, TableCell, TableContainer, Table, TableHead, TableRow, TableBody } from "@mui/material";
import { useDeckProvider } from "../context/deckContext";
import { TagLink } from "@/types/deck";
import CommanderCard from "./commanderCard";
import Articles from "./articles";
import SynergizedCards from "./synergizedCards";

export default function DeckExplorer() {
    const { deck } = useDeckProvider();

    return (
        //adapted from lastfm project
        <Box sx={{
            backgroundColor: "skyblue",
            width: '100%',
            height: '100%',
            overflowX: 'auto',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            gap: 2,
        }}>
            <CommanderCard/>
            <Box sx={{
                width: '25%',
                height: '400px',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
            }}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell><Typography>Popular Tags</Typography></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {deck ? deck.panels.taglinks.slice(0, 10).map((t: TagLink, i) =>
                                <TableRow key={i}>
                                    <TableCell>{t.count} {t.value} decks</TableCell>
                                </TableRow>
                            ) :
                                <TableRow>
                                    <TableCell>Loading...</TableCell>
                                </TableRow>}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
            <SynergizedCards/>
            <Articles/>
        </Box>
    )
}