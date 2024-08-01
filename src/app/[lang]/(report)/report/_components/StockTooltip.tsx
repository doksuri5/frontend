import dayjs from "dayjs";
import { TooltipProps } from "recharts";
import { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent";

const CustomTooltip = (props: TooltipProps<ValueType, NameType>) => {
  const { active, payload, label } = props;

  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip rounded-md bg-white p-[0.8rem] text-blue-400">
        <p className="label">{`${dayjs(label).format("YYYY.MM.DD")} $${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

export default CustomTooltip;
