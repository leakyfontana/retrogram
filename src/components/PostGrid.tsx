import { FC } from "react";
import PostGridImage from "./PostGridImage";

interface Props {
  setSelectedButton: React.Dispatch<React.SetStateAction<number>>;
  scrollToPost: (postId: string) => void;
};

const PostGrid: FC<Props> = ({ setSelectedButton, scrollToPost }) => {
  return (
    <section className="grid grid-cols-[repeat(3,minmax(100px,293px))] justify-center gap-7">
      <PostGridImage id="1" scrollToPost={scrollToPost} />
      <PostGridImage id="2" scrollToPost={scrollToPost} />
      <PostGridImage id="3" scrollToPost={scrollToPost} />
      <PostGridImage id="4" scrollToPost={scrollToPost} />
      <PostGridImage id="5" scrollToPost={scrollToPost} />
      <PostGridImage id="6" scrollToPost={scrollToPost} />
      <PostGridImage id="7" scrollToPost={scrollToPost} />
      <PostGridImage id="8" scrollToPost={scrollToPost} />
      <PostGridImage id="9" scrollToPost={scrollToPost} />
    </section>
  )
};

export default PostGrid;