import express, {Express} from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import cors from "cors";
import verify from "./middleware/validations";
import receipt from "./routes/receiptsroutes";
import error from "./middleware/formatError"
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(morgan("dev"));
app.use(rateLimit({
    windowMs: Number(process.env.TIME_LIMIT) * 60 * 1000 || 10 * 60 * 1000, 
    max: Number(process.env.REQUEST_LIMIT)
}));
app.use(cors());

app.use("/receipts", verify, receipt);
app.use(error);

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
