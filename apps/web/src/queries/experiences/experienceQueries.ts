import { queryOptions } from "@tanstack/react-query";
import { portfolioQueryOptions } from "../portfolioQueries";

export const experienceQueryOptions = queryOptions({
  ...portfolioQueryOptions,
  select: (data) => data.experiences,
});
