type Item = {
  shortDescription: string;
  price: string;
};
export type Receipt = {
  items: Item[];
  total: string;
  purchaseTime: string;
  purchaseDate: string;
  retailer: string;
};
