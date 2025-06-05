import { Box, TextField } from "@mui/material";
import React from "react";
import { useExampleProvider } from "../context/deckContext";

export default function ExampleSelect(){
    const {limit, setLimit } = useExampleProvider();

    return (
        <Box sx={{display: "flex", flexDirection: "row", width: "100%", m:2}}>
            <TextField
                id="limit"
                label="Limit"
                type="number"
                variant="outlined"
                value={limit}
                onChange={(e)=>setLimit(parseInt((e.target.value!='')? e.target.value : "0"))}
                sx={{width: "100%", m: 2}} />
        </Box>
    )
}