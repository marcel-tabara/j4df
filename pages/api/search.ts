import { NextApiRequest, NextApiResponse } from 'next'
import postsEn from '../../_posts/en/just-4-dev-blog/all.json'

export default (req: NextApiRequest, res: NextApiResponse): void => {
  const query = req.query.q as string
  // eslint-disable-next-line no-irregular-whitespace
  const words = query ? query.toLowerCase().replace(/　/g, ' ').split(' ') : []

  const locale = req.query.locale

  const posts = locale === 'en' ? postsEn : postsEn

  const results =
    words.length > 0
      ? posts.filter(
          (post) =>
            words.every((word) => post.title.includes(word)) ||
            words.every((word) => post.description.includes(word)) ||
            words.every((word) => post.body.includes(word))
        )
      : []

  res.status(200).json({ results })
}
