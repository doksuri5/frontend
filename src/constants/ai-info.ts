import { TLanguages } from "@/types/AuthType";

const AI_MODEL = "gpt-4o";

export { AI_MODEL };

export const LANGUAGE_MAP: {
  [key in TLanguages]: string;
} = {
  ko: "Korean",
  en: "English",
  ch: "Chinese",
  fr: "French",
  jp: "Japanese",
};
