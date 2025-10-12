import { useContext, useEffect, useState } from "react";
import { Box, Divider, styled, Typography } from "@mui/material";

//Components
import { getUsers } from "../../../service/api";
import { AccountContext } from "../../../context/accountProvider";
import { setConversation } from "../../../service/api";
import { emptyProfilePicture } from "../../constants/data";

//Styling
const Body = styled(Box)`
    height: 80vh;
    overflow:overlay;
`


const MainContainer = styled(Box)`
    display: flex;
    // align-items: center;
    height: 35px;
    padding: 14px 0;
    cursor: pointer;
`

const DpImage = styled("img")({
    width: 40,
    height: 40,
    borderRadius: "50%",
    padding: "0 14px"
})

const DividerStyling = styled(Divider)`
    margin: 0 0 0 60px;
    background: #e9edef;
    opacity: .5;
`

function Conversation({ text }) {
    const [users, setUsers] = useState([]);

    const { account } = useContext(AccountContext);



    useEffect(() => {
        async function fetchData() {
            const response = await getUsers();
            const filterData = response.filter(user => user.name.toLowerCase().includes(text.toLowerCase()));
            // setUsers(response);
            setUsers(filterData);
        }
        fetchData();
    }, [text]);


    const { socket, setActiveUsers } = useContext(AccountContext);
    useEffect(() => {
        socket.current.emit("addUsers", account);
        socket.current.on("getUsers", users => {
            setActiveUsers(users);
        })
    }, [account])

    const { setPerson } = useContext(AccountContext);
    const getUser = async (user) => {
        setPerson(user);
        await setConversation({ senderId: account.sub, receiverId: user.sub });
    }
    return (
        <>
            <Body>
                {
                    users.map(user => (
                        user.sub !== account.sub &&
                        <Box key={user.sub}>
                            <MainContainer onClick={() => getUser(user)}>
                                <Box>
                                    <DpImage src={user?.picture || emptyProfilePicture} alt="DP" />
                                </Box>

                                <Box>
                                    <Typography>{user.name}</Typography>
                                </Box>
                            </MainContainer>

                            <DividerStyling />
                        </Box>
                    ))
                }
            </Body>
        </>
    )
}

export default Conversation;