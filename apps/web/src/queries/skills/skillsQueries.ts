import { queryOptions } from "@tanstack/react-query";
import { getSkills } from "../../server/skill";
import { queryKeys } from "../queryKeys";

export const skillsQueryOptions = queryOptions({
  queryKey: queryKeys.portfolio.skills(),
  queryFn: async () => {
    const res = await getSkills();
    if (!res.success || !res.data) {
      throw new Error(res.error || "Failed to fetch skills");
    }
    return res.data;
  },
});
