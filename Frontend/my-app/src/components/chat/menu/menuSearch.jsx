import { Box, styled, InputBase } from "@mui/material";

//Material Icons
import SearchIcon from '@mui/icons-material/Search';

//Styling
const MainContainer = styled(Box)`
    background: #fff;
    height: 45px;
    border-bottom: 1px solid #F2F2F2;
`

const Warpper = styled(Box)`
    background: #f0f2f5;
    position: relative;
    margin: 13px auto;
    width: 90%;
    border-radius: 10px;
`

const Icon = styled(Box)`
    position: absolute;
    color: #919191;
    height: 100%;
    padding: 8px;
`

const InputField = styled(InputBase)`
    width: 100%;
    padding: 16px;
    padding-left: 65px;
    height: 15px;
    font-size: 14px;
`

function MenuSearch({ setText }) {

    return (
        <>
            <MainContainer>
                <Warpper>
                    <Icon>
                        <SearchIcon fontSize="small" />
                    </Icon>
                    <InputField placeholder="Search or start new chat" onChange={(event) => { setText(event.target.value); }} />
                </Warpper>
            </MainContainer>
        </>
    )
}

export default MenuSearch;