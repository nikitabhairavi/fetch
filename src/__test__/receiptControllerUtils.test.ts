import {
  getRule1Points,
  getRule2Points,
  getRule3Points,
  getRule4Points,
  getRule5Points,
  getRule6Points,
  getRule7Points,
} from "../Utils/receiptControllerUtils";
import { mockReceipt } from "../__mocks__/mockReceipt";
import { countPoints } from "../controllers/receiptController";

it("should return correct points for each rule", () => {
  const rule1Points = getRule1Points(mockReceipt);
  const rule2Points = getRule2Points(mockReceipt);
  const rule3Points = getRule3Points(mockReceipt);
  const rule4Points = getRule4Points(mockReceipt);
  const rule5Points = getRule5Points(mockReceipt);
  const rule6Points = getRule6Points(mockReceipt);
  const rule7Points = getRule7Points(mockReceipt);

  expect(rule1Points).toEqual(14);
  expect(rule2Points).toEqual(50);
  expect(rule3Points).toEqual(25);
  expect(rule4Points).toEqual(10);
  expect(rule5Points).toEqual(0);
  expect(rule6Points).toEqual(0);
  expect(rule7Points).toEqual(10);

  const total = countPoints(mockReceipt);

  expect(total).toEqual(
    rule1Points +
      rule2Points +
      rule3Points +
      rule4Points +
      rule5Points +
      rule6Points +
      rule7Points,
  );
});
