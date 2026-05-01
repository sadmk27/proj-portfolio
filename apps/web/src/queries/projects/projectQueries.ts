import { queryOptions } from "@tanstack/react-query";
import { getProjects, getProjectById } from "../../server/project";
import { queryKeys } from "../queryKeys";

export const projectsQueryOptions = queryOptions({
  queryKey: queryKeys.projects.list(),
  queryFn: async () => {
    const res = await getProjects();
    if (!res.success || !res.data) {
      throw new Error(res.error || "Failed to fetch projects");
    }
    return res.data;
  },
});

export const projectByIdQueryOptions = (id: number) =>
  queryOptions({
    queryKey: queryKeys.projects.detail(id),
    queryFn: async () => {
      const res = await getProjectById({ data: id });
      if (!res.success || !res.data) {
        throw new Error(res.error || "Failed to fetch project");
      }
      return res.data;
    },
  });
