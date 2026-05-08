import { queryOptions } from "@tanstack/react-query";
import { getExperiences } from "../../server/experience";
import { queryKeys } from "../queryKeys";
import { createQueryFn } from "../lib/queryHelpers";

export const experienceQueryOptions = queryOptions({
  queryKey: queryKeys.portfolio.experiences(),
  queryFn: createQueryFn(getExperiences),
});
