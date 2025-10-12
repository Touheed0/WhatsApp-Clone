import axios from "axios";

const url = "https://whatsapp-clone-backend-wt80.onrender.com";

export async function AddUser(data) {
    try {
        await axios.post(`${url}/AddUser`, data);
    } catch (error) {
        console.log("Error while AddUser API", error.message);
    }
}

export async function getUsers() {
    try {
        const response = await axios.get(`${url}/users`);
        // console.log(response);
        return response.data;
    } catch (error) {
        console.log("Error while calling getUsers api", error.message);
    }
}

export async function setConversation(data) {
    try {
        await axios.post(`${url}/conversation/add`, data);
    } catch (error) {
        console.log("Error while calling setConversation api", error.message);
    }
}

export async function getConversation(data) {
    try {
        const response = await axios.post(`${url}/conversation/get`, data);
        return response.data;
    } catch (error) {
        console.log("Error while calling getConversation api", error.message);
    }
}

export async function newMessage(data) {
    try {
        const response = await axios.post(`${url}/message/add`, data);
        return response.data;
    } catch (error) {
        console.log("Error while calling newMessage api", error.message);
    }
}

export async function getMessages(id) {
    try {
        const response = await axios.get(`${url}/message/get/${id}`);
        return response.data;
    } catch (error) {
        console.log("Error while calling getMessage api", error.message);
    }
}