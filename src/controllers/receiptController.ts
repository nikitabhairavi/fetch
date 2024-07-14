import { NextFunction, Request, Response } from "express";
import { Receipt } from "../Models/ReceiptModels";
import {v7 as uuidv7} from 'uuid';
import { ApiError } from "../Models/ApiError";

let points: Record<string, number> = {};
export const getReceipts = async (req:Request, res: Response, next: NextFunction) => {
    try {
        const receipt: Receipt = req.body;
        const receiptId = processReceiptAndGetID(receipt);
        return res.status(200).send({id:receiptId});
    }  catch(error) {
        next(new ApiError({}, 500, 'Error'));
    }
}
export const getPoints = async(req: Request, res:Response, next:NextFunction) => {
    try {
        const id = req.params.id;
        console.log(points, '....');
        if (!points[id]) {
            throw new ApiError({}, 400, 'Receipt with the given id does not exist');
        }
        res.status(200).send({points: points[id]});

    } catch(error) {
        next(error);
    }
}

const processReceiptAndGetID = (receipt: Receipt): string => {
    const receiptId = uuidv7();
    points[receiptId] = countPoints(receipt);
    return receiptId;
}

 export const countPoints = (receipt:Receipt) =>  {
    // check Alphanumeric characters in the retailer name;
    const rule1Points:number = receipt.retailer.replace(/[^a-zA-Z0-9]/g, '').length;
    const rule2Points:number = parseFloat(receipt.total) % 1 === 0 ? 50 : 0;
    const rule3Points:number = parseFloat(receipt.total) % 0.25 === 0 ? 25 : 0;
    const rule4Points:number = (receipt.items.length / 2) * 5;
   
    let rule5Points:number = 0;
    receipt.items.forEach((item) => {
       rule5Points += item.shortDescription.trim().length % 3 === 0 ? parseFloat(item.price) * 0.2 : 0;
    })

    const rule6Points:number = parseInt(receipt.purchaseDate.split('-')[2], 10) % 2 !== 0 ? 6 : 0;
    
    const hourOfPurchase =  parseInt(receipt.purchaseTime.split(':')[0], 10);
    const rule7Points:number = hourOfPurchase >= 14 && hourOfPurchase < 16 ? 10 : 0;

    return rule1Points + rule2Points + rule3Points + rule4Points + rule5Points + rule6Points + rule7Points;

 }


