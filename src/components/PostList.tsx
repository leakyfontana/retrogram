import { FC } from "react";
import PostListImage from "./PostListImage";
import { Post } from "../helpers/types";
import { FixedSizeList, FixedSizeList as List } from "react-window";

interface Props {
  posts: Post[];
  listRef: React.LegacyRef<FixedSizeList<any>> | undefined;
}

interface RowProps {
  index: number;
  style: React.CSSProperties;
}

const PostList: FC<Props> = ({ posts, listRef }) => {
  const Row: FC<RowProps> = ({ index, style }) => (
    <div style={style}>
      <PostListImage post={posts[index]} />
    </div>
  );

  // return (
  //   <div className="flex flex-col gap-3">
  //     {/* {posts.map((post) => <PostListImage post={post} />)} */}
  //     <List height={150} itemCount={1000} itemSize={35} width={300}>
  //       {Row}
  //     </List>
  //   </div>
  // );

  return (
    <List height={1600} itemCount={posts.length} itemSize={450} width={"100%"} ref={listRef} className="rounded-lg">
      {Row}
    </List>
  );
};

export default PostList;
