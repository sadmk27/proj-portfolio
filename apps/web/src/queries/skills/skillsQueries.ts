import { queryOptions } from "@tanstack/react-query";
import { getSkills } from "../../server/skill";
import { queryKeys } from "../queryKeys";
import { createQueryFn } from "../lib/queryHelpers";

export const skillsQueryOptions = queryOptions({
  queryKey: queryKeys.portfolio.skills(),
  queryFn: createQueryFn(getSkills),
});
