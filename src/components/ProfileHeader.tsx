import { FC } from "react";
import ProfileImage from "./ProfileImage";
import ProfileBio from "./ProfileBio";
import ProfileStat from "./ProfileStat";
import ProfileEditButton from "./ProfileEditButton";

interface Props {
  postCount: number;
};

const ProfileHeader: FC<Props> = ({ postCount }) => {
  return (
    <div className="bg-[#eeeeee] flex flex-col w-full h-fit rounded-md drop-shadow-md border-[#e9e9e9]">
      <div className="flex flex-row w-full h-fit">
        <ProfileImage />
        <div className="flex flex-col w-full">
          <div className="flex flex-row w-full h-1/2">
            <ProfileStat name={'photos'} count={postCount} />
            <ProfileStat name={'following'} count={808} />
            <ProfileStat name={'followers'} count={809} />
          </div>
          <ProfileEditButton />
        </div>
      </div>
      <ProfileBio name={'Xander'} bio={'stumbling never falling'} />
    </div>
  );
};

export default ProfileHeader;
