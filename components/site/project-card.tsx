import Link from 'next/link';

import type { ProjectSummary } from '@/lib/projects/types';

const categoryLabels: Record<ProjectSummary['category'], string> = {
  'open-source': 'Open source',
  saas: 'SaaS',
  hosted: 'Hosted',
};

const statusLabels: Record<ProjectSummary['status'], string> = {
  active: 'Active',
  archived: 'Archived',
  experimental: 'Experimental',
};

const categoryStyles: Record<ProjectSummary['category'], string> = {
  'open-source': 'border-accent/40 bg-accent/10 text-accent',
  saas: 'border-accentAlt/40 bg-accentAlt/10 text-accentAlt',
  hosted: 'border-highlight/40 bg-highlight/10 text-ink dark:text-highlight',
};

const statusStyles: Record<ProjectSummary['status'], string> = {
  active: 'border-line bg-paper text-ink',
  archived: 'border-line bg-paperSoft text-muted',
  experimental: 'border-highlight/40 bg-highlight/10 text-ink dark:text-highlight',
};

export const ProjectCard = ({ project }: { project: ProjectSummary }) => {
  return (
    <article className="group surface rounded-[1.9rem] border border-line/80 p-6 md:p-7">
      <div className="flex flex-wrap items-center gap-2.5">
        <span
          className={`rounded-full border px-3 py-1 text-[11px] uppercase tracking-[0.14em] ${categoryStyles[project.category]}`}
        >
          {categoryLabels[project.category]}
        </span>
        <span
          className={`rounded-full border px-3 py-1 text-[11px] uppercase tracking-[0.14em] ${statusStyles[project.status]}`}
        >
          {statusLabels[project.status]}
        </span>
        {project.year ? (
          <span className="rounded-full border border-line bg-paper px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-muted">
            {project.year}
          </span>
        ) : null}
      </div>

      <h3 className="mt-5 font-display text-[2.2rem] leading-[1.02] tracking-tight text-ink transition group-hover:text-accent md:text-[2.6rem]">
        <Link href={`/projects/${project.slug}`}>{project.title}</Link>
      </h3>

      <p className="mt-4 max-w-2xl text-base font-medium leading-relaxed text-muted md:text-lg">{project.tagline}</p>

      {project.tech.length > 0 ? (
        <ul className="mt-6 flex flex-wrap gap-2.5">
          {project.tech.map((item) => (
            <li
              key={item}
              className="rounded-full border border-line bg-paperSoft px-3 py-1.5 text-[11px] uppercase tracking-[0.14em] text-muted"
            >
              {item}
            </li>
          ))}
        </ul>
      ) : null}

      <div className="mt-7 flex flex-wrap gap-3">
        <Link
          href={`/projects/${project.slug}`}
          className="rounded-full border-2 border-accent/50 bg-accent/[0.12] px-5 py-2 text-[11px] uppercase tracking-[0.16em] text-accent transition hover:bg-accent/[0.18] active:scale-95"
        >
          Open project
        </Link>
        {project.liveUrl ? (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border-2 border-line bg-paperSoft/[0.65] px-5 py-2 text-[11px] uppercase tracking-[0.16em] text-muted transition hover:border-accentAlt/[0.45] hover:text-accentAlt active:scale-95"
          >
            Live link
          </a>
        ) : null}
        {project.repoUrl ? (
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border-2 border-line bg-paperSoft/[0.65] px-5 py-2 text-[11px] uppercase tracking-[0.16em] text-muted transition hover:border-accent/[0.45] hover:text-accent active:scale-95"
          >
            Repo
          </a>
        ) : null}
      </div>
    </article>
  );
};
