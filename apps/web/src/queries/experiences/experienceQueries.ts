import { queryOptions } from "@tanstack/react-query";
import { getExperiences } from "@/server/experience";
import { queryKeys } from "@/queries/queryKeys";
import { createQueryFn } from "@/queries/lib/queryHelpers";

export const experienceQueryOptions = queryOptions({
  queryKey: queryKeys.portfolio.experiences(),
  queryFn: createQueryFn(getExperiences),
});
