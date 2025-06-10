'use client';
import { Box, Typography } from '@mui/material';
import ColorSelect from '@/app/components/colorSelect';
// import InfoSelect from './components/infoSelect';
import CommanderPicker from './components/commanderPicker';
import { useDeckProvider } from './context/deckContext';
import DeckExplorer from './components/deckExplorer';

//adapted from previous assignments

export default function Home() {
  const { activeCommander } = useDeckProvider();

  return (
    <Box sx={{ backgroundColor: 'lightblue', width:"99.5%", alignItems: 'center'}}>
      {activeCommander? <DeckExplorer/>: <br/>}
      <ColorSelect/>
      <CommanderPicker/>
      {/* <InfoSelect/> */}
      <Box sx={{
        width: "99%",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <Typography>Select a Commander to learn more!</Typography>
        <Typography>Thanks to EDHREC for data and Scryfall for images</Typography>
        <a target="_blank" href='https://edhrec.com'>edhrec.com</a>
        <a target="_blank" href='https://scryfall.com'>scryfall.com</a>
      </Box>
    </Box>
  );
}
