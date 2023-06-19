import { getAllProjectsIds, getProjectData } from '../../lib/projects';
import Head from 'next/head';
import Image from 'next/image';

import Layout from '../../components/rootLayout/index';

export default function Project({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>

      <article className='px-2 sm:px-8 md:px-24 lg:px-32 pt-24 tw-post'>
        <Image 
          src={postData.bannerSrc}
          width={640}
          height={500}
          alt={postData.title}
          className='rounded-md border border-tw-gray relative left-1/2 -translate-x-1/2'
        />
        <div className='text-xs text-tw-gray mt-4 text-center mb-16'>
          {postData.date}
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = getAllProjectsIds();
  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const postData = await getProjectData(params?.id as string);

  return {
    props: {
      postData,
    }
  }
}