import { queryOptions } from "@tanstack/react-query";
import { getExperiences } from "../../server/experience";
import { queryKeys } from "../queryKeys";

export const experienceQueryOptions = queryOptions({
  queryKey: queryKeys.portfolio.experiences(),
  queryFn: async () => {
    const res = await getExperiences();
    if (!res.success || !res.data) {
      throw new Error(res.error || "Failed to fetch experiences");
    }
    return res.data;
  },
});
