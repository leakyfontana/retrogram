import { FC } from "react";
import PostGridImage from "./PostGridImage";
import { Post } from "../helpers/types";

interface Props {
  posts: Post[];
  setSelectedButton: React.Dispatch<React.SetStateAction<number>>;
  scrollToPost: (postId: string) => void;
};

const PostGrid: FC<Props> = ({ setSelectedButton, scrollToPost, posts }) => {
  console.log(posts);

  return (
    <section className="grid grid-cols-[repeat(3,minmax(100px,293px))] justify-center gap-3">
      {posts.map((post, idx) => <PostGridImage post={post} scrollToPost={scrollToPost} />)}
    </section>
  )
};

export default PostGrid;