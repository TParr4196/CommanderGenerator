import { Box, Button, Checkbox, Typography } from "@mui/material";
import React, {useEffect, useState} from "react";
import { useDeckProvider } from "../context/deckContext";
import { getColors } from "@/services/getColors";
import { colorNames } from "@/utils/colorWheel";
import { grey, blue, red, green } from '@mui/material/colors';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function ExampleSelect(){
    const { colors, setColors } = useDeckProvider();
    const [indexedColors, setIndexedColors] = useState<{ [key: number]: string }>({});

    useEffect(()=>{
        const cols: { [key: number]: string } = {}
        Object.entries(colorNames).map(([key,], index) => (cols[index]=key));
        setIndexedColors(cols)
    },[])

    function toggleWhite(){
        setColors({
            white: !colors.white,
            blue: colors.blue,
            black: colors.black,
            red: colors.red,
            green: colors.green
        })
    }

    function toggleBlue(){
        setColors({
            white: colors.white,
            blue: !colors.blue,
            black: colors.black,
            red: colors.red,
            green: colors.green
        })
    }

    function toggleBlack(){
        setColors({
            white: colors.white,
            blue: colors.blue,
            black: !colors.black,
            red: colors.red,
            green: colors.green
        })
    }

    function toggleRed(){
        setColors({
            white: colors.white,
            blue: colors.blue,
            black: colors.black,
            red: !colors.red,
            green: colors.green
        })
    }

    function toggleGreen(){
        setColors({
            white: colors.white,
            blue: colors.blue,
            black: colors.black,
            red: colors.red,
            green: !colors.green
        })
    }
    
    function randomize(){
        const random = Math.floor(Math.random() * 32);
        const newColor: string = indexedColors[random]
        //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes
        setColors({
            white: newColor.includes("white"),
            blue: newColor.includes("blue"),
            black: newColor.includes("black"),
            red: newColor.includes("red"),
            green: newColor.includes("green"),
        })
    }

    return (
        <Box alignItems="center" justifyContent="center" sx={{display: "flex", flexDirection: "column", width: "100%", m:2 }}>
            <Typography>Select your colors:</Typography>
            <Box justifyContent="center" sx={{display: "flex", flexDirection: "row", width: "100%", m:2}}>
                {/* https://mui.com/material-ui/react-checkbox/ used on 6/5/25*/}
                <Checkbox {...label} checked={colors.white} onChange={toggleWhite} sx={{color: grey[100], '&.Mui-checked': {color: grey[100],},}}/>
                <Checkbox {...label} checked={colors.blue} onChange={toggleBlue} sx={{color: blue[800], '&.Mui-checked': {color: blue[600],},}}/>
                <Checkbox {...label} checked={colors.black} onChange={toggleBlack} sx={{color: grey[900], '&.Mui-checked': {color: grey[900],},}}/>
                <Checkbox {...label} checked={colors.red} onChange={toggleRed} sx={{color: red[800], '&.Mui-checked': {color: red[600],},}}/>
                <Checkbox {...label} checked={colors.green} onChange={toggleGreen} sx={{color: green[800], '&.Mui-checked': {color: green[600],},}}/>
            </Box>
            <Typography>You have chosen {getColors(colors)}</Typography>
            <Button onClick={randomize}>Pick For Me</Button>
        </Box>
    )
}