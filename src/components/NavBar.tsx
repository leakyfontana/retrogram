import { FC } from "react";
import NavButton from "./NavButton";
import NavButtonEnum from "../helpers/enums/NavButtonEnum";

interface Props {
  selectedButton: number;
  setSelectedButton: React.Dispatch<React.SetStateAction<number>>;
}

const NavBar: FC<Props> = ({ selectedButton, setSelectedButton}) => {

  return (
    <div className={`bg-[#eeeeee] flex flex-row w-full h-14 py-1 rounded-md drop-shadow-md divide-[#E4E7EB] divide-x-2 ${selectedButton === NavButtonEnum.Grid ? 'my-4' : 'mb-4'}`}>
     <NavButton selectedButton={selectedButton} setSelectedButton={setSelectedButton} buttonType={NavButtonEnum.Grid} />
     <NavButton selectedButton={selectedButton} setSelectedButton={setSelectedButton} buttonType={NavButtonEnum.List} />
    </div>
  );
};

export default NavBar;