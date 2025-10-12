import { useContext, useState } from "react";
import { Box, Menu, MenuItem, styled } from "@mui/material";

//Material Icons
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';

//Components
import { AccountContext } from "../../../context/accountProvider";
import InfoDrawer from "../../drawer/infoDrawer";

//Styling
const Container = styled(Box)`
height: 44px;
background: #ededed;
padding: 8px 16px;
display: flex;
align-items: center;
`

const Image = styled("img")({
    width: 40,
    height: 40,
    borderRadius: "50%"
})

const Wrapper = styled(Box)`
margin-left: auto;
& > * {
margin-left: 2px;
padding: 8px;
color: #000;
};
& :first-of-type {
    font-size: 22px;
    margin-right: 8px;
    margin-top: 3px;
}
`

const MenuOptions = styled(MenuItem)`
    font-size: 14px;
    padding: 15px 60px 5px 24px;
    color: #4A4A4A;
`

function MenuHeader() {
    // Menu Icon Options
    const [open, setOpen] = useState(null);
    function handleClose() {
        setOpen(null);
    }
    function handleClick(event) {
        setOpen(event.currentTarget);
    }

    // Profile Drawer
    const [openDrawer, setOpenDrawer] = useState(false);

    function toggleDrawer() {
        setOpenDrawer(true);
    }

    const { account } = useContext(AccountContext);
    return (
        <>
            <Container>
                <Image src={account.picture} alt="DP Picture" onClick={toggleDrawer} />
                <InfoDrawer open={openDrawer} setOpen={setOpenDrawer} />

                <Wrapper>
                    <ChatIcon />

                    {/* Menu Icon Options */}
                    <MoreVertIcon onClick={handleClick} />
                    <Menu anchorEl={open} keepMounted open={open} onClose={handleClose} anchorOrigin={{ vertical: "bottom", horizontal: "center" }} transformOrigin={{ vertical: "top", horizontal: "right" }}>
                        <MenuOptions onClick={() => { handleClose(); setOpenDrawer(true); }}>Profile</MenuOptions>
                    </Menu>
                </Wrapper>
            </Container>
        </>
    )
}

export default MenuHeader;