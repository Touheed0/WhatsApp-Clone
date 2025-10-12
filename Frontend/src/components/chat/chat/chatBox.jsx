import { useContext, useEffect, useState } from "react";
import { Box, styled } from "@mui/material";

//Components
import ChatHeader from "./chatHeader";
import MessageContainer from "./messageContainer";
import { AccountContext } from "../../../context/accountProvider";
import { getConversation } from "../../../service/api";

//Styling
const Container = styled(Box)`
    height: 100vh;
    display: flex;
    flex-direction: column;
`;

function ChatBox() {
    const { person, account } = useContext(AccountContext);

    const [conversation, setConversation] = useState({});

    useEffect(() => {
        const getConversationDetails = async () => {
            const data = await getConversation({ senderId: account.sub, receiverId: person.sub });
            // console.log(data);
            setConversation(data);
        }
        getConversationDetails();
    }, [person.sub])
    return (
        <>
            <Container>
                <ChatHeader person={person} />
                <MessageContainer person={person} conversation={conversation} />
            </Container>
        </>
    )
}

export default ChatBox;