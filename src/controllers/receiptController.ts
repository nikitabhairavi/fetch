import { NextFunction, Request, Response } from "express";
import { Receipt } from "../Models/ReceiptModels";
import { v7 as uuidv7 } from 'uuid';
import { ApiError } from "../Models/ApiError";

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

export const getRule1Points = (receipt: Receipt) => {
    return receipt.retailer.replace(/[^a-zA-Z0-9]/g, '').length
};
export const getRule2Points = (receipt: Receipt) => {
    return parseFloat(receipt.total) % 1 === 0 ? 50 : 0;
}
export const getRule3Points = (receipt: Receipt) => {
    return parseFloat(receipt.total) % 0.25 === 0 ? 25 : 0;
}
export const getRule4Points = (receipt: Receipt) => {
    return Math.floor((receipt.items.length / 2)) * 5;
}
export const getRule5Points = (receipt: Receipt) => {
    let rule5Points: number = 0;
    receipt.items.forEach((item) => {
        rule5Points += item.shortDescription.trim().length % 3 === 0 ? Math.ceil(parseFloat(item.price) * 0.2) : 0;
    })
    return rule5Points;
}
export const getRule6Points = (receipt: Receipt) => {
    return parseInt(receipt.purchaseDate.split('-')[2], 10) % 2 !== 0 ? 6 : 0;
}
export const getRule7Points = (receipt: Receipt) => {
    const hourOfPurchase = parseInt(receipt.purchaseTime.split(':')[0], 10);
    return hourOfPurchase >= 14 && hourOfPurchase < 16 ? 10 : 0;
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


