import { TReutersCodes } from "@/constants/stockCodes";
import Report from "../_components";

export default async function ReportPage({ params }: { params: { stockReutersCode: TReutersCodes } }) {
  return <Report reutersCode={params.stockReutersCode} />;
}
