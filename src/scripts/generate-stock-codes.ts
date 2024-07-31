import { connectDB, disconnectDB } from "./db";
import StockCode from "@/models/stock-codes-schema";

const init = async () => {
  try {
    await connectDB();
    const stockCodes = await StockCode.find({});

    type TReutersCodes = "GOOGL.O" | "AMZN.O" | "AAPL.O" | "MSFT.O" | "TSLA.O" | "U";

    const reutersCodesSet = new Set<string>();
    const STOCK_CODES: { [key: string]: TReutersCodes } = {};
    const STOCK_NAMES: { [key in TReutersCodes]: string } = {
      "GOOGL.O": "",
      "AMZN.O": "",
      "AAPL.O": "",
      "MSFT.O": "",
      "TSLA.O": "",
      U: "",
    };

    stockCodes.forEach((stock) => {
      const code = stock.code as TReutersCodes;
      reutersCodesSet.add(code);
      STOCK_CODES[stock.name.toUpperCase()] = code;
      STOCK_NAMES[code] = stock.name.toLowerCase();
    });

    const REUTERS_CODES = Array.from(reutersCodesSet) as TReutersCodes[];

    const content = `
    // stockName: reutersCode
    // fetch from db
    type TReutersCodes = ${REUTERS_CODES.map((code) => `"${code}"`).join(" | ")};
    
    const REUTERS_CODES = ${JSON.stringify(REUTERS_CODES, null, 2)} as const;
    
    const STOCK_CODES: { [key: string]: TReutersCodes } = ${JSON.stringify(STOCK_CODES, null, 2)};
    
    const STOCK_NAMES: { [key in TReutersCodes]: string } = ${JSON.stringify(STOCK_NAMES, null, 2)};
    
    export { STOCK_CODES, STOCK_NAMES, REUTERS_CODES };
    
    export type { TReutersCodes };
    `;

    return content;
  } catch (error) {
    console.error("Error initializing stockCodes.ts file:", error);
    process.exit(1);
  } finally {
    await disconnectDB();
  }
};

export default init;
