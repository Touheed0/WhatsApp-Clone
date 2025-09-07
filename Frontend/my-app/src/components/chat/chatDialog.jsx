import { useContext } from "react";
import { Box, Dialog, styled } from "@mui/material";

//Components
import Menu from "./menu/menu";
import EmptyChat from "./chat/emptyChat";
import ChatBox from "./chat/chatBox";
import { AccountContext } from "../../context/accountProvider";

//Styling
const DialogStyle = {
    height: "95%",
    width: "100%",
    margin: "20px",
    maxWidth: "100%",
    maxHeight: "100%",
    boxShadow: "none",
    overflow: "hidden",
    borderRadius: "0"
}

const LeftSection = styled(Box)`
min-width: 30%;
`

const RightSection = styled(Box)`
width: 70%;
min-width: 300px;
height: 100%;
border-left: 1px solid rgba(0 , 0 , 0 , 0.2);
`

function ChatDialog() {
    const { person } = useContext(AccountContext);
    return (
        <>
            <Dialog open={true} PaperProps={{ sx: DialogStyle }} hideBackdrop={true} maxWidth={"md"}>
                <Box style={{ display: "flex" }}>
                    {/* Left Section */}
                    <LeftSection>
                        <Menu />
                    </LeftSection> 

                    {/* Right Section */}
                    <RightSection>
                        {/* <EmptyChat />
                        <ChatBox /> */}
                        {
                            Object.keys(person).length ? <ChatBox /> : <EmptyChat />
                        }
                    </RightSection>
                </Box>
            </Dialog>
        </>
    )
}

export default ChatDialog;