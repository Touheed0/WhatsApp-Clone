import { useContext } from "react";

import { Box, Dialog, Grid, List, ListItem, styled, Typography } from "@mui/material";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { AccountContext } from "../../context/accountProvider";
import { AddUser } from "../../service/api";

import { qrCodeImage } from "../constants/data";


//Styling
const DialogStyle = (theme) => ({
    height: "95%",
    marginTop: "12%",
    width: "70%",
    maxWidth: "100%",
    maxHeight: "100%",
    boxShadow: "none",
    overflow: "hidden",

    [theme.breakpoints.down("md")]: {
        width: "90%",
        // marginTop: "20%",
    },

    [theme.breakpoints.down("sm")]: {
        width: "90%",
        marginTop: "20%",
    },
});

const Component = styled(Box)`
display:flex;
`
const Container = styled(Grid)`
padding:6% 0 6% 6%;
`

const QrCode = styled("img")(({ theme }) => ({
    width: 270,
    height: 270,
    margin: "50px 0 0 50px",
    [theme.breakpoints.down("sm")]: {
        width: 170,
        height: 170,
        margin: "30px auto 0",
        display: "block",
    },
}));

const Title = styled(Typography)(({ theme }) => ({
    fontSize: "26px",
    fontWeight: 500,
    color: "#525252",
    fontFamily: "inherit",
    marginBottom: "30px",

    [theme.breakpoints.down("sm")]: {
        fontSize: "20px",
        marginBottom: "12px",
    }
}));

const ListStyle = styled(List)(({ theme }) => ({
    "& > li": {
        padding: 0,
        marginTop: "15px",
        fontSize: "18px",
        lineHeight: "28px",
        color: "#4a4a4a",

        [theme.breakpoints.down("sm")]: {
            fontSize: "14px",
            marginTop: "8px",
        },
    },
}));


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
                <Component>
                    <Grid container spacing={2}>
                        <Container size={{ xs: 12, md: 6 }}>
                            <Title>To use WhatsApp on your computer:</Title>

                            <ListStyle>
                                <ListItem>1. Open WhatsApp on your phone</ListItem>
                                <ListItem>2. Tap menu setting and select WhatsApp web</ListItem>
                                <ListItem>3. Point your phone to this screen to capture the code</ListItem>
                            </ListStyle>
                        </Container>

                        <Grid size={{ xs: 12, md: 6 }} style={{ position: "relative" }}>
                            <QrCode src={qrCodeImage} alt="qr code" />
                            <Box style={{ position: "absolute", top: "50%", left: "20%" }}>
                                <GoogleLogin onSuccess={onLoginSuccess} onError={onLoginError} />
                            </Box>
                        </Grid>
                    </Grid>
                </Component>
            </Dialog>
        </>
    )
}

export default LoginDialog;