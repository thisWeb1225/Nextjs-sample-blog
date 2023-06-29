import Head from 'next/head';

import { siteTitle } from '../components/rootLayout/rootLayout';
import { GetStaticProps } from 'next'
import { getSortedPostsData } from '../lib/posts';
import { getSortedProjectsData } from '../lib/projects';

import RootLayout from '../components/rootLayout/index';
import Banner from '../components/banner/index';
import About from '../components/about/index';
import ProjectContainer from '../components/project/index';
import Posts from '../components/posts/index';

export default function Home({ allSortedPostsData, allSortedProjectsData }) {
  return (
    <RootLayout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <Banner></Banner>
      <ProjectContainer allSortedProjectsData={allSortedProjectsData}></ProjectContainer>
      <Posts allSortedPostsData={allSortedPostsData}></Posts>
      <About></About>

    </RootLayout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const allSortedPostsData = getSortedPostsData();
  const allSortedProjectsData = getSortedProjectsData();

  return {
    props: {
      allSortedPostsData,
      allSortedProjectsData
    },
  };
}
