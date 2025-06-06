'use client';
import { Box } from '@mui/material';
import ColorSelect from '@/app/components/colorSelect';
import InfoSelect from './components/infoSelect';

//adapted from previous assignments

export default function Home() {

  return (
    <Box sx={{width:"97%"}}>
      <ColorSelect/>
      <InfoSelect/>
      {/* <ExampleTable/> */}
    </Box>
  );
}
