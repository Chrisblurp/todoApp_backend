import express from "express";
import dotenv from "dotenv";
import { dbConnect } from "./config/dbconnect.js";
import todoItemsRoute from "./routes/todoitemsroute.js";
import userRoute from "./routes/userroute.js";
import cors from "cors"

dbConnect();
dotenv.config();


const app = express();

app.use(cors());

app.use(
    express.urlencoded({ extended: true })
);

// middleware to access the req properties
app.use(express.json());

app.use("/api/todoitems", todoItemsRoute);

app.use("/api/users", userRoute);

const PORT = process.env.Port || 7000;
app.listen(PORT, console.log(`Server is running at ${PORT}`));