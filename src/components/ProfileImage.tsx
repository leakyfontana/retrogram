import { FC } from "react";

const ProfileImage: FC = () => {
  return (
    <div className="border-r-2 pr-4 w-5/12">
      <img className="rounded-md m-2" src="assets/images/profile_picture.jpg" alt="temp" />
    </div>
  );
};

export default ProfileImage;
