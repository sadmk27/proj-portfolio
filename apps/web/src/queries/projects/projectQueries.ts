import { queryOptions } from "@tanstack/react-query";
import { getPortfolio } from "../../server/portfolio";

export const projectsQueryOptions = queryOptions({
  queryKey: ["projects"],
  queryFn: async () => {
    const res = await getPortfolio();
    if (!res.success || !res.data) {
      throw new Error(res.error || "Failed to fetch projects");
    }
    return res.data.projects;
  },
});

export const projectByIdQueryOptions = (id: number) =>
  queryOptions({
    queryKey: ["project", id],
    queryFn: async () => {
      const res = await getPortfolio();
      if (!res.success || !res.data) {
        throw new Error(res.error || "Failed to fetch project");
      }
      return res.data.projects.find((project) => project.id === id);
    },
  });
