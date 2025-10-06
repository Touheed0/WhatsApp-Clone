import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

async function Connection() {
    const USERNAME = process.env.DB_USERNAME;
    const PASSWORD = process.env.DB_PASSWAORD;

    const URL = `mongodb+srv://${USERNAME}:${PASSWORD}@whatsapp-clone-cluster.mc0nzyc.mongodb.net/?retryWrites=true&w=majority&appName=WhatsApp-Clone-Cluster`;

    try {
        await mongoose.connect(URL);
        console.log("Data Base Connected Successfully");
    } catch (error) {
        console.log("Data Base Not Connected ", error.message);
    }
}

export default Connection;