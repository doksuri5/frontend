import { useForm } from "react-hook-form";
import { useState } from "react";
import Image from "next/image";
import CheckBox from "./CheckBox";
import { Button } from "./Button";
import CreditInfoAgree from "@/app/[lang]/(auth)/_components/CreditInfoAgree";
import { cn } from "@/utils/cn";
import { InvestPropensityQuestions } from "@/data/InvestPropensityQuestions";

export default function InvestPropensity({ onSubmit }: any) {
  const [isChecked, setIsChecked] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const { register, handleSubmit, watch } = useForm();

  const fieldValues = watch();

  // 모든 필드가 응답되었는지 확인하는 함수
  const areAllFieldsFilled = (values: any) => {
    // 해당 폼에 처음 진입했을 때는 빈 객체로 존재하기 때문에 빈 객체인지 여부를 체크함
    if (Object.keys(values).length === 0) return false;
    return !Object.values(values).some((value, index) => {
      if (index === 4 && Array.isArray(value)) return value.length === 0;
      else return value === undefined;
    });
  };

  const isAllFieldsFilled = areAllFieldsFilled(fieldValues);

  const handleFormSubmit = (data: any) => {
    if (isChecked && isAllFieldsFilled) onSubmit(data);
  };

  return (
    <section className="bg-white px-20 py-16">
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <h1 className="heading_3 mb-10 text-center font-bold text-navy-900">투자 성향 진단</h1>
        <CreditInfoAgree />
        <CheckBox
          checked={isChecked}
          setChecked={() => {
            setIsChecked(!isChecked);
            setIsEnabled(!isEnabled);
          }}
          label="동의합니다."
          id="propensityInvest"
          name="propensityInvest"
          variants="radio"
          className="w-full justify-end"
        />
        <hr />
        {InvestPropensityQuestions.map((question, questionIndex) => (
          <fieldset key={question.name} className="mt-20">
            <legend className="body_2 mb-3 font-normal text-grayscale-900">
              {questionIndex + 1}. {question.question}
            </legend>
            <ul className="flex flex-col gap-3">
              {question.options.map((option, idx) => {
                const fieldName = String(questionIndex + 1);
                const fieldValue = watch(fieldName);

                const isOptionChecked = question.isCheckbox
                  ? Array.isArray(fieldValue) && fieldValue.includes(String(idx + 1))
                  : fieldValue === String(idx + 1);

                return (
                  <li key={idx}>
                    <label htmlFor={`q${questionIndex}-option${idx}`} className="flex items-center">
                      <Image
                        src={isOptionChecked ? `/icons/checkbox_radio_on.svg` : `/icons/checkbox_radio.svg`}
                        alt={"체크박스 아이콘"}
                        width={24}
                        height={24}
                      />
                      <input
                        type={question.isCheckbox ? "checkbox" : "radio"}
                        id={`q${questionIndex}-option${idx}`}
                        value={idx + 1}
                        className="hidden"
                        disabled={!isEnabled}
                        {...register(fieldName)}
                      />
                      <span className="body_4 ml-2 cursor-pointer text-grayscale-900">{option.value}</span>
                    </label>
                  </li>
                );
              })}
            </ul>
          </fieldset>
        ))}
        <Button
          type="submit"
          disabled={!isAllFieldsFilled || !isChecked}
          bgColor={isAllFieldsFilled && isChecked ? "bg-navy-900" : "bg-grayscale-200"}
          className={cn(`my-12 text-white ${isAllFieldsFilled && isChecked ? "text-white" : "text-gray-300"}`)}
        >
          제출하기
        </Button>
      </form>
    </section>
  );
}
