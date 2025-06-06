import { colorNames } from "@/utils/colorWheel"
import { Colors } from "@/types/colors"
export function getColors(colors: Colors){
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