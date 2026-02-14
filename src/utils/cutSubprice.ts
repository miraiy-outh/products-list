export const cutSubprice = (price: number) => {
  return ", " + ("0" + ((price % 1) * 100).toFixed(0)).slice(-2);
};
