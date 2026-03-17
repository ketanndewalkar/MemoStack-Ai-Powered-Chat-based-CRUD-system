import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import { mongoDbConnect } from "./src/db/db.js";
import cookieParser from "cookie-parser";
import authRoute from "./src/routes/auth.route.js";
import folderRoute from "./src/routes/folder.route.js";
import noteRoute from "./src/routes/note.route.js";
import linkRoute from "./src/routes/link.route.js";
const PORT = process.env.PORT || 8080;
const app = express();
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/folder", folderRoute);
app.use("/api/v1/note", noteRoute);
app.use("/api/v1/link", linkRoute);

mongoDbConnect()
  .then((res) => {
    console.log("Connected to the MongoDb");
    app.listen(PORT, () => {
      console.log("listening for the Port ", PORT);
    });
  })
  .catch((err) => console.log("Issue in the conenction"));
