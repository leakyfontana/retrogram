import { FC } from 'react';
import { FaComment } from 'react-icons/fa';
import { MdLocationPin } from 'react-icons/md';
import { PiClockFill } from 'react-icons/pi';
import { Post } from '../helpers/types';
import parseTimestamp from '../helpers/functions/parseTimestamp';

interface Props {
  post: Post;
};

const PostListImage: FC<Props> = ({ post }) => {
  return (
    <figure id={post.id} className="m-0 drop-shadow-md bg-[#eeeeee] p-2 rounded-lg flex flex-col">
      <div className='flex flex-row items-center justify-between pb-2 pr-1 text-sm'>
        <div className='flex flex-row items-center gap-[1px] text-[#5E81C2]'>
          <MdLocationPin size={16} />
          <p>{post.location}</p>
        </div>
        <div className='flex flex-row items-center gap-[2px] text-[#c9cccf]'>
          <PiClockFill className='transform -scale-x-100' size={16} />
          <p>{parseTimestamp(post.date_posted)}</p>
        </div>
      </div>
      <img className="w-full align-top" src={post.path} alt="" />
      {post.caption && 
        <div className="flex items-center gap-2 pt-2 text-sm flex-nowrap">
          <FaComment className="flex-shrink-0 transform -scale-x-100" color='#c9cccf' size={14} />
          <p className="text-[#214E72] font-semibold">Xander</p>
          <p className='flex-grow whitespace-normal'>{post.caption}</p>
        </div>
      }
    </figure>
  )
}

export default PostListImage;