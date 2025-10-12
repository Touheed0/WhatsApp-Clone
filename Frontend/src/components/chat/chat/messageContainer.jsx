import { useContext, useEffect, useState } from "react";
import { Box, styled, Typography } from "@mui/material";

//Components
import ChatFooter from "./chatFooter";
import { AccountContext } from "../../../context/accountProvider";
import { getMessages, newMessage } from "../../../service/api";
import { formateDate } from "../../../utils/common-utils";

//Styling
const MainContainer = styled(Box)`
  background-image: url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png");
  background-size: 50%;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Container = styled(Box)(({ theme }) => ({
    flex: 1,
    overflowY: "auto",
    padding: "10px 0 100px 0",

    [theme.breakpoints.down("sm")]: {
        paddingBottom: "18vh",
    }
}));


const Own = styled(Box)`
    background: #dcf8c6;
    max-width: 60%;
    margin-left: auto;
    padding: 5px;
    width: fit-content;
    display: flex;
    border-radius: 10px;
    word-break: break-word;
    margin-bottom: 5px;
    margin-right: 5px;
    margin-top: 5px;
`

const Wrapper = styled(Box)`
    background: #ffffff;
    max-width: 60%;
    padding: 5px;
    width: fit-content;
    display: flex;
    border-radius: 10px;
    word-break: break-word;
    margin-bottom: 5px;
    margin-left: 5px;
    margin-top: 5px;
`

const MessageText = styled(Typography)`
    font-size: 14px;
    padding: 0 25px 0 5px;
`

const MessageTime = styled(Typography)`
    font-size: 10px;
    color: #919191;
    word-break: keep-all;
    margin-top: auto;
`

function MessageContainer({ person, conversation }) {
    const [value, setValue] = useState("");
    const [messages, setMessages] = useState([]);
    const [newMessageFlag, setNewMessageFlag] = useState(false);
    const [incomingMessage, setIncomingMessage] = useState(null);

    const { account, socket } = useContext(AccountContext);


    useEffect(() => {
        socket.current.on("getMessage", data => {
            setIncomingMessage({ ...data, createdAt: Date.now() });
        })
    }, [])


    useEffect(() => {
        async function getMessageDetails() {
            const data = await getMessages(conversation._id);
            // console.log(data);
            setMessages(data);
        }
        conversation._id && getMessageDetails();
    }, [person._id, conversation._id, newMessageFlag])



    useEffect(() => {
        incomingMessage && conversation?.members?.includes(incomingMessage.senderId) &&
            setMessages(prev => [...prev, incomingMessage])
    }, [incomingMessage, conversation])



    const sendText = async (e) => {
        // console.log(e);
        const code = e.key || e.which;

        if (code === "Enter" || code === 13) {
            const message = {
                senderId: account.sub,
                receiverId: person.sub,
                conversationId: conversation._id,
                type: "text",
                text: value
            }
            // console.log(message);

            socket.current.emit("sendMessage", message);

            await newMessage(message);
            setValue("");
            setNewMessageFlag(prev => !prev);
        }
    }
    return (
        <>
            <MainContainer>
                <Container>
                    {
                        messages && messages.map(message => (
                            account.sub === message.senderId ? (
                                <Own key={message._id}>
                                    <MessageText>{message.text}</MessageText>
                                    <MessageTime>{formateDate(message.createdAt)}</MessageTime>
                                </Own>
                            ) : (
                                <Wrapper key={message._id}>
                                    <MessageText>{message.text}</MessageText>
                                    <MessageTime>{formateDate(message.createdAt)}</MessageTime>
                                </Wrapper>
                            )
                        ))
                    }

                </Container>

                <ChatFooter sendText={sendText} setValue={setValue} value={value} />
            </MainContainer>
        </>
    )
}

export default MessageContainer;