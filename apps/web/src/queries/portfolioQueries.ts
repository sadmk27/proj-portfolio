import { queryOptions } from "@tanstack/react-query";
import { getPortfolio } from "../server/portfolio";
import { queryKeys } from "./queryKeys";

export const portfolioQueryOptions = queryOptions({
  queryKey: queryKeys.portfolio.all,
  queryFn: async () => {
    const res = await getPortfolio();
    if (!res.success || !res.data) {
      throw new Error(res.error || "Failed to fetch portfolio data");
    }
    return res.data;
  },
});
