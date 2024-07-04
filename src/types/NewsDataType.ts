import { StaticImageData } from "next/image";

export interface CardNewsDataType {
  _id?: string;
  date: string;
  title: string;
  stockCode?: string;
  image?: string | StaticImageData;
  description: string;
  publisher: string;
}

export interface NewsItemType {
  _id?: string;
  image: StaticImageData;
  title: string;
  description: string;
  publishedTime: string;
  publisher: string;
}
