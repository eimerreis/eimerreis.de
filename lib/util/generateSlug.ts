import slugify from 'slugify';

export const generateSlug = (value: string) =>
  slugify(value, {
    lower: true,
    strict: true,
    trim: true
  });
