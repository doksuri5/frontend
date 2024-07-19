
    // stockName: reutersCode
    // fetch from db
    type TReutersCodes = "AAPL.O" | "MSFT.O" | "TSLA.O" | "AMZN.O" | "GOOGL.O" | "U";
    
    const REUTERS_CODES = [
  "AAPL.O",
  "MSFT.O",
  "TSLA.O",
  "AMZN.O",
  "GOOGL.O",
  "U"
] as const;
    
    const STOCK_CODES: { [key: string]: TReutersCodes } = {
  "APPLE": "AAPL.O",
  "MICROSOFT": "MSFT.O",
  "TESLA": "TSLA.O",
  "AMAZON": "AMZN.O",
  "ALPHABET": "GOOGL.O",
  "UNITY": "U"
};
    
    const STOCK_NAMES: { [key in TReutersCodes]: string } = {
  "GOOGL.O": "alphabet",
  "AMZN.O": "amazon",
  "AAPL.O": "apple",
  "MSFT.O": "microsoft",
  "TSLA.O": "tesla",
  "U": "unity"
};
    
    export { STOCK_CODES, STOCK_NAMES, REUTERS_CODES };
    
    export type { TReutersCodes };
    