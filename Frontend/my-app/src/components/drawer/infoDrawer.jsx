import { Box, Drawer, styled, Typography } from "@mui/material";
import { useContext } from "react";

//Material Icons
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Margin } from "@mui/icons-material";

//Components
import { AccountContext } from "../../context/accountProvider";

//Styling
const DrawerStyle = {
    left: 20,
    top: 15,
    height: "95%",
    width: "29%",
    boxShadow: "none"
}

const DrawerHeader = styled(Box)`
    background: #008069;
    color: white;
    height: 15%;
    display: flex;
    gap: 10px;
`

const BodyContainer = styled(Box)`
    background: #ededed;
    height: 85%;
`

const ImageContainer = styled(Box)`
    display: flex;
    justify-content: center;
`

const ProfileImage = styled("img")({
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    padding: "25px 0"
})

const NameContainer = styled(Box)`
    background: white;
    padding: 12px 30px 2px;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    & > :first-of-type {
        font-size: 13px;
        font-weight: 200;
        color: #009688;
    }
    & > :last-child {
        margin: 14px 0;
        color: #4A4A4A;
    }
`

const DiscriptionContainer = styled(Box)`
    padding: 15px 20px 28px 30px;
    & > p {
        font-size: 13px;
        color: #8696a0;
    }
`

const AboutContainer = styled(Box)`
    background: white;
    padding: 12px 30px 2px;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    & > :first-of-type {
        font-size: 13px;
        font-weight: 200;
        color: #009688;
    }
    & > :last-child {
        margin: 14px 0;
        color: #4A4A4A;
    }
`

function InfoDrawer({ open, setOpen }) {

    const { account } = useContext(AccountContext);

    function handleClose() {
        setOpen(false);
    }
    return (
        <>
            <Drawer open={open} onClick={handleClose} PaperProps={{ sx: DrawerStyle }} style={{ zIndex: "1500" }}>

                <DrawerHeader>
                    <ArrowBackIcon onClick={() => { setOpen(false) }} style={{ marginTop: "auto", padding: "15px", fontWeight: "600" }} />
                    <Typography style={{ marginTop: "auto", padding: "15px", fontWeight: "600", fontSize: "18px" }}>Profile</Typography>
                </DrawerHeader>

                <BodyContainer>
                    <ImageContainer>
                        <ProfileImage src={account.picture} alt="DP Picture" />
                    </ImageContainer>

                    <NameContainer>
                        <Typography>Your Name</Typography>
                        <Typography>{account.name}</Typography>
                    </NameContainer>

                    <DiscriptionContainer>
                        <Typography>This is not your username or pin. This will be visible to your WhatsApp contacts.</Typography>
                    </DiscriptionContainer>

                    <AboutContainer>
                        <Typography>About</Typography>
                        <Typography>Coding and Coding</Typography>
                    </AboutContainer>
                </BodyContainer>
            </Drawer>
        </>
    )
}

export default InfoDrawer;