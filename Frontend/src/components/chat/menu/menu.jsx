import { useState } from "react";
import { Box } from "@mui/material";

//Components
import MenuHeader from "./menuHeader";
import MenuSearch from "./menuSearch";
import Conversation from "./conversation";


function Menu() {
    const [text, setText] = useState("")
    return (
        <>
            <Box> 
                <MenuHeader />
                <MenuSearch setText={setText} />
                <Conversation text={text} />
            </Box>
        </>
    )
}

export default Menu;