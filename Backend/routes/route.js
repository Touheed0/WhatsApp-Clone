import express from "express";

//Models & Schema
import User from "../models/user.js";
import Conversation from "../models/conversation.js";
import Message from "../models/message.js";


const Route = express.Router();

Route.post("/AddUser", async (request, response) => {
    try {
        let exist = await User.findOne({ sub: request.body.sub });
        if (exist) {
            response.status(200).json({ msg: "user already exists" });
            return;
        }

        const newUser = new User(request.body);
        await newUser.save();
        return response.status(200).json(newUser);
    } catch (error) {
        return response.status(500).json(error.message);
    }
})


Route.get("/users", async (request, response) => {
    try {
        const users = await User.find({});
        return response.status(200).json(users);
    } catch (error) {
        return response.status(500).json(error.message);
    }
})

Route.post("/conversation/add", async (request, response) => {
    try {
        const senderId = request.body.senderId;
        const receiverId = request.body.receiverId;

        const exist = await Conversation.findOne({ members: { $all: [senderId, receiverId] } });
        if (exist) {
            return response.status(200).json("conversation already exists");
        }

        const newConversations = new Conversation({ members: [senderId, receiverId] });
        await newConversations.save();
        return response.status(200).json("conversation saved successfully");
    } catch (error) {
        return response.status(500).json(error.message);
    }
})

Route.post("/conversation/get", async (request, response) => {
    try {
        const senderId = request.body.senderId;
        const receiverId = request.body.receiverId;

        const conversation = await Conversation.findOne({ members: { $all: [senderId, receiverId] } });
        return response.status(200).json(conversation);
    } catch (error) {
        return response.status(500).json(error.message);
    }
})

Route.post("/message/add", async (request, response) => {
    try {
        const newMessage = new Message(request.body);
        await newMessage.save();

        await Conversation.findByIdAndUpdate(request.body.conversationId, { message: request.body.text });

        return response.status(200).json("Message has been send successfully");
    } catch (error) {
        return response.status(500).json(error.message);
    }
})

Route.get("/message/get/:id", async (request, response) => {
    try {
        const messages = await Message.find({ conversationId: request.params.id });
        return response.status(200).json(messages);
    } catch (error) {
        return response.status(500).json(error.message);
    }
})


export default Route;