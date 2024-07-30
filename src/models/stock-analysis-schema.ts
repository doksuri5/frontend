import { Schema, model, Document, models } from "mongoose";

interface Metrics {
  stockName: string;
  symbolCode: string;
  fluctuationsRatio: number;
  closePriceChange: number;
  closePrice: number;
}

interface MultiLangText {
  ko: string;
  en: string;
  jp: string;
  ch: string;
  fr: string;
}

interface StockDocument extends Document {
  reutersCode: string;
  symbolCode: string;
  description: MultiLangText;
  investmentIndex: number;
  profitabilityPercentage: number;
  interestPercentage: number;
  growthPercentage: number;
  report: MultiLangText;
  metrics: Metrics;
}

const multiLangTextSchema = new Schema<MultiLangText>(
  {
    ko: { type: String, required: true },
    en: { type: String, required: true },
    jp: { type: String, required: true },
    ch: { type: String, required: true },
    fr: { type: String, required: true },
  },
  { _id: false },
);

const metricsSchema = new Schema<Metrics>(
  {
    stockName: { type: String, required: true },
    symbolCode: { type: String, required: true },
    fluctuationsRatio: { type: Number, required: true },
    closePriceChange: { type: Number, required: true },
    closePrice: { type: Number, required: true },
  },
  { _id: false },
);

const stockAnalysisSchema = new Schema<StockDocument>(
  {
    reutersCode: { type: String, required: true, unique: true },
    symbolCode: { type: String, required: true },
    description: { type: multiLangTextSchema, required: true },
    investmentIndex: { type: Number, min: -100, max: 100, required: true },
    profitabilityPercentage: { type: Number, min: -100, max: 100, required: true },
    interestPercentage: { type: Number, min: -100, max: 100, required: true },
    growthPercentage: { type: Number, min: -100, max: 100, required: true },
    report: { type: multiLangTextSchema, required: true },
    metrics: { type: metricsSchema, required: true },
  },
  { timestamps: true },
);

export const StockAnalysis = models.StockAnalysis || model<StockDocument>("StockAnalysis", stockAnalysisSchema);
