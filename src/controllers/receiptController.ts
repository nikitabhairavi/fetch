import { NextFunction, Request, Response } from "express";
import { Receipt } from "../Models/ReceiptModels";
import { v7 as uuidv7 } from 'uuid';
import { ApiError } from "../Models/ApiError";
import { getRule1Points, getRule2Points, getRule3Points, getRule4Points, getRule5Points, getRule6Points, getRule7Points } from "../Utils/receiptControllerUtils";

let points: Record<string, number> = {};
export const getReceipts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const receipt: Receipt = req.body;
        const receiptId = processReceiptAndGetID(receipt);
        return res.status(200).send({ id: receiptId });
    } catch (error) {
        next(new ApiError({}, 500, 'Error'));
    }
}
export const getPoints = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        if (!points[id]) {
            throw new ApiError({}, 400, 'Receipt with the given id does not exist');
        }
        res.status(200).send({ points: points[id] });

    } catch (error) {
        next(error);
    }
}

export const processReceiptAndGetID = (receipt: Receipt): string => {
    const receiptId = uuidv7();
    points[receiptId] = countPoints(receipt);
    return receiptId;
}

export const countPoints = (receipt: Receipt) => {
    // check Alphanumeric characters in the retailer name;
    return getRule1Points(receipt) +
        getRule2Points(receipt) +
        getRule3Points(receipt) +
        getRule4Points(receipt) +
        getRule5Points(receipt) +
        getRule6Points(receipt) +
        getRule7Points(receipt);
}


