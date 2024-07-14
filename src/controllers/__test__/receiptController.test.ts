import { Receipt } from "../../Models/ReceiptModels";
import { countPoints, getReceipts, getRule1Points, getRule2Points, getRule3Points, getRule4Points, getRule5Points, getRule6Points, getRule7Points, processReceiptAndGetID } from "../receiptController"
import {v7 as uuidv7} from "uuid";
import {NextFunction, Request, Response} from 'express';

jest.mock('uuid', () => ({
    v7: jest.fn().mockResolvedValue('mockId')
}));
const inputRecipt: Receipt = {
    retailer: "M&M Corner Market",
    purchaseDate: "2022-03-20",
    purchaseTime: "14:33",
    items: [
        {
            shortDescription: "Gatorade",
            price: "2.25"
        }, {
            shortDescription: "Gatorade",
            price: "2.25"
        }, {
            shortDescription: "Gatorade",
            price: "2.25"
        }, {
            shortDescription: "Gatorade",
            price: "2.25"
        }
    ],
    total: "9.00"
};

describe('receiptController', () => {
    it('should return correct points for each rule', () => {
        const rule1Points = getRule1Points(inputRecipt);
        const rule2Points = getRule2Points(inputRecipt);
        const rule3Points = getRule3Points(inputRecipt);
        const rule4Points = getRule4Points(inputRecipt);
        const rule5Points = getRule5Points(inputRecipt);
        const rule6Points = getRule6Points(inputRecipt);
        const rule7Points = getRule7Points(inputRecipt);

        expect(rule1Points).toEqual(14);
        expect(rule2Points).toEqual(50);
        expect(rule3Points).toEqual(25);
        expect(rule4Points).toEqual(10);
        expect(rule5Points).toEqual(0);
        expect(rule6Points).toEqual(0);
        expect(rule7Points).toEqual(10);

        const total = countPoints(inputRecipt);

        expect(total).toEqual(rule1Points + rule2Points + rule3Points + rule4Points + rule5Points + rule6Points + rule7Points);
    });
    it ('should set id for the given request and set points', () => {
        (uuidv7 as jest.Mock).mockReturnValue("mockId");
        const receiptId = processReceiptAndGetID(inputRecipt);
        expect(receiptId).toEqual('mockId');
    });
})