import { FC } from "react";
import PostGridImage from "./PostGridImage";
import { Image } from "../helpers/types";

interface Props {
  posts: Image[];
  setSelectedButton: React.Dispatch<React.SetStateAction<number>>;
  scrollToPost: (postIdx: number) => void;
};

const PostGrid: FC<Props> = ({ setSelectedButton, scrollToPost, posts }) => {
  return (
    <section className="grid grid-cols-[repeat(3,minmax(100px,293px))] justify-center gap-3">
      {posts.map((post, idx) => <PostGridImage post={post} idx={idx} scrollToPost={scrollToPost} key={idx} />)}
    </section>
  )
};

export default PostGrid;