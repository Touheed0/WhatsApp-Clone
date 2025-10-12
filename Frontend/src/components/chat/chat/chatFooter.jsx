import { Box, InputBase, styled } from "@mui/material";

//Material Icons
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import MicNoneOutlinedIcon from '@mui/icons-material/MicNoneOutlined';


//Styling
const MainContainer = styled(Box)(({ theme }) => ({
    height: "10vh",
    background: "#ededed",
    display: "flex",
    alignItems: "center",
    padding: "0 15px",
    gap: "5px",
    color: "#919191",
    position: "sticky",
    bottom: 0,
    width: "100%",

    [theme.breakpoints.down("sm")]: {
        padding: "0 10px",
    }
}));


const SearchContainer = styled(Box)`
    background: white;
    border-radius: 18px;
    width: calc(94% - 100px);
`

const InputField = styled(InputBase)`
    width: 100%;
    height: 18px;
    padding: 20px;
`

function ChatFooter({ sendText, setValue, value }) {

    return (
        <>
            <MainContainer>
                <EmojiEmotionsOutlinedIcon />
                <AttachFileOutlinedIcon />

                <SearchContainer>
                    <InputField placeholder="Type a message" onChange={(event) => { setValue(event.target.value); }} onKeyDown={(e) => { sendText(e) }}
                        value={value} />
                </SearchContainer>
                <MicNoneOutlinedIcon />
            </MainContainer>
        </>
    )
}

export default ChatFooter;