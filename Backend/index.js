import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import Connection from "./database/db.js";
import Route from "./routes/route.js";

dotenv.config();

const app = express();
app.use(
    cors({
        origin: "https://whatsapp-clone-frontend-tqbv.onrender.com",
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);
// app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", Route);

const PORT = process.env.PORT || 8000;

Connection();

app.listen(PORT, () => {
    console.log(`Server is running on PORT number ${PORT}`);
})