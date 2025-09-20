export const addTextBeforeBid = (bids: string[]) =>
  bids.map((bid) => `Заявка № ${bid}`);
