import { sortedPostsDataType } from "../../lib/posts";
import PostItem from "./postItem";

const Posts = ({ allSortedPostsData }: {
  allSortedPostsData: sortedPostsDataType[]
}) => {
  return (
    <div className="mt-48 px-2 sm:px-8 md:px-24 lg:px-32">
      <h3 className="text-4xl text-center">My Articles</h3>
      <ul className="grid gap-8 grid-cols-3 mt-10">
        {allSortedPostsData.map(({ id, date, title }) => (
          <PostItem id={id} date={date} title={title}/>
        ))}
      </ul>
    </div>
  )
}

export default Posts;
