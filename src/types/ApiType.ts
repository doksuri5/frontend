import { input, SafeParseReturnType, z, ZodEffects } from "zod";
import snakecaseKeys from "snakecase-keys";
import camelcaseKeys, { CamelCaseKeys, Options } from "camelcase-keys";

export type ResponseReturnType<D> = {
  data: D[];
  ok?: boolean;
  message?: string;
};

// parse 이후 transform 이 실행되어 변환된 값을 반환한다.
export const camelSchema = <T extends z.ZodTypeAny>(schema: T, options: Options = { deep: true }) => {
  return schema.transform((props) => camelcaseKeys(props, options)) as ZodEffects<T, CamelCaseKeys<z.infer<T>>>;
};

// parse 전에 preprocess 를 실행하여 변환된 값을 반환한다.
// 응답값이 snake_case 로 오는 경우 사용한다.
export const withCamelCase = <T extends z.ZodTypeAny>(schema: T, options: Options = { deep: true }) => {
  return z.preprocess((props: z.infer<T>) => camelcaseKeys(props, options), schema) as ZodEffects<
    T,
    CamelCaseKeys<z.infer<T>>
  >;
};

// 응답을 받을 때 snake_case 로 오는 경우 사용한다. data 를 응답받아 parse 하기전에 camel_case 로 변환한다.
export const ApiResponse = <T extends z.ZodTypeAny, D>(dataSchema: T, data: D) => {
  return z
    .object({
      data: withCamelCase(dataSchema).array().nullable(),
      ok: z.boolean().optional(),
      message: z.string().optional(),
    })
    .parse(data);
};

// 요청을 보낼 때 snake_case 로 변환하여 보내야 하는 경우 사용한다. ( 주로 body 검증 schema 에 사용 )
export const ApiRequestBody = <T extends z.ZodTypeAny, D>(
  dataSchema: T,
  data: D,
  safe: boolean | undefined = true,
): SafeParseReturnType<input<T>, any> => {
  if (safe) {
    return dataSchema.transform((data) => snakecaseKeys(data, { deep: true })).safeParse(data);
  }
  return dataSchema.transform((data) => snakecaseKeys(data, { deep: true })).parse(data);
};
