import { Receipt } from "../models/ReceiptModels";
import { RULE_VALUES } from "../constants/ruleContants";

export const getRule1Points = (receipt: Receipt) => {
  return receipt.retailer.replace(/[^a-zA-Z0-9]/g, "").length;
};
export const getRule2Points = (receipt: Receipt) => {
  return parseFloat(receipt.total) % 1 === 0
    ? RULE_VALUES.POINTS_FOR_RULE_2
    : RULE_VALUES.RULE_FAIL_POINTS;
};
export const getRule3Points = (receipt: Receipt) => {
  return parseFloat(receipt.total) % 0.25 === 0
    ? RULE_VALUES.POINTS_FOR_RULE_3
    : RULE_VALUES.RULE_FAIL_POINTS;
};
export const getRule4Points = (receipt: Receipt) => {
  return (
    Math.floor(receipt.items.length / RULE_VALUES.ITEM_GROUP_COUNT_RULE_4) *
    RULE_VALUES.POINTS_FOR_RULE_4
  );
};
export const getRule5Points = (receipt: Receipt) => {
  let rule5Points: number = 0;
  receipt.items.forEach((item) => {
    rule5Points +=
      item.shortDescription.trim().length %
        RULE_VALUES.CHAR_MULTIPLES_RULE_5 ===
      0
        ? Math.ceil(parseFloat(item.price) * RULE_VALUES.MULTIPLY_BY_FOR_RULE_5)
        : RULE_VALUES.RULE_FAIL_POINTS;
  });
  return rule5Points;
};
export const getRule6Points = (receipt: Receipt) => {
  return parseInt(receipt.purchaseDate.split("-")[2], 10) % 2 !== 0
    ? RULE_VALUES.POINTS_PER_ODD_PURCHASE_DATE
    : RULE_VALUES.RULE_FAIL_POINTS;
};
export const getRule7Points = (receipt: Receipt) => {
  const hourOfPurchase = parseInt(receipt.purchaseTime.split(":")[0], 10);
  return hourOfPurchase >= RULE_VALUES.TIME_LOWER_LIMIT_RULE_7 &&
    hourOfPurchase < RULE_VALUES.TIME_UPPER_LIMIT_RULE_7
    ? RULE_VALUES.POINTS_FOR_RULE_7
    : RULE_VALUES.RULE_FAIL_POINTS;
};
