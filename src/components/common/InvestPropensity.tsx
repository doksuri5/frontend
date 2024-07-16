import { useForm } from "react-hook-form";
import { useState } from "react";
import Image from "next/image";
import CheckBox from "./CheckBox";
import { Button } from "./Button";
import CreditInfoAgree from "@/app/[lang]/(auth)/_components/CreditInfoAgree";
import { cn } from "@/utils/cn";

const questions = [
  {
    name: "question1",
    isCheckbox: false,
    question: "투자하고자 하는 자금의 투자 가능 기간은 얼마나 됩니까?",
    options: [
      { value: "6개월 이내" },
      { value: "6개월 ~ 1년 이내" },
      { value: "1년 ~ 2년 이내" },
      { value: "2년 ~ 3년 이내" },
      { value: "3년 이상" },
    ],
  },
  {
    name: "question2",
    isCheckbox: false,
    question: "금융상품 투자에 대한 본인의 수준은 어느 정도라고 생각하십니까?",
    options: [
      { value: "[매우 낮은 수준] 금융투자상품에 투자해 본 경험이 없음" },
      {
        value:
          "[낮은 수준] 널리 알려진 금융투자상품 (주식, 채권 및 펀드 등)의 구조 및 위험을 일정부분 이해하고 있는 정도",
      },
      {
        value: "[높은 수준] 투자할 수 있는 대부분의 금융상품의 차이를 구별할 수 있는 정도",
      },
      {
        value: "[매우 높은 수준] 금융상품을 비롯하여 모든 투자대상 상품의 차이를 이해할 수 있는 정도",
      },
    ],
  },
  {
    name: "question3",
    isCheckbox: false,
    question: "현재 투자하고자 하는 자금은 전체 금융자산(부동산 등을 제외) 중 어느 정도의 비중을 차지합니까?",
    options: [
      { value: "10% 이내" },
      { value: "10% ~ 20% 이내" },
      { value: "20% ~ 30% 이내" },
      { value: "30% ~ 40% 이내" },
      { value: "40% 초과" },
    ],
  },
  {
    name: "question4",
    isCheckbox: false,
    question:
      "현재 투자하시고자 하는 자금에 대하여 고객님이 기대하는 수익과 감내할 수 있는 손실 수준은 어느 정도입니까?",
    options: [
      { value: "기대수익이 높다면 위험을 감수 할 수 있을 것 같음" },
      {
        value: "원하는 수준의 수익을 기대할 수 있다면 20% 미만까지는 손실을 감수 할 수 있을 것 같음",
      },
      {
        value: "일정한 수준의 수익을 기대할 수 있다면 10% 미만까지는 손실을 감수 할 수 있을 것 같음",
      },
      { value: "무슨 일이 있어도 투자원금은 보전되어야 함" },
    ],
  },
  {
    name: "question5",
    isCheckbox: true,
    question: "다음 중 투자경험과 가장 가까운 것은 어느 것입니까? (중복 체크 가능)",
    options: [
      { value: "안정형 상품 - 은행 예금/적금, 국채, 지방채, 보증채, MMF, CMA 등" },
      {
        value: "안정추구형 상품 - 금융채, 신용도가 높은 회사채, 채권형펀드, 원금보장형 ELS 등",
      },
      {
        value: "위험중립형 상품 - 신용도 중간 등급의 회사채, 원금의 일부만 보장되는 ELS, 혼합형 펀드 등",
      },
      {
        value:
          "적극투자형 상품 - 신용도가 낮은 회사채, 주식, 원금이 보장되지 않는 ELS, 시장수익률 수준의 수익을 추구하는 주식형 펀드 등",
      },
      {
        value:
          "공격투자형 상품 - ELW, 선물옵션, 시장수익률 이상의 수익을 추구하는 주식형펀드, 파생상품에 투자하는 펀드, 주식 신용거래 등",
      },
      { value: "없음" },
    ],
  },
];

export default function InvestPropensity({ onSubmit }: any) {
  const [isChecked, setIsChecked] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const { register, handleSubmit, watch } = useForm();

  const fieldValues = watch();

  const isAllFieldsFilled =
    Object.keys(fieldValues).length === 0 ? false : !Object.values(fieldValues).some((value) => value === undefined);

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
        {questions.map((question, questionIndex) => (
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
          disabled={!isAllFieldsFilled && !isEnabled}
          bgColor={isAllFieldsFilled ? "bg-navy-900" : "bg-grayscale-200"}
          className={cn(`my-12 text-white ${isAllFieldsFilled ? "text-white" : "text-gray-300"}`)}
        >
          제출하기
        </Button>
      </form>
    </section>
  );
}
