import { queryOptions } from "@tanstack/react-query";
import { getPortfolio } from "../../server/portfolio";

export const experienceQueryOptions = queryOptions({
  queryKey: ["experiences"],
  queryFn: async () => {
    const res = await getPortfolio();
    if (!res.success || !res.data) {
      throw new Error(res.error || "Failed to fetch experiences");
    }
    return res.data.experiences;
  },
});
