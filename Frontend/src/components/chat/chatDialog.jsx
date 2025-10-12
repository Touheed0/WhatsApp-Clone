import { useContext } from "react";
import { Box, Dialog, styled } from "@mui/material";

// Components
import Menu from "./menu/menu";
import EmptyChat from "./chat/emptyChat";
import ChatBox from "./chat/chatBox";
import { AccountContext } from "../../context/accountProvider";

// Styling
const DialogStyle = (theme) => ({
    height: "95%",
    width: "100%",
    margin: "20px",
    maxWidth: "100%",
    maxHeight: "100%",
    boxShadow: "none",
    overflow: "hidden",
    borderRadius: "0",

    [theme.breakpoints.down("sm")]: {
        margin: "10px",
    }
});


const LeftSection = styled(Box)(({ theme }) => ({
    minWidth: "30%",

    [theme.breakpoints.down("sm")]: {
        width: "100%",
        minWidth: "100%",
        display: "block",
    }
}));


const RightSection = styled(Box)(({ theme }) => ({
    width: "70%",
    minWidth: "300px",
    height: "100%",
    borderLeft: "1px solid rgba(0, 0, 0, 0.2)",

    [theme.breakpoints.down("sm")]: {
        width: "100%",
        minWidth: "100%",
        borderLeft: "none",
        display: "none", // default hidden on small screens
    }
}));

// When chat is opened on mobile
const ActiveRightSection = styled(RightSection)(({ theme }) => ({
    [theme.breakpoints.down("sm")]: {
        display: "block", //show chat when person selected
    },
}));

function ChatDialog() {
    const { person } = useContext(AccountContext);
    
    const showChat = Object.keys(person).length > 0; // check if chat selected

    return (
        <Dialog open={true} PaperProps={{ sx: (theme) => DialogStyle(theme) }} hideBackdrop={true} maxWidth="md" >
            <Box sx={{ display: "flex", height: "100%" }}>
                
                {/* Left Section — hide on small screens when chat is selected */}
                <LeftSection sx={{ display: { xs: showChat ? "none" : "block", sm: "block" } }}>
                    <Menu />
                </LeftSection>

                {/* Right Section — show on small screens only when chat selected */}
                {showChat ? (
                    <ActiveRightSection>
                        <ChatBox />
                    </ActiveRightSection>
                ) : (
                    <RightSection>
                        <EmptyChat />
                    </RightSection>
                )}
            </Box>
        </Dialog>
    );
}

export default ChatDialog;