'use client';
import { Box } from '@mui/material';
import ColorSelect from '@/app/components/colorSelect';
// import InfoSelect from './components/infoSelect';
import CommanderPicker from './components/commanderPicker';
import { useDeckProvider } from './context/deckContext';
import DeckExplorer from './components/deckExplorer';

//adapted from previous assignments

export default function Home() {
  const { activeCommander } = useDeckProvider();

  return (
    <Box sx={{ backgroundColor: 'lightblue', width:"97%"}}>
      {activeCommander? <DeckExplorer/>: <br/>}
      <ColorSelect/>
      <CommanderPicker/>
      {/* <InfoSelect/> */}
    </Box>
  );
}
