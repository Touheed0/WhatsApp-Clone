import mongoose from "mongoose";

async function Connection() {
    const URL = "mongodb://localhost:27017/WhatsApp-Clone";

    try {
        await mongoose.connect(URL);
        console.log("Data Base Connected Successfully");
    } catch (error) {
        console.log("Data Base Not Connected ", error.message);
    }
}

export default Connection;