const QUERY_KEYS = {
  projects: ["projects"] as const,
  about: ["about"] as const,
  skills: ["skills"] as const,
  experiences: ["experiences"] as const,
  educations: ["educations"] as const,
  socialLinks: ["social-links"] as const,
};

export const queryKeys = {
  projects: {
    list: () => QUERY_KEYS.projects,
    detail: (id: number) => [...QUERY_KEYS.projects, id] as const,
  },
  portfolio: {
    about: () => QUERY_KEYS.about,
    skills: () => QUERY_KEYS.skills,
    experiences: () => QUERY_KEYS.experiences,
    educations: () => QUERY_KEYS.educations,
    socialLink: () => QUERY_KEYS.socialLinks,
  },
};
