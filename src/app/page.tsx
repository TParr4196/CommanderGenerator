'use client';
import { Box } from '@mui/material';
import ColorSelect from '@/app/components/colorSelect';
import ExampleSelect from './components/exampleSelect';

//adapted from previous assignments

export default function Home() {

  return (
    <Box sx={{width:"97%"}}>
      <ColorSelect/>
      <ExampleSelect/>
      {/* <ExampleTable/> */}
    </Box>
  );
}
