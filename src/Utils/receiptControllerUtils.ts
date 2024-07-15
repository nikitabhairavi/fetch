import { Receipt } from "../Models/ReceiptModels";
import {
  POINTS_FOR_RULE_2,
  RULE_FAIL_POINTS,
  POINTS_FOR_RULE_3,
  ITEM_GROUP_COUNT_RULE_4,
  POINTS_FOR_RULE_4,
  CHAR_MULTIPLES_RULE_5,
  MULTIPLY_BY_FOR_RULE_5,
  POINTS_PER_ODD_PURCHASE_DATE,
  TIME_LOWER_LIMIT_RULE_7,
  TIME_UPPER_LIMIT_RULE_7,
  POINTS_FOR_RULE_7,
} from "../constants/ruleContants";

export const getRule1Points = (receipt: Receipt) => {
  return receipt.retailer.replace(/[^a-zA-Z0-9]/g, "").length;
};
export const getRule2Points = (receipt: Receipt) => {
  return parseFloat(receipt.total) % 1 === 0
    ? POINTS_FOR_RULE_2
    : RULE_FAIL_POINTS;
};
export const getRule3Points = (receipt: Receipt) => {
  return parseFloat(receipt.total) % 0.25 === 0
    ? POINTS_FOR_RULE_3
    : RULE_FAIL_POINTS;
};
export const getRule4Points = (receipt: Receipt) => {
  return (
    Math.floor(receipt.items.length / ITEM_GROUP_COUNT_RULE_4) *
    POINTS_FOR_RULE_4
  );
};
export const getRule5Points = (receipt: Receipt) => {
  let rule5Points: number = 0;
  receipt.items.forEach((item) => {
    rule5Points +=
      item.shortDescription.trim().length % CHAR_MULTIPLES_RULE_5 === 0
        ? Math.ceil(parseFloat(item.price) * MULTIPLY_BY_FOR_RULE_5)
        : RULE_FAIL_POINTS;
  });
  return rule5Points;
};
export const getRule6Points = (receipt: Receipt) => {
  return parseInt(receipt.purchaseDate.split("-")[2], 10) % 2 !== 0
    ? POINTS_PER_ODD_PURCHASE_DATE
    : RULE_FAIL_POINTS;
};
export const getRule7Points = (receipt: Receipt) => {
  const hourOfPurchase = parseInt(receipt.purchaseTime.split(":")[0], 10);
  return hourOfPurchase >= TIME_LOWER_LIMIT_RULE_7 &&
    hourOfPurchase < TIME_UPPER_LIMIT_RULE_7
    ? POINTS_FOR_RULE_7
    : RULE_FAIL_POINTS;
};
