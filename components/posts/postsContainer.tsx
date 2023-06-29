import { useRef, useEffect } from "react";

import { sortedPostsDataType } from "../../lib/posts";
import PostItem from "./postItem";

import gsap from 'gsap';
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PostsContainer = ({ allSortedPostsData }: {
  allSortedPostsData: sortedPostsDataType[]
}) => {

  const brige = useRef();
  const post = useRef();
  const postTitle = useRef();
  const postItemContainer = useRef();

  useEffect(() => {

    let ctx = gsap.context(() => {

      gsap.timeline({
        scrollTrigger: {
          trigger: post.current,
          start: "top bottom",
          end: "center center",
          scrub: 1,
        }
      })
        .from(brige.current, {
          y: 100,
          opacity: 0,
        }, 0)
        .from(postTitle.current, {
          y: 300,
        }, 0.1)
        .from(postItemContainer.current, {
          y: 600,
        }, 0.2)

    })

    return () => ctx.revert(); // cleanup

  }, []); // <- empty dependency Array so it doesn't re-run on every render

  return (
    <>
      <p className="text-base text-center text-tw-gray my-56" ref={brige}>I also share a lot of tutorial in IG</p>
      <div className="tw-spacing" ref={post}>
        <h3 className="text-xl font-bold text-tw-gray border-gray-600" ref={postTitle}>My Posts</h3>
        <ul className="grid md:grid-cols-3 gap-8 mt-10" ref={postItemContainer}>
          {allSortedPostsData.map(({ id, date, title }) => (
            <PostItem id={id} date={date} title={title} key={id} />
          ))}
        </ul>
      </div>
    </>

  )
}

export default PostsContainer;
