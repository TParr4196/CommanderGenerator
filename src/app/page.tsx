'use client';
import { Box } from '@mui/material';

import ExampleSelect from '@/app/components/exampleSelect';
import ExampleTable from '@/app/components/exampleTable';
import ColorSelect from '@/app/components/colorSelect';

//adapted from previous assignments

export default function Home() {

  return (
    <Box sx={{width:"98%"}}>
      <ColorSelect/>
      <ExampleSelect/>
      <ExampleTable/>
    </Box>
  );
}
