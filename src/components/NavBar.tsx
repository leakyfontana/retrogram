import { FC, useState } from "react";
import NavButton from "./NavButton";
import NavButtonEnum from "../helpers/enums/NavButtonEnum";

const NavBar: FC = () => {
  const [selectedButton, setSelectedButton] = useState<number>(NavButtonEnum.Grid)

  return (
    <div className="bg-[#eeeeee] flex flex-row w-full h-14 rounded-md drop-shadow-md divide-[#E4E7EB] divide-x-2">
     <NavButton selectedButton={selectedButton} setSelectedButton={setSelectedButton} buttonType={NavButtonEnum.Grid} />
     <NavButton selectedButton={selectedButton} setSelectedButton={setSelectedButton} buttonType={NavButtonEnum.List} />
    </div>
  );
};

export default NavBar;