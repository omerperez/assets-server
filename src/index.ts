import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { config } from "dotenv";
import { EXPRESS_GENERAL } from "./assets/constants";
import { db } from "./configuration/db";

config();
const app = express();
app.use(cors());
app.use(
  bodyParser.urlencoded({ limit: EXPRESS_GENERAL.LIMIT, extended: false })
);
const { PORT } = process.env;

db.on("error", (error) => {
  console.log(`MongoDB error: ${error}`);
})

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`);
});
