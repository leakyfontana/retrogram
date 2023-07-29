import { FC } from "react";

interface Props {
  name: string;
  bio: string;
}

const ProfileBio: FC<Props> = ({ name, bio}) => {
  return (
    <div className="w-full border-t-2 h-fit-content">
      <h3 className="m-1 font-bold">{name}</h3>
      <p className="m-1">{bio}</p>
    </div>
  );
};

export default ProfileBio;