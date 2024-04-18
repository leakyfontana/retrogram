import { FC, useEffect, useState } from "react";
import { Post } from "../helpers/types";
import byteArrayToUrl from "../helpers/functions/byteArrayToURL";
import getImage from "../services/getImage";

interface Props {
  post: Post;
  scrollToPost: (postIdx: number) => void;
  idx: number;
}

const PostGridImage: FC<Props> = ({ post, idx, scrollToPost }) => {

  // State to hold the URL of the rendered image
  const [imageURL, setImageURL] = useState('')

  useEffect(() => {
    const fetchImage = async () => {
        // Perform asynchronous operations
        const imageBytes: Uint8Array = await getImage(post.path);
        setImageURL(byteArrayToUrl(imageBytes));
    };

    // Call the async function immediately
    fetchImage();
  });

  return (
    <button type="button" onClick={() => scrollToPost(idx)} className="relative block cursor-pointer">
      <figure className="m-0 drop-shadow-md p-[2px] bg-[#eeeeee]">
        <img className="w-full align-top" src={imageURL} alt="" />
      </figure>
      {/* <span className="absolute hidden group-hover:flex items-center justify-center text-[white] text-center inset-0 bg-[#989899] z-10">
        <p>
          <span className="w-20 font-[bold] text-center inline-block m-[5px]">150</span>
          <span className="w-20 font-[bold] text-center inline-block m-[5px]">10</span>
        </p>
      </span> */}
    </button>
  )
};

export default PostGridImage;