import slugify from 'slugify';

export const generateSlug = (from: string) =>
  slugify(from, { lower: true, remove: /[*+~.()'"!:@]/g });
