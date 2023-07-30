import { FC } from "react";
import NavButton from "./NavButton";
import NavButtonEnum from "../helpers/enums/NavButtonEnum";

const NavBar: FC = () => {
  return (
    <div className="bg-[#eeeeee] flex flex-row w-full h-14 rounded-md drop-shadow-md divide-[#E4E7EB] divide-x-2">
     <NavButton buttonType={NavButtonEnum.Grid} />
     <NavButton buttonType={NavButtonEnum.List} />
    </div>
  );
};

export default NavBar;