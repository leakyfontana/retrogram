import { FC } from "react";
import PostListImage from "./PostListImage";

const PostList: FC = () => {
  return (
    <div className="flex flex-col gap-3">
      <PostListImage id="1" />
      <PostListImage id="2" />
      <PostListImage id="3" />
      <PostListImage id="4" />
      <PostListImage id="5" />
      <PostListImage id="6" />
      <PostListImage id="7" />
      <PostListImage id="8" />
      <PostListImage id="9" />
    </div>
  )
}

export default PostList;