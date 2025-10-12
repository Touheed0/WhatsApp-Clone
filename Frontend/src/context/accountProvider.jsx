import { createContext, useEffect, useRef, useState } from "react";

import { io } from "socket.io-client";

export const AccountContext = createContext(null);


function AccountProvider({ children }) {
    const [account, setAccount] = useState();
    const [person, setPerson] = useState({});
    const [activeUsers, setActiveUsers] = useState([]);

    const socket = useRef();

    useEffect(() => {
        socket.current = io("http://localhost:9000"); 
    }, [])

    useEffect(() => {
        if (account) {
            socket.current.emit("addUsers", account);
            socket.current.on("getUsers", users => {
                setActiveUsers(users);
            });
        }
    }, [account]);

    return (
        <>
            <AccountContext.Provider value={{ account, setAccount, person, setPerson, socket, activeUsers, setActiveUsers }}>{children}</AccountContext.Provider>
        </>
    )
}

export default AccountProvider;