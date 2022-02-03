import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Layout } from '../../components/Layout'
import { NextLink } from '../../components/NextLink'
import { Pagination } from '../../components/Pagination'
import { Thumbnail } from '../../components/Thumbnail'
import usePagination from '../../hooks/usePagination'
import { IPost } from '../../types/post'
import { SITE_NAME } from '../../utils/constants'
import { getAllPostsByCat } from '../../utils/mdxUtils'

type Props = {
  posts: IPost[]
}

const CategoryIndex = ({ posts }: Props) => {
  const router = useRouter()
  const lang = router.locale

  const { currentPage, currentData, maxPage, setElement } = usePagination(
    posts,
    2,
    1.0
  )

  const currentPosts = currentData()

  return (
    <Layout>
      <Head>
        <title>{SITE_NAME}</title>
      </Head>

      <div className="space-y-12">
        {currentPosts.map((post) => (
          <div key={post.slug}>
            <div className="mb-4">
              <Thumbnail
                slug={post.slug}
                title={post.title}
                src={post.thumbnail}
              />
            </div>

            <h2 className="text-2xl font-bold mb-4">
              <NextLink
                href={`/${post.category}/${post.subcategory}/${post.slug}`}
              >
                {post.title}
              </NextLink>
            </h2>

            <p className="dark:text-gray-300">{post.description}</p>
          </div>
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        maxPage={maxPage}
        setElement={setElement}
      />
    </Layout>
  )
}

export default CategoryIndex
export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const posts = getAllPostsByCat(params?.category as string, locale)

  return { props: { posts } }
}

export const getStaticPaths: GetStaticPaths = async (params) => {
  const posts = getAllPostsByCat('en')

  const paths = params.locales!.flatMap((locale) =>
    posts.map((post) => ({
      params: {
        category: post.category,
      },
      locale,
    }))
  )

  return {
    paths: [],
    fallback: false,
  }
}
