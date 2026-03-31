import 'server-only';

import { compileMDX } from 'next-mdx-remote/rsc';

type ProjectMdxComponents = Record<string, React.ComponentType<any>>;

export const renderProjectMdx = async (source: string, components?: ProjectMdxComponents) => {
  const { content } = await compileMDX({
    source,
    components,
    options: {
      parseFrontmatter: false,
    },
  });

  return content;
};
