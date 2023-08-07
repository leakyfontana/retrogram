import { FC } from 'react';
import { FaComment } from 'react-icons/fa';
import { MdLocationPin } from 'react-icons/md';
import { PiClockFill } from 'react-icons/pi';

interface Props {
  id: string;
};

const PostListImage: FC<Props> = ({ id }) => {
  return (
    <figure id={id} className="m-0 drop-shadow-md bg-[#eeeeee] p-2 rounded-lg flex flex-col">
      <div className='pb-2 flex flex-row items-center text-sm justify-between pr-1'>
        <div className='flex flex-row items-center gap-[1px] text-[#5E81C2]'>
          <MdLocationPin size={16} />
          <p>Undisclosed Location</p>
        </div>
        <div className='flex flex-row items-center gap-[2px] text-[#c9cccf]'>
          <PiClockFill className='transform -scale-x-100' size={16} />
          <p>4w</p>
        </div>
      </div>
      <img className="w-full align-top" src="assets/images/profile_picture.jpg" alt="" />
      <div className="flex flex-nowrap items-center gap-2 pt-2 text-sm">
        <FaComment className="transform -scale-x-100 flex-shrink-0" color='#c9cccf' size={14} />
        <p className="text-[#214E72] font-semibold">Xander</p>
        <p className='flex-grow whitespace-normal'>Lorem ipsum dolor sit amet consectetur.</p>
      </div>
    </figure>
  )
}

export default PostListImage;