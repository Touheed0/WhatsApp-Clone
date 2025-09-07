import { useContext } from "react";

import { Box, Dialog, List, ListItem, styled, Typography } from "@mui/material";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { AccountContext } from "../../context/accountProvider";
import { AddUser } from "../../service/api";

import { qrCodeImage } from "../constants/data";


//Styling
const DialogStyle = {
    height: "95%",
    marginTop: "12%",
    width: "70%",
    maxWidth: "100%",
    maxHeight: "100%",
    boxShadow: "none",
    overFlow: "hidden"
}

const Component = styled(Box)`
display:flex;
`
const Container = styled(Box)`
padding:6% 0 6% 6%;
`

const QrCode = styled("img")({
    width: 270,
    height: 270,
    margin: "50px 0 0 50px"
})

const Title = styled(Typography)`
font-size: 26px;
font-weight: 300;
color: #525252;
font-family: inherit;
margin-bottom: 30px;
`

const ListStyle = styled(List)`
& > li {
padding: 0;
margin-top: 15px;
font-size: 18px;
line-height: 28px;
color: #4a4a4a
}
`


function LoginDialog() {

    const { setAccount } = useContext(AccountContext);

    async function onLoginSuccess(response) {
        const deCode = jwtDecode(response.credential);
        console.log("Login Successfully", deCode);
        setAccount(deCode);

        await AddUser(deCode);
    }

    function onLoginError(response) {
        console.log("Login Failed", response);
    }

    return (
        <>
            <Dialog open={true} PaperProps={{ sx: DialogStyle }} hideBackdrop={true}>
                <Component className="Main-Container">
                    <Container className="Container-Left-Child">
                        <Title>To use WhatsApp on your computer:</Title>

                        <ListStyle>
                            <ListItem>1. Open WhatsApp on your phone</ListItem>
                            <ListItem>2. Tap menu setting and select WhatsApp web</ListItem>
                            <ListItem>3. Point your phone to this screen to capture the code</ListItem>
                        </ListStyle>
                    </Container>

                    <Box style={{ position: "relative" }}>
                        <QrCode src={qrCodeImage} alt="qr code" />
                        <Box style={{ position: "absolute", top: "50%", left: "20%" }}>
                            <GoogleLogin onSuccess={onLoginSuccess} onError={onLoginError} />
                        </Box>
                    </Box>
                </Component>
            </Dialog>
        </>
    )
}

export default LoginDialog;