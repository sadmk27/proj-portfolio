import { queryOptions } from "@tanstack/react-query";
import { getSocialLinks } from "@/server/social-link";
import { queryKeys } from "@/queries/queryKeys";
import { createQueryFn } from "@/queries/lib/queryHelpers";

export const socialLinkQueryOptions = queryOptions({
  queryKey: queryKeys.portfolio.socialLinks(),
  queryFn: createQueryFn(getSocialLinks),
});
