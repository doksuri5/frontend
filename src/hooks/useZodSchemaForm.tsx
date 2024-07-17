"use client";

import { DefaultValues, FieldValues, Resolver, UseFormReturn, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodSchema } from "zod";

export default function useZodSchemaForm<T extends FieldValues>(
  schema: ZodSchema<T>,
  defaultValues?: DefaultValues<T>,
): UseFormReturn<T> {
  const methods = useForm<T>({
    resolver: zodResolver(schema) as Resolver<T>,
    mode: "onChange",
    defaultValues,
  });

  return methods;
}
