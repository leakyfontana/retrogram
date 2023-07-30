import PostGridImage from "./PostGridImage";

const PostGrid = () => {
  return (
    <section className="grid grid-cols-[repeat(3,minmax(100px,293px))] justify-center gap-7">
      <PostGridImage />
      <PostGridImage />
      <PostGridImage />
      <PostGridImage />
      <PostGridImage />
      <PostGridImage />
      <PostGridImage />
      <PostGridImage />
      <PostGridImage />
    </section>
  )
};

export default PostGrid;