import fs from 'fs'
import matter from 'gray-matter'
import { join } from 'path'
import { Items } from './types'

const POSTS_PATH = join(process.cwd(), '_posts')

export const getData = () => {
  const fullPath = join(POSTS_PATH, 'just-4-dev-blog', `data.json`)
  const data = JSON.parse(fs.readFileSync(fullPath, 'utf8'))
  const short = {
    cats: data.cats.map(
      (e: { title: string; description: string; slug: string }) => {
        return {
          title: e.title,
          description: e.description,
          slug: e.slug,
        }
      },
    ),
    app: {
      title: data.app.title,
      slug: data.app.slug,
      description: data.app.description,
    },
  }
  return short
}

export function getPostsByCatSubCat({
  category,
  subcategory,
}: {
  category?: string
  subcategory?: string
}): Items[] {
  const fullPath = join(
    POSTS_PATH,
    'just-4-dev-blog',
    `${category || ''}`,
    `${subcategory || ''}`,
    `all.json`,
  )

  const posts = JSON.parse(fs.readFileSync(fullPath, 'utf8'))

  const trans = posts.map(
    (e: {
      slug: string
      dateCreated: string
      image: string
      title: string
      description: string
      category: { slug: string }
      subcategory: { slug: string }
    }) => {
      return {
        slug: e.slug,
        date: e.dateCreated,
        image: e.image,
        title: e.title,
        description: e.description,
        category: e.category.slug,
        subcategory: e.subcategory.slug,
      }
    },
  )

  return trans
}

export function getPostsByCatSubCatSlug({
  category,
  subcategory,
  slug,
}: {
  category: string
  subcategory: string
  slug: string
}): Items {
  const fullPath = join(
    POSTS_PATH,
    'just-4-dev-blog',
    `${category}`,
    `${subcategory}`,
    `${slug}.mdx`,
  )

  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  const items: Items = {}
  items['content'] = content

  return items
}
