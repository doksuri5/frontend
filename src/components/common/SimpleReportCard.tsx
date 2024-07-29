import { TReutersCodes } from "@/constants/stockCodes";
import ReportCardContent from "./ReportCardContent";
import ReportCardHeader from "./ReportCardHeader";
import StockPrice from "./StockPrice";

const SimpleReportCard = ({
  reutersCode,
  isShowHeader = true,
  isShowPrice = true,
  titleSize = "md",
}: {
  reutersCode: TReutersCodes;
  isShowPrice?: boolean;
  isShowHeader?: boolean;
  titleSize?: "md" | "lg";
}) => {
  return (
    <>
      {isShowHeader && <ReportCardHeader reutersCode={reutersCode} titleSize={titleSize} />}
      {isShowPrice && (
        <div className="flex items-center gap-[0.8rem]">
          <StockPrice reutersCode={reutersCode} />
        </div>
      )}
      <ReportCardContent reutersCode={reutersCode} />
    </>
  );
};

export default SimpleReportCard;
