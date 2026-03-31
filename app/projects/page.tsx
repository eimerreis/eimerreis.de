import { ProjectCard } from '@/components/site/project-card';
import { getProjects } from '@/lib/projects';
import { PROJECT_CATEGORIES } from '@/lib/projects/types';

export const revalidate = 1800;

const categoryLabels = {
  'open-source': 'Open source',
  saas: 'SaaS',
  hosted: 'Hosted-for-fun',
};

const categoryDescriptions = {
  'open-source': 'Packages and public tools built to be useful beyond one project.',
  saas: 'Product ideas shaped into software with a clearer user-facing surface.',
  hosted: 'Free software and self-hosted setups kept alive for curiosity and craft.',
};

export default async function ProjectsPage() {
  const projects = await getProjects();
  const projectsByCategory = PROJECT_CATEGORIES.map((category) => ({
    category,
    projects: projects.filter((project) => project.category === category),
  }));

  return (
    <div className="pb-24 pt-12 relative z-10">
      <header className="reveal pb-16 mb-16 border-b border-line">
        <div className="flex items-center gap-4 mb-6">
          <div className="h-[2px] w-12 bg-highlight" />
          <p className="font-display text-xs font-bold uppercase tracking-widest text-muted">Projects</p>
        </div>

        <h1 className="max-w-5xl font-display text-[3.5rem] leading-[0.9] tracking-[-0.02em] text-ink md:text-[5rem] uppercase font-bold">
          A shelf of <span className="text-highlight">tools, products, and experiments</span>.
        </h1>

        <p className="mt-8 max-w-3xl text-lg font-medium leading-relaxed text-muted/90 md:text-xl">
          Open source utilities, SaaS ideas, and fun self-hosted builds that say something about how I like to work.
        </p>

        <div className="mt-12 flex flex-wrap gap-3">
          {PROJECT_CATEGORIES.map((category, index) => (
            <div
              key={category}
              className={`font-display text-xs font-bold uppercase tracking-widest px-4 py-2 border ${
                index === 0
                  ? 'border-accent text-accent bg-accent/5'
                  : index === 1
                    ? 'border-accentAlt text-accentAlt bg-accentAlt/5'
                    : 'border-highlight/50 text-ink bg-highlight/10 dark:text-highlight'
              }`}
            >
              {categoryLabels[category]}
            </div>
          ))}
        </div>
      </header>

      {projects.length > 0 ? (
        <div className="space-y-20 reveal delay-1">
          {projectsByCategory.map(({ category, projects: categoryProjects }, index) => (
            <section key={category} className="grid gap-10 md:grid-cols-12 md:gap-8">
              <div className="md:col-span-4">
                <p className="font-display text-xs font-bold uppercase tracking-widest text-muted mb-3">
                  {(index + 1).toString().padStart(2, '0')}
                </p>
                <h2 className="font-display text-4xl font-light tracking-tight text-ink md:text-5xl">
                  {categoryLabels[category]}
                </h2>
                <p className="mt-4 max-w-sm text-muted/90">{categoryDescriptions[category]}</p>
              </div>

              <div className="md:col-span-8">
                {categoryProjects.length > 0 ? (
                  <div className="stagger-children grid gap-6 md:grid-cols-1">
                    {categoryProjects.map((project) => (
                      <ProjectCard key={project.slug} project={project} />
                    ))}
                  </div>
                ) : (
                  <div className="rounded-[1.8rem] border border-line bg-paperSoft p-6 text-sm text-muted">
                    Nothing published in this category yet.
                  </div>
                )}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <section className="border border-line bg-paperSoft p-8 md:p-12 max-w-2xl reveal delay-1">
          <p className="font-display text-xs font-bold uppercase tracking-widest text-muted mb-4">Build shelf</p>
          <h2 className="font-display text-3xl font-light uppercase tracking-tight md:text-4xl mb-6">
            No projects published yet.
          </h2>
          <p className="text-muted/80 font-medium mb-6">
            As soon as a project file lands in `content/projects`, it will show up here.
          </p>
          <p className="font-display text-[10px] uppercase tracking-widest text-muted bg-paper px-3 py-2 border border-line inline-block">
            System check: local content wired
          </p>
        </section>
      )}
    </div>
  );
}
