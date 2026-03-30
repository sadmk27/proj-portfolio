import { queryOptions } from "@tanstack/react-query";
import { getPortfolio } from "../../server/portfolio";

export const skillsQueryOptions = queryOptions({
  queryKey: ["skills"],
  queryFn: async () => {
    const res = await getPortfolio();
    if (!res.success || !res.data) {
      throw new Error(res.error || "Failed to fetch skills");
    }
    return res.data.skills;
  },
});
