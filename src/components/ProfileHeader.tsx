import { FC } from "react";
import ProfileImage from "./ProfileImage";
import ProfileBio from "./ProfileBio";
import ProfileStat from "./ProfileStat";
import ProfileEditButton from "./ProfileEditButton";

const ProfileHeader: FC = () => {
  return (
    <div className="bg-[#eeeeee] flex flex-col w-full h-36 p-2 rounded-md shadow-md border-[#e9e9e9]">
      <div className="flex flex-row w-full h-2/3">
        <ProfileImage />
        <div className="flex flex-col w-full">
          <div className="flex flex-row w-full h-1/2">
            <ProfileStat />
            <ProfileStat />
            <ProfileStat />
          </div>
          <ProfileEditButton />
        </div>
      </div>
      <ProfileBio />
    </div>
  );
};

export default ProfileHeader;
