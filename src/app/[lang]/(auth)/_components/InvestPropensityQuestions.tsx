import { useTranslations } from "next-intl";

export function InvestPropensityQuestions() {
  const t = useTranslations("investPropensity.query");

  return [
    {
      name: "question1",
      isCheckbox: false,
      question: t("question1.questionText"),
      options: [
        { value: t("question1.option1") },
        { value: t("question1.option2") },
        { value: t("question1.option3") },
        { value: t("question1.option4") },
        { value: t("question1.option5") }
      ]
    },
    {
      name: "question2",
      isCheckbox: false,
      question: t("question2.questionText"),
      options: [
        { value: t("question2.option1") },
        { value: t("question2.option2") },
        { value: t("question2.option3") },
        { value: t("question2.option4") }
      ]
    },
    {
      name: "question3",
      isCheckbox: false,
      question: t("question3.questionText"),
      options: [
        { value: t("question3.option1") },
        { value: t("question3.option2") },
        { value: t("question3.option3") },
        { value: t("question3.option4") },
        { value: t("question3.option5") }
      ]
    },
    {
      name: "question4",
      isCheckbox: false,
      question: t("question4.questionText"),
      options: [
        { value: t("question4.option1") },
        { value: t("question4.option2") },
        { value: t("question4.option3") },
        { value: t("question4.option4") }
      ]
    },
    {
      name: "question5",
      isCheckbox: true,
      question: t("question5.questionText"),
      options: [
        { value: t("question5.option1") },
        { value: t("question5.option2") },
        { value: t("question5.option3") },
        { value: t("question5.option4") },
        { value: t("question5.option5") },
        { value: t("question5.option6") }
      ]
    }
  ];
}
