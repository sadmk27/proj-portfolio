export const queryKeys = {
  portfolio: {
    all: ["portfolio"] as const,
    about: () => ["portfolio", "about"] as const,
    educations: () => ["portfolio", "educations"] as const,
    experiences: () => ["portfolio", "experiences"] as const,
    skills: () => ["portfolio", "skills"] as const,
  },
  projects: {
    all: ["projects"] as const,
    list: () => ["projects", "list"] as const,
    detail: (id: number) => ["projects", "detail", id] as const,
  },
};
