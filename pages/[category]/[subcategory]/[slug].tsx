import { GetStaticPaths, GetStaticProps } from 'next';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Layout from '../../../components/Layout';
import Thumbnail from '../../../components/Thumbnail';
import { useMdxComponentsContext } from '../../../context/MdxComponents';
import { IPost } from '../../../types/post';
import { SITE_URL } from '../../../utils/constants';
import { getAllPosts, getPost } from '../../../utils/mdxUtils';

type Props = {
  source: MDXRemoteSerializeResult;
  frontMatter: Omit<IPost, 'slug'>;
};

const SubCategoryPage = ({ source, frontMatter }: Props) => {
  const router = useRouter();
  const lang = router.locale;

  const ogImage = SITE_URL + frontMatter.thumbnail;

  const { setLang } = useMdxComponentsContext();

  useEffect(() => {
    setLang(lang);
  }, [lang, setLang]);

  return (
    <Layout pageTitle={frontMatter.title}>
      <Head>
        <meta
          name="description"
          content={frontMatter.description}
          key="description"
        />
        <meta
          property="og:description"
          content={frontMatter.description}
          key="ogDescription"
        />
        <meta property="og:image" content={ogImage} key="ogImage" />
      </Head>

      <article className="prose prose-green dark:prose-dark">
        <div className="mb-4">
          <Thumbnail title={frontMatter.title} src={frontMatter.thumbnail} />
        </div>

        <h1>{frontMatter.title}</h1>
        <p>{frontMatter.date}</p>

        <p>{frontMatter.description}</p>

        <MDXRemote {...source} />
      </article>
    </Layout>
  );
};

export default SubCategoryPage;

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const { content, data } = getPost(params, locale);

  const mdxSource = await serialize(content, { scope: data });

  return {
    props: {
      source: mdxSource,
      frontMatter: data,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const posts = getAllPosts('en');

  const paths = locales!.flatMap((locale) =>
    posts.map((post) => ({
      params: {
        category: post.category,
        subcategory: post.subcategory,
        slug: post.slug,
      },
      locale,
    }))
  );

  return {
    paths,
    fallback: false,
  };
};
