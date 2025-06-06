import { Box, Slider, Typography } from "@mui/material";
import React from "react";
import { useDeckProvider } from "../context/deckContext";

const marks = [
  {
    value: 1,
    label: '1',
  },
  {
    value: 2,
    label: '2',
  },
  {
    value: 3,
    label: '3',
  },
  {
    value: 4,
    label: '4',
  },
  {
    value: 5,
    label: '5',
  },
];

export default function InfoSelect(){
    const {bracket, setBracket } = useDeckProvider();

    return (
        <Box sx={{ flexDirection: "row", width: "30%", m:2}}>
        <Typography>Select a Bracket (Power Level)</Typography>
        {/* https://mui.com/material-ui/react-slider/ */}
        <Slider
            aria-label="Always visible"
            defaultValue={2}
            step={1}
            marks={marks}
            min={1}
            max={5}
            valueLabelDisplay="on"
            />

        </Box>
    )
}