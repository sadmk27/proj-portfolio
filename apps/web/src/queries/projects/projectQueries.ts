import { queryOptions } from "@tanstack/react-query";
import { getProjects, getProjectById } from "../../server/project";
import { queryKeys } from "../queryKeys";
import { createQueryFn } from "../lib/queryHelpers";

export const projectsQueryOptions = queryOptions({
  queryKey: queryKeys.projects.list(),
  queryFn: createQueryFn(getProjects),
});

export const projectByIdQueryOptions = (id: number) =>
  queryOptions({
    queryKey: queryKeys.projects.detail(id),
    queryFn: createQueryFn(async () => getProjectById({ data: id })),
  });
