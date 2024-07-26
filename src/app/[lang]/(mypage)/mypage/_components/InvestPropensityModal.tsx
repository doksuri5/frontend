import { Modal } from "@/components/common";
import InvestPropensity from "@/components/common/InvestPropensity";
import { modifyPropensity } from "../_api/investPropensityApi";

type TInvestPropensityModalProps = {
  isOpen: boolean;
  onClose: () => void;
  propensityData: any;
};

export default function InvestPropensityModal({ isOpen, onClose, propensityData }: TInvestPropensityModalProps) {
  const handleSubmit = async (data: any) => {
    // 비동의에 체크했기 때문에 데이터가 없을 경우
    if (data[1] === "")
      await modifyPropensity({ isAgreeCreditInfo: JSON.stringify(false), investPropensity: JSON.stringify(null) });
    else await modifyPropensity({ isAgreeCreditInfo: JSON.stringify(true), investPropensity: JSON.stringify(data) });

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      closeIcon={true}
      panelStyle="w-[80rem] py-[1.6rem] px-[3.2rem] rounded-[2rem]"
    >
      <InvestPropensity initialData={propensityData} onSubmit={handleSubmit} />
    </Modal>
  );
}
