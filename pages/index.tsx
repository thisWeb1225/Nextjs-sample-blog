import Head from 'next/head';
import Layout from '../components/rootLayout/index';
import { siteTitle } from '../components/rootLayout';
import { getSortedPostsData } from '../lib/posts';
import { GetStaticProps } from 'next'

import Banner from '../components/banner/index';
import About from '../components/about/index';
import Project from '../components/project/index';
import Posts from '../components/posts/index';

export default function Home({ allSortedPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <Banner></Banner>
      <About></About>
      <Project></Project>
      <Posts allSortedPostsData={allSortedPostsData}></Posts>

      {/* <section>
        <h2>Blog</h2>
        <ul>
          {allPostsData.map(({ id, date, title }) => (
            <li key={id}>
              <Link href={`/posts/${id}`}>{title}</Link>
              <hr />
            </li>
          ))}
        </ul>
      </section> */}
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const allSortedPostsData = getSortedPostsData();
  return {
    props: {
      allSortedPostsData,
    },
  };
}
