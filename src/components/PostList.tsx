import { FC } from "react";
import PostListImage from "./PostListImage";

const PostList: FC = () => {
  return (
    <div className="flex flex-col gap-3">
      <PostListImage />
      <PostListImage />
      <PostListImage />
      <PostListImage />
      <PostListImage />
      <PostListImage />
      <PostListImage />
      <PostListImage />
      <PostListImage />
    </div>
  )
}

export default PostList;