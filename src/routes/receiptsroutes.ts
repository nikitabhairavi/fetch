import express from "express";
import { getReceipts, getPoints } from "../controllers/receiptController";
import validateReceipts from "../middleware/validations";
const router = express.Router();

router.post('/process', validateReceipts, getReceipts);

router.get('/:id/points', getPoints);

export default router;