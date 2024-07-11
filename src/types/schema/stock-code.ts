import mongoose from "mongoose";

interface IStockCode extends Document {
  name: string;
  code: string;
}

const stockCodeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
});

const StockCode = mongoose.models?.Stock || mongoose.model("StockCode", stockCodeSchema);

export default StockCode;
export type { IStockCode };
