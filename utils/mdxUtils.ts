import fs from 'fs';
import matter from 'gray-matter';
import { join } from 'path';

type Items = {
  [key: string]: string;
};

type Post = {
  data: {
    [key: string]: string;
  };
  content: string;
};

const POSTS_PATH = join(process.cwd(), '_posts');

export function parseLocale(locale?: string): 'non-en' | 'en' {
  return locale === 'en' ? 'en' : 'en';
}

function getPostFilePaths(locale?: string): string[] {
  const lang = parseLocale(locale);

  return fs
    .readdirSync(join(POSTS_PATH, `${lang}`))
    .filter((path) => /\.mdx?$/.test(path));
}

export function getPost(params: any, locale?: string): Post {
  const lang = parseLocale(locale);

  const fullPath = join(
    POSTS_PATH,
    `${lang}`,
    'just-4-dev-blog',
    `${params.category}`,
    `${params.subcategory}`,
    `${params.slug}.mdx`
  );
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return { data, content };
}

export function getPostItems(
  filePath: string,
  fields: string[] = [],
  locale?: string
): Items {
  const slug = filePath.replace(/\.mdx?$/, '');
  const { data, content } = getPost(slug, locale);

  const items: Items = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = slug;
    }
    if (field === 'content') {
      items[field] = content;
    }

    if (data[field]) {
      items[field] = data[field];
    }
  });

  return items;
}

export function getAllPosts(locale?: string): Items[] {
  const lang = parseLocale(locale);
  const fullPath = join(POSTS_PATH, `${lang}`, 'just-4-dev-blog', `all.json`);
  const posts = JSON.parse(fs.readFileSync(fullPath, 'utf8'));

  const trans = posts.map(
    (e: {
      slug: string;
      dateCreated: string;
      images: string;
      title: string;
      description: string;
      category: { slug: string };
      subcategory: { slug: string };
    }) => {
      return {
        slug: e.slug,
        date: e.dateCreated,
        thumbnail: e.images,
        title: e.title,
        description: e.description,
        category: e.category.slug,
        subcategory: e.subcategory.slug,
      };
    }
  );

  return trans;
}

export function getAllPostsByCat(category: string, locale?: string): Items[] {
  const lang = parseLocale(locale);
  const fullPath = join(
    POSTS_PATH,
    `${lang}`,
    'just-4-dev-blog',
    `${category}`,
    `byCat.json`
  );
  const posts = JSON.parse(fs.readFileSync(fullPath, 'utf8'));

  const trans = posts.map(
    (e: {
      slug: string;
      dateCreated: string;
      images: string;
      title: string;
      description: string;
      category: { slug: string };
      subcategory: { slug: string };
    }) => {
      return {
        slug: e.slug,
        date: e.dateCreated,
        thumbnail: e.images,
        title: e.title,
        description: e.description,
        category: e.category.slug,
        subcategory: e.subcategory.slug,
      };
    }
  );

  return trans;
}
