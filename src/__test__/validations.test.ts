import { ApiError } from "../models/ApiError";
import { Receipt } from "../models/ReceiptModels";
import { mockReceipt } from "../__mocks__/mockReceipt";
import validateReceipts, {
  throwAppropriateError,
} from "../middleware/validations";
import { NextFunction, Request, Response } from "express";

const request: Partial<Request> = {
  body: mockReceipt,
};
const response: Partial<Response> = {};
const next: jest.Mock<NextFunction> = jest.fn();
describe("validations", () => {
  it("should not call next with an error if validation is successful", () => {
    const result = validateReceipts(
      request as Request,
      response as Response,
      next,
    );
    expect(next).toHaveBeenCalledWith();
  });
  it("should call next with an appropriate error if total price validation fails", () => {
    let result = validateReceipts(
      { ...request, body: { ...request.body, total: "a" } } as Request,
      response as Response,
      next,
    );
    expect(next).toHaveBeenCalledWith(
      new ApiError({}, 400, "invalid total price"),
    );
    expect(result).not.toBeDefined();
  });
  it("should call next with an appropriate error if retailer validation fails", () => {
    let result = validateReceipts(
      { ...request, body: { ...request.body, retailer: "...." } } as Request,
      response as Response,
      next,
    );
    expect(next).toHaveBeenCalledWith(
      new ApiError({}, 400, "invalid retailer"),
    );
    expect(result).not.toBeDefined();
  });
  it("should call next with an appropriate error if purchase date validation fails", () => {
    let result = validateReceipts(
      {
        ...request,
        body: { ...request.body, purchaseDate: "...." },
      } as Request,
      response as Response,
      next,
    );
    expect(next).toHaveBeenCalledWith(new ApiError({}, 400, "invalid Date"));
    expect(result).not.toBeDefined();
  });
  it("should call next with an appropriate error if purchase time validation fails", () => {
    let result = validateReceipts(
      {
        ...request,
        body: { ...request.body, purchaseTime: "...." },
      } as Request,
      response as Response,
      next,
    );
    expect(next).toHaveBeenCalledWith(
      new ApiError({}, 400, "invalid purchase time"),
    );
    expect(result).not.toBeDefined();
  });
  it("should call next with an appropriate error if item price validation fails", () => {
    let result = validateReceipts(
      {
        ...request,
        body: {
          ...request.body,
          items: [{ shortDescription: "description", price: "*" }],
        },
      } as Request,
      response as Response,
      next,
    );
    expect(next).toHaveBeenCalledWith(
      new ApiError({}, 400, "invalid item price"),
    );
    expect(result).not.toBeDefined();
  });
  it("should call next with an appropriate error if item short descriptiom validation fails", () => {
    let result = validateReceipts(
      {
        ...request,
        body: {
          ...request.body,
          items: [{ shortDescription: "0 * ", price: "11.20" }],
        },
      } as Request,
      response as Response,
      next,
    );
    expect(next).toHaveBeenCalledWith(
      new ApiError({}, 400, "invalid short description for some of the items"),
    );
    expect(result).not.toBeDefined();
  });
});
describe("throwAppropriateError", () => {
  it("should return appropriate api error for each case", () => {
    try {
      throwAppropriateError("invalidDate");
    } catch (error) {
      expect(error).toEqual(new ApiError({}, 400, "invalid Date"));
    }

    try {
      throwAppropriateError("invalidDescription");
    } catch (error) {
      expect(error).toEqual(
        new ApiError(
          {},
          400,
          "invalid short description for some of the items",
        ),
      );
    }

    try {
      throwAppropriateError("invalidPrice");
    } catch (error) {
      expect(error).toEqual(new ApiError({}, 400, "invalid item price"));
    }

    try {
      throwAppropriateError("invalidRetailer");
    } catch (error) {
      expect(error).toEqual(new ApiError({}, 400, "invalid retailer"));
    }

    try {
      throwAppropriateError("invalidTime");
    } catch (error) {
      expect(error).toEqual(new ApiError({}, 400, "invalid purchase time"));
    }

    try {
      throwAppropriateError("invalidReceipt");
    } catch (error) {
      expect(error).toEqual(new ApiError({}, 400, "invalid receipt"));
    }
  });
});
