"use client"
import { BrandIconInterface } from "@/interfaces/component/brandIconInterface";
import { usePathname } from "next/navigation";
import { HiMiniPaperAirplane } from "react-icons/hi2";

const BrandIcon = ({iconSize, labelSize, labelVisibility, wrapper}: BrandIconInterface) => {
    const pathName: string = usePathname()
  return (
    <div className={`${wrapper} flex flex-row`}>
      <HiMiniPaperAirplane
        className={`text-blue-400 -rotate-45 ${pathName === "/" && "transition-all ease-in-out hover:-translate-y-3"} `}
        size={iconSize}
      />
      <div className={`poppins p-1 ${labelSize} ${pathName === "/" && "cursor-default"}  ${labelVisibility ? "visible" : "hidden"} `}>
        <div className={`${pathName === "/" && "transition-all ease-in-out hover:-translate-y-3"}`}>
            Surat
        </div>
      </div>
    </div>
  );
};

export default BrandIcon;
