import { queryOptions } from "@tanstack/react-query";
import { getEducations } from "../../server/education";
import { queryKeys } from "../queryKeys";
import { createQueryFn } from "../lib/queryHelpers";

export const educationQueryOptions = queryOptions({
  queryKey: queryKeys.portfolio.educations(),
  queryFn: createQueryFn(getEducations),
});
