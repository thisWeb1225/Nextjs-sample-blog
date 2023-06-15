import { sortedPostsDataType } from "../../lib/posts";
import PostItem from "./postItem";

const PostsContainer = ({ allSortedPostsData }: {
  allSortedPostsData: sortedPostsDataType[]
}) => {
  return (
    <div className="mt-36">
      <h3 className="text-xl font-bold text-tw-gray mx-2 sm:mx-8 md:mx-24 lg:mx-32 border-gray-600">My Posts</h3>
      <ul className="grid grid-cols-3 gap-8 mt-10 px-2 sm:px-8 md:px-24 lg:px-32">
        {allSortedPostsData.map(({ id, date, title }) => (
          <PostItem id={id} date={date} title={title} key={id}/>
        ))}
      </ul>
    </div>
  )
}

export default PostsContainer;
