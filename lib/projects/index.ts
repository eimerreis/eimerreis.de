import 'server-only';

import fs from 'node:fs/promises';
import path from 'node:path';

import matter from 'gray-matter';

import { generateSlug } from '@/lib/util/generateSlug';

import {
  PROJECT_CATEGORIES,
  PROJECT_STATUSES,
  type ProjectCategory,
  type ProjectDetail,
  type ProjectFrontmatter,
  type ProjectStatus,
  type ProjectSummary,
} from './types';

const projectsDirectory = path.join(process.cwd(), 'content', 'projects');

const isRecord = (value: unknown): value is Record<string, unknown> => {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
};

const isStringArray = (value: unknown): value is string[] => {
  return Array.isArray(value) && value.every((item) => typeof item === 'string' && item.trim().length > 0);
};

const asOptionalString = (value: unknown, field: string) => {
  if (value === undefined || value === null || value === '') {
    return undefined;
  }

  if (typeof value !== 'string') {
    throw new Error(`Project field "${field}" must be a string.`);
  }

  return value.trim();
};

const asRequiredString = (value: unknown, field: string) => {
  const normalized = asOptionalString(value, field);

  if (!normalized) {
    throw new Error(`Project field "${field}" is required.`);
  }

  return normalized;
};

const asEnumValue = <T extends readonly string[]>(value: unknown, field: string, allowed: T): T[number] => {
  const normalized = asRequiredString(value, field);

  if (!allowed.includes(normalized)) {
    throw new Error(`Project field "${field}" must be one of: ${allowed.join(', ')}.`);
  }

  return normalized as T[number];
};

const asOptionalYear = (value: unknown) => {
  if (value === undefined || value === null || value === '') {
    return undefined;
  }

  if (typeof value !== 'number' || !Number.isInteger(value)) {
    throw new Error('Project field "year" must be an integer.');
  }

  return value;
};

const normalizeFrontmatter = (data: unknown): ProjectFrontmatter => {
  if (!isRecord(data)) {
    throw new Error('Project frontmatter must be an object.');
  }

  const tech = data.tech;
  if (tech !== undefined && !isStringArray(tech)) {
    throw new Error('Project field "tech" must be an array of strings.');
  }

  const featured = data.featured;
  if (featured !== undefined && typeof featured !== 'boolean') {
    throw new Error('Project field "featured" must be a boolean.');
  }

  return {
    title: asRequiredString(data.title, 'title'),
    tagline: asRequiredString(data.tagline, 'tagline'),
    category: asEnumValue(data.category, 'category', PROJECT_CATEGORIES) as ProjectCategory,
    liveUrl: asOptionalString(data.liveUrl, 'liveUrl'),
    repoUrl: asOptionalString(data.repoUrl, 'repoUrl'),
    tech: tech ? tech.map((item) => item.trim()) : [],
    status: asEnumValue(data.status, 'status', PROJECT_STATUSES) as ProjectStatus,
    featured: featured ?? false,
    seoTitle: asOptionalString(data.seoTitle, 'seoTitle'),
    seoDescription: asOptionalString(data.seoDescription, 'seoDescription'),
    year: asOptionalYear(data.year),
  };
};

const mapProjectSummary = (slug: string, frontmatter: ProjectFrontmatter): ProjectSummary => ({
  slug,
  title: frontmatter.title,
  tagline: frontmatter.tagline,
  category: frontmatter.category,
  liveUrl: frontmatter.liveUrl,
  repoUrl: frontmatter.repoUrl,
  tech: frontmatter.tech ?? [],
  status: frontmatter.status,
  featured: frontmatter.featured ?? false,
  seoTitle: frontmatter.seoTitle,
  seoDescription: frontmatter.seoDescription,
  year: frontmatter.year,
});

const sortProjects = (projects: ProjectSummary[]) => {
  return [...projects].sort((a, b) => {
    if (a.featured !== b.featured) {
      return Number(b.featured) - Number(a.featured);
    }

    if ((a.year ?? 0) !== (b.year ?? 0)) {
      return (b.year ?? 0) - (a.year ?? 0);
    }

    return a.title.localeCompare(b.title);
  });
};

const getProjectFilePaths = async () => {
  try {
    const entries = await fs.readdir(projectsDirectory, { withFileTypes: true });

    return entries
      .filter((entry) => entry.isFile() && entry.name.endsWith('.mdx'))
      .map((entry) => path.join(projectsDirectory, entry.name));
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return [];
    }

    throw error;
  }
};

const loadProjectFile = async (filePath: string): Promise<ProjectDetail> => {
  const raw = await fs.readFile(filePath, 'utf8');
  const { data, content } = matter(raw);
  const frontmatter = normalizeFrontmatter(data);
  const filename = path.basename(filePath, path.extname(filePath));
  const slug = generateSlug(filename);

  return {
    ...mapProjectSummary(slug, frontmatter),
    source: content.trim(),
  };
};

export const getProjects = async (): Promise<ProjectSummary[]> => {
  const filePaths = await getProjectFilePaths();
  const projects = await Promise.all(filePaths.map(loadProjectFile));

  return sortProjects(projects.map(({ source: _source, ...project }) => project));
};

export const getProjectBySlug = async (slug: string): Promise<ProjectDetail | null> => {
  const filePaths = await getProjectFilePaths();

  for (const filePath of filePaths) {
    const project = await loadProjectFile(filePath);

    if (project.slug === slug) {
      return project;
    }
  }

  return null;
};

export const getProjectSlugs = async () => {
  const projects = await getProjects();
  return projects.map((project) => project.slug);
};

export const getFeaturedProjects = async (limit = 3) => {
  const projects = await getProjects();
  return projects.filter((project) => project.featured).slice(0, limit);
};

export const getProjectsByCategory = async (category: ProjectCategory) => {
  const projects = await getProjects();
  return projects.filter((project) => project.category === category);
};
