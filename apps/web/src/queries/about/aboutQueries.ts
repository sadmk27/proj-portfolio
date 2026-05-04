import { queryOptions } from "@tanstack/react-query";
import { getAbout } from "@/server/about";
import { queryKeys } from "../queryKeys";
import { createQueryFn } from "@/queries/lib/queryHelpers";

export const aboutQueryOptions = queryOptions({
  queryKey: queryKeys.portfolio.about(),
  queryFn: createQueryFn(getAbout),
});
