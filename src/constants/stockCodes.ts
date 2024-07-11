
    // stockName: reutersCode
    // fetch from db
    type TReutersCodes = "GOOGL.O" | "AMZN.O" | "AAPL.O" | "MSFT.O" | "TSLA.O" | "U";
    
    const REUTERS_CODES = [
  "GOOGL.O",
  "AMZN.O",
  "AAPL.O",
  "MSFT.O",
  "TSLA.O",
  "U"
] as const;
    
    const STOCK_CODES: { [key: string]: TReutersCodes } = {
  "ALPHABET": "GOOGL.O",
  "AMAZON": "AMZN.O",
  "APPLE": "AAPL.O",
  "MICROSOFT": "MSFT.O",
  "TESLA": "TSLA.O",
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
    