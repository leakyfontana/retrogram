import { FC } from "react";

const ProfileImage: FC = () => {
  return (
    <div className="border-r-2 pr-4 w-5/12">
      <img className="rounded-md m-2 w-32 h-32" src="profile_picture.jpg" alt="temp" />
    </div>
  );
};

export default ProfileImage;
