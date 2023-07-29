import { FC } from "react";
import ProfileImage from "./ProfileImage";
import ProfileBio from "./ProfileBio";
import ProfileStat from "./ProfileStat";
import ProfileEditButton from "./ProfileEditButton";

const ProfileHeader: FC = () => {
  return (
    <div className="bg-[#eeeeee] flex flex-col w-full h-fit rounded-md drop-shadow-md border-[#e9e9e9]">
      <div className="flex flex-row w-full h-fit">
        <ProfileImage />
        <div className="flex flex-col w-full">
          <div className="flex flex-row w-full h-1/2">
            <ProfileStat name={'photos'} count={0} />
            <ProfileStat name={'following'} count={0} />
            <ProfileStat name={'followers'} count={0} />
          </div>
          <ProfileEditButton />
        </div>
      </div>
      <ProfileBio name={'Xander'} bio={'Heres to the crazy ones...'} />
    </div>
  );
};

export default ProfileHeader;
