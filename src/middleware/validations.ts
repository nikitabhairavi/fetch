import { ApiError } from "../Models/ApiError";
import { Receipt } from "../Models/ReceiptModels";
import { NextFunction, Request, Response } from "express";
import { ValidationError } from "../Models/ValidationError";

const expectedRetailerFormat = /^[\w\s\-&]+$/;
const expectedDateFormat = /^\d{4}-\d{2}-\d{2}$/;
const expectedTimeStampFormat = /^([01]\d|2[0-3]):([0-5]\d)$/;
const expectedPriceFormat = /^\d+\.\d{2}$/;
const expectedDescriptionFormat = /^[\w\s\-]+$/
// a function to validate the response for getReceipts
export const validateReceipts = (req:Request, response:Response, next:NextFunction) => {
    try {
        const receipt:Receipt = req.body;
        if (!receipt) {
            throwAppropriateError('invalidReceipt');
        }
        if (!expectedRetailerFormat.test(receipt.retailer)) {
            throwAppropriateError('invalidRetailer');
        }
        if (!expectedTimeStampFormat.test(receipt.purchaseTime)) {
            throwAppropriateError('invalidTime');
        }
        if (!expectedDateFormat.test(receipt.purchaseDate)) {
            throwAppropriateError('invalidDate');
        }
        if (!expectedPriceFormat.test(receipt.total)) {
            throwAppropriateError('invalidTotal');
        }

        for (const item of receipt.items) {
            if (!expectedPriceFormat.test(item.price)) {
                throwAppropriateError('invalidPrice');
            }
            if (!expectedDescriptionFormat.test(item.shortDescription)) {
                throwAppropriateError('invalidDescription');
            }
        }
        next();
    } catch(error) {
        next(error);
    }
}
export function throwAppropriateError(error:ValidationError) {
    let errorDescription;
    switch(error) {
        case 'invalidDate':
            errorDescription ='invalid Date'
            break;
        case 'invalidDescription':
            errorDescription = "invalid short description for some of the items"
            break;
        case 'invalidTotal':
            errorDescription = "invalid total price"
            break;
        case 'invalidPrice': 
            errorDescription = "invalid item price"
            break;
        case 'invalidRetailer':
            errorDescription = "invalid retailer"
            break;
        case 'invalidTime':
            errorDescription = "invalid purchase time"
            break;
        default:
            errorDescription = 'invalid receipt';
    }
    throw new ApiError({}, 400, errorDescription); 
}
export default validateReceipts;