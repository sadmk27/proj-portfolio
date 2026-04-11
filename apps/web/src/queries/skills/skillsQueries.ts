import { queryOptions } from "@tanstack/react-query";
import { portfolioQueryOptions } from "../portfolioQueries";

export const skillsQueryOptions = queryOptions({
  ...portfolioQueryOptions,
  select: (data) => data.skills,
});
