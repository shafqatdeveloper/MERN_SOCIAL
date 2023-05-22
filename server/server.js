import express from "express";
import { mongodbConnection } from "../server/Config/Database.js";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import userRouter from "./Routes/userRoute.js";
import postRouter from "./Routes/postRoute.js";
import chatRouter from "./Routes/chatRoute.js";
import { fileURLToPath } from "url";
import cors from "cors";
import path, { dirname, join } from "path";

const app = express();

// Configuring DOTENV

if (process.env.NODE_ENV !== "production") {
  dotenv.config({ path: "../server/Config/config.env" });
}

// Configuring Cookie-Parser
app.use(cookieParser());

// Configuring Body-Parser
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true }));

// Using CORS
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

const __filename = fileURLToPath(import.meta.url);
// Get the directory path
const __dirname = dirname(__filename);

// Configuring Database
mongodbConnection();

// Declaring Routes
app.use("/user", userRouter);
app.use("/post", postRouter);
app.use("/chat", chatRouter);

// Serve static files from public folder
app.use("/public", express.static(join(__dirname, "public")));

// Serve static files from Frontend

app.use(express.static(path.join(__dirname, "../client/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/dist/index.html"));
});

// Listening App
app.listen(process.env.PORT, () => {
  console.log(`App is Running on PORT : ${process.env.PORT}`);
});
