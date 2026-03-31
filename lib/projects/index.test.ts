import * as fs from 'node:fs/promises';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { getFeaturedProjects, getProjectBySlug, getProjectSlugs, getProjects } from './index';

const { readdirMock, readFileMock } = vi.hoisted(() => ({
  readdirMock: vi.fn(),
  readFileMock: vi.fn(),
}));

vi.mock('node:fs/promises', () => ({
  default: {
    readdir: readdirMock,
    readFile: readFileMock,
  },
  readdir: readdirMock,
  readFile: readFileMock,
}));

const mockedReaddir = vi.mocked(fs.readdir);
const mockedReadFile = vi.mocked(fs.readFile);

const createDirent = (name: string) =>
  ({
    name,
    isFile: () => true,
    isDirectory: () => false,
    isBlockDevice: () => false,
    isCharacterDevice: () => false,
    isSymbolicLink: () => false,
    isFIFO: () => false,
    isSocket: () => false,
  }) as unknown as Awaited<ReturnType<typeof fs.readdir>>[number];

describe('projects data layer', () => {
  afterEach(() => {
    mockedReaddir.mockReset();
    mockedReadFile.mockReset();
  });

  it('loads and sorts projects with featured entries first', async () => {
    mockedReaddir.mockResolvedValue([createDirent('toolbox.mdx'), createDirent('az-npm.mdx')]);

    mockedReadFile.mockImplementation(async (filePath) => {
      if (String(filePath).endsWith('toolbox.mdx')) {
        return `---
title: Toolbox
tagline: Internal experiments and scratch tools.
category: hosted
status: experimental
featured: false
year: 2024
---

Toolbox body.`;
      }

      return `---
title: az-npm
tagline: Azure artifacts helper.
category: open-source
status: active
featured: true
year: 2026
repoUrl: https://github.com/eimerreis/az-npm
---

az-npm body.`;
    });

    const projects = await getProjects();

    expect(projects).toHaveLength(2);
    expect(projects[0].slug).toBe('az-npm');
    expect(projects[1].slug).toBe('toolbox');
    expect(projects[0].repoUrl).toBe('https://github.com/eimerreis/az-npm');
  });

  it('returns project detail by slug', async () => {
    mockedReaddir.mockResolvedValue([createDirent('az-npm.mdx')]);
    mockedReadFile.mockResolvedValue(`---
title: az-npm
tagline: Azure artifacts helper.
category: open-source
status: active
featured: true
---

Detailed body copy.`);

    const project = await getProjectBySlug('az-npm');

    expect(project).not.toBeNull();
    expect(project?.title).toBe('az-npm');
    expect(project?.source).toContain('Detailed body copy.');
  });

  it('returns only featured projects when requested', async () => {
    mockedReaddir.mockResolvedValue([createDirent('az-npm.mdx'), createDirent('private-cloud.mdx')]);

    mockedReadFile.mockImplementation(async (filePath) => {
      if (String(filePath).endsWith('az-npm.mdx')) {
        return `---
title: az-npm
tagline: Azure artifacts helper.
category: open-source
status: active
featured: true
---

Featured.`;
      }

      return `---
title: Private Cloud
tagline: Self-hosted stack.
category: hosted
status: active
featured: false
---

Hidden.`;
    });

    const featured = await getFeaturedProjects();

    expect(featured).toHaveLength(1);
    expect(featured[0].slug).toBe('az-npm');
  });

  it('returns slugs for all projects', async () => {
    mockedReaddir.mockResolvedValue([createDirent('az-npm.mdx'), createDirent('forest-notes.mdx')]);

    mockedReadFile.mockImplementation(async (filePath) => {
      if (String(filePath).endsWith('az-npm.mdx')) {
        return `---
title: az-npm
tagline: Azure artifacts helper.
category: open-source
status: active
featured: true
---

One.`;
      }

      return `---
title: Forest Notes
tagline: Quiet publishing project.
category: saas
status: archived
featured: false
---

Two.`;
    });

    const slugs = await getProjectSlugs();

    expect(slugs).toEqual(['az-npm', 'forest-notes']);
  });

  it('throws for invalid category values', async () => {
    mockedReaddir.mockResolvedValue([createDirent('broken.mdx')]);
    mockedReadFile.mockResolvedValue(`---
title: Broken Project
tagline: Wrong schema.
category: weird
status: active
---

Broken.`);

    await expect(getProjects()).rejects.toThrow('Project field "category" must be one of');
  });
});
