import { getAllProjectsIds, getProjectData } from '../../lib/projects';
import Head from 'next/head';
import Image from 'next/image';

import Layout from '../../components/rootLayout/index';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';


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

  const ids = paths.map((post) => post.params.id);
  const pathsWithLocale = ids.map((id) => {
    return {
      params: { id: id.toString() },
      locale: 'en'
    }
  });

  return {
    paths: [...paths, ...pathsWithLocale],
    fallback: false,
  }
}

export async function getStaticProps({ params, locale }) {
  const postData = await getProjectData(params?.id as string);

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      postData,
    }
  }
}