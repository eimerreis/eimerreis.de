export const PROJECT_CATEGORIES = ['open-source', 'saas', 'hosted'] as const;
export const PROJECT_STATUSES = ['active', 'archived', 'experimental'] as const;

export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];
export type ProjectStatus = (typeof PROJECT_STATUSES)[number];

export type ProjectFrontmatter = {
  title: string;
  tagline: string;
  category: ProjectCategory;
  liveUrl?: string;
  repoUrl?: string;
  tech?: string[];
  status: ProjectStatus;
  featured?: boolean;
  seoTitle?: string;
  seoDescription?: string;
  year?: number;
};

export type ProjectSummary = {
  slug: string;
  title: string;
  tagline: string;
  category: ProjectCategory;
  liveUrl?: string;
  repoUrl?: string;
  tech: string[];
  status: ProjectStatus;
  featured: boolean;
  seoTitle?: string;
  seoDescription?: string;
  year?: number;
};

export type ProjectDetail = ProjectSummary & {
  source: string;
};
