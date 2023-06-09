import Head from 'next/head';

// data
import { siteTitle } from '../components/rootLayout/rootLayout';
import { GetStaticProps } from 'next'
import { getSortedPostsData } from '../lib/posts';
import { getSortedProjectsData } from '../lib/projects';

// component
import RootLayout from '../components/rootLayout/index';
import Banner from '../components/banner/index';
import About from '../components/about/index';
import ProjectContainer from '../components/project/index';
import IgPost from '../components/igPost';
import BrigeText from '../components/brigeText/brigeText';

/// i18n
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from "next-i18next";

export default function Home({ allSortedProjectsData }) {

  const { t } = useTranslation('common')

  return (
    <RootLayout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <Banner></Banner>
      <About></About>
      <ProjectContainer allSortedProjectsData={allSortedProjectsData}></ProjectContainer>
      <IgPost></IgPost>
      <BrigeText content={t('contact-brige-text')}></BrigeText>

      {/* <Posts allSortedPostsData={allSortedPostsData}></Posts> */}
    </RootLayout>
  );
}

export const getStaticProps: GetStaticProps = async ({locale}) => {
  // const allSortedPostsData = getSortedPostsData();
  const allSortedProjectsData = getSortedProjectsData();

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      // allSortedPostsData,
      allSortedProjectsData
    },
  };
}
