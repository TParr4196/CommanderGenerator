import { Box, Checkbox, Typography } from "@mui/material";
import React from "react";
import { useExampleProvider } from "../context/deckContext";
import { Colors } from "@/types/colors";
import { colorNames } from "@/utils/colorWheel";
import { grey, blue, red, green } from '@mui/material/colors';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function ExampleSelect(){
    const { colors, setColors } = useExampleProvider();

    function getColors(colors: Colors){
        let colorString = ""
        if(colors.white){
            colorString+="white"
        }
        if(colors.blue){
            colorString+="blue"
        }
        if(colors.black){
            colorString+="black"
        }
        if(colors.red){
            colorString+="red"
        }
        if(colors.green){
            colorString+="green"
        }
        //https://stackoverflow.com/questions/57086672/element-implicitly-has-an-any-type-because-expression-of-type-string-cant-b used for cast
        // on 6/5/25
        return colorNames[colorString as keyof typeof colorNames]
    }

    function toggleWhite(){

    }

    function toggleBlue(){

    }

    function toggleBlack(){

    }

    function toggleRed(){

    }

    function toggleGreen(){

    }

    return (
        <Box alignItems="center" justifyContent="center" sx={{display: "flex", flexDirection: "column", width: "100%", m:2 }}>
            <Typography>Select your colors:</Typography>
            <Box justifyContent="center" sx={{display: "flex", flexDirection: "row", width: "100%", m:2}}>
                {/* https://mui.com/material-ui/react-checkbox/ used on 6/5/25*/}
                <Checkbox {...label} defaultChecked onChange={toggleWhite} sx={{color: grey[400], '&.Mui-checked': {color: grey[400],},}}/>
                <Checkbox {...label} defaultChecked onChange={toggleBlue} sx={{color: blue[800], '&.Mui-checked': {color: blue[600],},}}/>
                <Checkbox {...label} defaultChecked onChange={toggleBlack} sx={{color: grey[900], '&.Mui-checked': {color: grey[900],},}}/>
                <Checkbox {...label} defaultChecked onChange={toggleRed} sx={{color: red[800], '&.Mui-checked': {color: red[600],},}}/>
                <Checkbox {...label} defaultChecked onChange={toggleGreen} sx={{color: green[800], '&.Mui-checked': {color: green[600],},}}/>
            </Box>
            <Typography>You have chosen {getColors(colors)}</Typography>
        </Box>
    )
}