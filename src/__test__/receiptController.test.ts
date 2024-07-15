import { Receipt } from "../models/ReceiptModels";
import { processReceiptAndGetID } from "../controllers/receiptController";
import { v7 as uuidv7 } from "uuid";
import { mockReceipt } from "../__mocks__/mockReceipt";

jest.mock("uuid", () => ({
  v7: jest.fn().mockResolvedValue("mockId"),
}));
const inputRecipt: Receipt = mockReceipt;

describe("receiptController", () => {
  it("should set id for the given request and set points", () => {
    (uuidv7 as jest.Mock).mockReturnValue("mockId");
    const receiptId = processReceiptAndGetID(inputRecipt);
    expect(receiptId).toEqual("mockId");
  });
});
