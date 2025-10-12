import { Box, Divider, styled, Typography } from "@mui/material";

import { emptyChatImage } from "../../constants/data";

//Styling
const MainContainer = styled(Box)`
    background: #f8f9fa;
    padding: 30px 0;
    text-align: center;
    height: 100vh;
`

const Body = styled(Box)`
    padding: 0 200px;
`

const Image = styled("img")({
    width: 300,
    marginTop: 50
})

const Title = styled(Typography)`
    font-size: 32px;
    margin: 25px 0 10px 0;
    font-family: inherit;
    font-weight: 300;
    color: #41525d;
`

const SubTitle = styled(Typography)`
    font-size: 13px;
    color: #667781;
    font-weight: 400;
    font-family: inherit;
`

const StyleDivider = styled(Divider)`
    margin: 40px 0;
    opacity: 0.4;
`

function EmptyChat() {
    return (
        <>
            <MainContainer>
                <Body>
                    <Image src={emptyChatImage} alt="Empty Chat Image" />

                    <Title>WhatsApp Web</Title>

                    <SubTitle>Now send and receive message without keeping your phone online.</SubTitle>

                    <SubTitle>use WhatsApp on up to 4 linked devices and 1 phone at the same time.</SubTitle>

                    <StyleDivider />
                </Body>
            </MainContainer>
        </>
    )
}

export default EmptyChat;