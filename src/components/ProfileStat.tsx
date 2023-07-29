import { FC } from "react";

interface Props {
  name: String;
  count: number;
};

const ProfileStat: FC<Props> = ({ name, count }) => {
  return (
    <div className={`w-full border-b flex flex-col items-center ${name !== 'photos' && 'border-l-2'}`}>
      <p className="font-bold text-lg">{count}</p>
      <p className="text-xs">{name}</p>
    </div>
  );
};

export default ProfileStat;