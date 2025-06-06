import { Box, TextField } from "@mui/material";
import React from "react";
import { useDeckProvider } from "../context/deckContext";

export default function ExampleSelect(){
    const {bracket, setBracket } = useDeckProvider();

    return (
        <Box sx={{ flexDirection: "row", width: "100%", m:2}}>
            <TextField
            id="bracket"
            label="Power Bracket (1-5)"
            type="number"
            variant="outlined"
            value={bracket}
            //https://stackoverflow.com/questions/47798104/set-min-max-on-textfield-type-number
            inputProps={{min:1, max:5}}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBracket(parseInt((e.target.value!='') ? e.target.value : "2"))}
            sx={{width: "100%", m: 2}} />
        </Box>
    )
}