import { queryOptions } from "@tanstack/react-query";
import { getEducations } from "../../server/education";
import { queryKeys } from "../queryKeys";

export const educationQueryOptions = queryOptions({
  queryKey: queryKeys.portfolio.educations(),
  queryFn: async () => {
    const res = await getEducations();
    if (!res.success || !res.data) {
      throw new Error(res.error || "Failed to fetch educations");
    }
    return res.data;
  },
});
