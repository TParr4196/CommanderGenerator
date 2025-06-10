import { Box, TableContainer, Table, TableHead, TableRow, TableBody, Typography, TableCell } from "@mui/material"
import { useDeckProvider } from "../context/deckContext"

export default function Articles() {
    const { deck } = useDeckProvider();
    return (
        <Box sx={{
            width: '40%',
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
                            <TableCell><Typography>Articles</Typography></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {deck ? deck.panels.articles.map((a, i) =>
                            <TableRow key={i}>
                                {/* https://www.geeksforgeeks.org/reactjs/how-to-open-a-link-in-a-new-tab-in-nextjs/ used on 6/10/25. 
                                    Changed from legacy behavior with ChatGPT's help */}
                                <TableCell>{a.value}<br /><a target="_blank" href={a.href}>Click here</a></TableCell>
                            </TableRow>
                        ) :
                            <TableRow>
                                <TableCell>Loading...</TableCell>
                            </TableRow>}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}