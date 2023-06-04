import bodyParser from "body-parser";
import cookieParser from 'cookie-parser';
import cors from "cors";
import { config } from "dotenv";
import express from "express";
import { EXPRESS_GENERAL } from "./assets/constants";
import { db } from "./configuration/db";
import { errorMiddleware } from "./middleware/error.middleware";
import verifyToken from "./middleware/verify.middleware";
import apartmentRouter from "./routes/apartment.router";
import authRouter from "./routes/authentication.router";
import tenantRouter from "./routes/tenant.router";
import userRouter from "./routes/user.router";
import expenseRouter from "./routes/expense.router";
import leaseRouter from "./routes/lease.router";

config();
const app = express();
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, limit: EXPRESS_GENERAL.LIMIT }));

const { PORT } = process.env;

db.on("error", (error) => {
  console.log(`MongoDB error: ${error}`);
})

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/apartment", verifyToken, apartmentRouter);
app.use("/expense", verifyToken, expenseRouter);
app.use("/lease", verifyToken, leaseRouter);
app.use("/tenant", verifyToken, tenantRouter);

app.use(errorMiddleware)

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`);
});
