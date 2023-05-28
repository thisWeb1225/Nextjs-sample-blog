import Layout from '../../components/rootLayout';
import { getAllPostIds, getPostData } from '../../lib/posts'
import Head from 'next/head';

export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article className='px-2 sm:px-8 md:px-24 lg:px-32 pt-24 tw-post'>
        <div className='text-xs text-tw-gray'>
          {postData.date}
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params?.id as string);

  return {
    props: {
      postData,
    }
  }
}