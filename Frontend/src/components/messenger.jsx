import { useContext } from "react";


import { AppBar, Box, Toolbar } from "@mui/material";
import styled from "@emotion/styled";


//Components
import LoginDialog from "./account/loginDialog";
import ChatDialog from "./chat/chatDialog";
import { AccountContext } from "../context/accountProvider";


//Styling
const Component = styled(Box)`
height:100vh;
background:#dcdcdc;
`

const LoginHeader = styled(AppBar)`
height:220px;
background-color:#00bfa5;
box-shadow:none;
`

const Header = styled(AppBar)`
height:120px;
background-color: #00A884;
box-shadow:none;
`

function Messenger() {
    const { account } = useContext(AccountContext);
    return (
        <>
            <Component>
                {
                    account ?
                        <>
                            <Header>
                                <Toolbar></Toolbar>
                            </Header>


                            <ChatDialog />
                        </>
                        :
                        <>
                            <LoginHeader>
                                <Toolbar></Toolbar>
                            </LoginHeader>


                            <LoginDialog />
                        </>
                }

            </Component>
        </>
    )
}

export default Messenger;