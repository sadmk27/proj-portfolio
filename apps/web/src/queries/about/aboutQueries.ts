import { queryOptions } from "@tanstack/react-query";
import { getAbout } from "@/server/about";
import { queryKeys } from "@/queries/queryKeys";

export const aboutQueryOptions = queryOptions({
  queryKey: queryKeys.portfolio.about(),
  queryFn: async () => {
    const res = await getAbout();
    if (!res.success || !res.data || res.data.length === 0) {
      throw new Error(res.error || "No about data found");
    }
    return res.data[0];
  },
});
