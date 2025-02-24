import { FC } from "react";
import NavButtonEnum from "../helpers/enums/NavButtonEnum";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { PiListFill } from "react-icons/pi"

interface Props {
  selectedButton: number;
  setSelectedButton: React.Dispatch<React.SetStateAction<number>>;
  buttonType: NavButtonEnum;
}

const NavButton: FC<Props> = ({ selectedButton, setSelectedButton, buttonType }) => {

  const getButtonIcon = () => {
    if (buttonType === NavButtonEnum.Grid) {
      return <BsFillGrid3X3GapFill size={30} />
    }
    return <PiListFill size={38} />
  }

  const isSelected = buttonType === selectedButton;

  const handleClick = () => {
    setSelectedButton(buttonType);
  }

  return (
      <button className="relative flex flex-col items-center justify-center w-1/2" onClick={handleClick}>
        {getButtonIcon()}
        {isSelected && (
          <span className="absolute w-0 h-0 text-[0] leading-[0] float-left border-t-[15px] border-t-[#eeeeee] border-x-[15px] border-x-transparent border-solid bottom-0 translate-y-3"></span>
        )}
      </button>
  )
};

export default NavButton;