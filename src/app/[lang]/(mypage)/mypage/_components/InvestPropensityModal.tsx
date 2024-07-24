import { Modal } from "@/components/common";
import InvestPropensity from "@/components/common/InvestPropensity";

type TInvestPropensityModalProps = {
  isOpen: boolean;
  onClose: () => void;
  propensityData: any;
};

export default function InvestPropensityModal({ isOpen, onClose, propensityData }: TInvestPropensityModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      closeIcon={true}
      panelStyle="w-[80rem] py-[1.6rem] px-[3.2rem] rounded-[2rem]"
    >
      <InvestPropensity initialData={propensityData} />
    </Modal>
  );
}
