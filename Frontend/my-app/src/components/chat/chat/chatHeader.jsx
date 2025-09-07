import { useContext } from "react";
import { Box, styled, Typography } from "@mui/material";

//Components
import { emptyProfilePicture } from "../../constants/data";
import { AccountContext } from "../../../context/accountProvider";

//Material Icons
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';

//Styling
const Header = styled(Box)`
    height: 44px;
    background: #ededed;
    padding: 8px 16px;
    display: flex;
    align-items: center;
`

const Image = styled("img")({
    width: 40,
    height: 40,
    objectFit: "cover",
    borderRadius: "100%"
})

const Name = styled(Typography)`
    margin-left: 12px !important;
`

const Status = styled(Typography)`
    margin-left: 12px !important;
    font-size: 12px;
    color: rgba(0 , 0 , 0 , 0.6);
`

const RigtContainer = styled(Box)`
    margin-left: auto;

    & > svg {
        padding: 8px;
        font-size: 24px;
        color: rgba( 0 , 0 , 0 , 0.6 );
    }
`

function ChatHeader({ person }) {
    const { activeUsers } = useContext(AccountContext);
    return (
        <>
            <Header>
                <Image src={person.picture} alt="DP" />
                <Box>
                    <Name>{person.name}</Name>
                    <Status>{activeUsers?.find(user => user.sub === person.sub) ? "Online" : "Offline"}</Status>
                </Box>

                <RigtContainer>
                    <SearchIcon />
                    <MoreVertIcon />
                </RigtContainer>
            </Header>
        </>
    )
}

export default ChatHeader;