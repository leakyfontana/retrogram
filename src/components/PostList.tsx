import { FC } from "react";
import PostListImage from "./PostListImage";
import { Post } from "../helpers/types";

interface Props {
  posts: Post[]
};

const PostList: FC<Props> = ({ posts }) => {
  console.log(posts);

  return (
    <div className="flex flex-col gap-3">
      {posts.map((post) => <PostListImage post={post} />)}
    </div>
  )
}

export default PostList;