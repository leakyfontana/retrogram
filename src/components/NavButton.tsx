import { FC } from "react";
import NavButtonEnum from "../helpers/enums/NavButtonEnum";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { PiListBold } from "react-icons/pi"
import ReactDOM from "react-dom";
import { IconType } from "react-icons";

interface Props {
  buttonType: NavButtonEnum;
}

const NavButton: FC<Props> = ({ buttonType }) => {

  const getButtonIcon = () => {
    if (buttonType === NavButtonEnum.Grid) {
      return ( <BsFillGrid3X3GapFill size={30}>
                  <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#000000" />
              <stop offset="100%" stopColor="#ffffff" />
            </linearGradient>
          </defs>
          <path fill="url(#gradient)" d={getSVGPath(BsFillGrid3X3GapFill)} />
      </BsFillGrid3X3GapFill>)
    }

    return <PiListBold size={40} />
  }

    // This function is used to extract the SVG path from the icon component
    const getSVGPath = (IconComponent: IconType): string => {
      const tempElement = document.createElement("div");
      ReactDOM.render(<IconComponent />, tempElement);
      const svgElement = tempElement.querySelector("svg");
      return svgElement?.getAttribute("d") || "";
    };


  return (
    <button className="w-1/2 flex flex-col items-center justify-center">
      {getButtonIcon()}
    </button>
  )
};

export default NavButton;