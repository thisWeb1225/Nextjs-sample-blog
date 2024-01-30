// data
import { siteTitle } from '../components/rootLayout/rootLayout';
import { GetStaticProps } from 'next'
import { getSortedProjectsData } from '../lib/projects';

// component
import Head from 'next/head';
import RootLayout from '../components/rootLayout/rootLayout';
import Banner from '../components/banner/banner';
import About from '../components/about/about';
import ProjectContainer from '../components/project/projectContainer';
import IgPostContainer from '../components/igPost/igPostContainer';
import BridgeText from '../components/bridgeText/bridgeText';

// i18n
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
      <IgPostContainer />
      <BridgeText content={t('contact-bridge-text')}></BridgeText>

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
