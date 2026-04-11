import { queryOptions } from "@tanstack/react-query";
import { portfolioQueryOptions } from "../portfolioQueries";

export const educationQueryOptions = queryOptions({
  ...portfolioQueryOptions,
  select: (data) => data.educations,
});
