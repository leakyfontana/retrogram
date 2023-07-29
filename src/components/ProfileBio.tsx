import { FC } from "react";

interface Props {
  name: string;
  bio: string;
}

const ProfileBio: FC<Props> = ({ name, bio}) => {
  return (
    <div className="w-full border-t-2 h-fit-content">
      <h3 className="mx-2 mt-2 font-bold">{name}</h3>
      <p className="mx-2 mb-2">{bio}</p>
    </div>
  );
};

export default ProfileBio;