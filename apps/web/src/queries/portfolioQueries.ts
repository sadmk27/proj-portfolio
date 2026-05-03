import { queryOptions } from "@tanstack/react-query";
import { getPortfolio } from "../server/portfolio";
import { queryKeys } from "./queryKeys";
import { createQueryFn } from "./lib/queryHelpers";

export const portfolioQueryOptions = queryOptions({
  queryKey: queryKeys.portfolio.all,
  queryFn: createQueryFn(getPortfolio),
});
