"use server";

import { api } from "@/lib/api";
import { z } from "zod";

import { SearchRecentSchema, SearchRecentDataType } from "@/types/RecentDataType";

export const getRecentSearches = api.get({
  endpoint: `/getRecentSearches`,
  responseSchema: SearchRecentSchema,
})<undefined, SearchRecentDataType>;
