import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { config } from "dotenv";
import { EXPRESS_GENERAL } from "./assets/constants";
import { db } from "./configuration/db";
import authRouter from "./routes/authentication.router";
import userRouter from "./routes/user.router";
import { errorMiddleware } from "./middleware/error.middleware";
import cookieParser from 'cookie-parser';
import apartmentRouter from "./routes/apartment.router";
import verifyToken from "./middleware/verify.middleware";

config();
const app = express();
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, limit: EXPRESS_GENERAL.LIMIT }));

// app.use(
//   bodyParser.urlencoded({ extended: false })
// );
const { PORT } = process.env;

db.on("error", (error) => {
  console.log(`MongoDB error: ${error}`);
})

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/apartment", verifyToken, apartmentRouter);

app.use(errorMiddleware)

app.get("/", (req, res) => {
  res.send("Hello world!");
});



app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`);
});
