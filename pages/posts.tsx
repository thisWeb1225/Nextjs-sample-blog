import { GetStaticProps } from "next";
import { getSortedPostsData, sortedPostsDataType } from "../lib/posts";
import RootLayout from "../components/rootLayout/index";
import PostsContainer from "../components/posts/postsContainer";

type Props = {
  allSortedPostsData: Array<sortedPostsDataType>
}

const Posts: React.FC = ({allSortedPostsData} : Props) => {

  return (
    <RootLayout>
      <PostsContainer allSortedPostsData={allSortedPostsData}></PostsContainer>
    </RootLayout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const allSortedPostsData = getSortedPostsData();
  return {
    props: {
      allSortedPostsData,
    },
  };
}

export default Posts;