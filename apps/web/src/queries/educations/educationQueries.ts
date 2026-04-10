import { queryOptions } from "@tanstack/react-query";
import { getPortfolio } from "../../server/portfolio";

export const educationQueryOptions = queryOptions({
  queryKey: ["educations"],
  queryFn: async () => {
    const res = await getPortfolio();
    if (!res.success || !res.data) {
      throw new Error(res.error || "Failed to fetch educations");
    }
    return res.data.educations;
  },
});
