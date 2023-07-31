import { FC } from "react";

const PostGridImage: FC = () => {
  return (
    <a href="https://example.com" className="cursor-pointer relative block">
      <figure className="m-0 drop-shadow-md p-[2px] bg-[#eeeeee]">
        <img className="w-full align-top" src="assets/images/profile_picture.jpg" alt="" />
      </figure>
      {/* <span className="absolute hidden group-hover:flex items-center justify-center text-[white] text-center inset-0 bg-[#989899] z-10">
        <p>
          <span className="w-20 font-[bold] text-center inline-block m-[5px]">150</span>
          <span className="w-20 font-[bold] text-center inline-block m-[5px]">10</span>
        </p>
      </span> */}
    </a>
  )
};

export default PostGridImage;