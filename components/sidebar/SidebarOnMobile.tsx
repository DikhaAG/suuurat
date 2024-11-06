"use client";
import { BsList } from "react-icons/bs";
import BrandIcon from "../icons/BrandIcon";
import { IoIosArrowRoundBack } from "react-icons/io";

import { motion, useAnimationControls } from "framer-motion";
import { useEffect, useState } from "react";
import { IoLogOutOutline } from "react-icons/io5";
import { usePathname } from "next/navigation";
import { FiPlus } from "react-icons/fi";
import { LuTimer } from "react-icons/lu";
import { RiDashboardLine, RiHistoryFill } from "react-icons/ri";
import Link from "next/link";
import { CiUser } from "react-icons/ci";
import UserCard from "../utils/userCard";
import { User } from "@prisma/client";
import SidebarLink from "./SidebarLink";
import { signOut } from "@/auth";
import SignOutButton from "./SignOutButton";

const containerVariants = {
  open: {
    width: "16rem",
    left: "0rem",
    transition: {
      type: "spring",
      damping: 15,
      duration: 0.5,
    },
  },
  close: {
    left: "-16rem",
    width: "0rem",
    transition: {
      type: "spring",
      damping: 15,
      duration: 0.5,
    },
  },
};

interface SidebarOnMobileInterface {
  children: React.ReactNode;
  user: User | null;
}
const SidebarOnMobile = ({ children, user }: SidebarOnMobileInterface) => {
  const pathName = usePathname();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const containerControls = useAnimationControls();
  const handleOpenClose = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    if (isOpen) {
      containerControls.start("open");
    } else {
      containerControls.start("close");
    }
  }, [containerControls, isOpen]);
  return (
    <main className="w-full h-screen flex flex-row relative">
      <motion.nav
        animate={containerControls}
        variants={containerVariants}
        initial={"close"}
        className="bg-white flex sm:hidden flex-col z-10 gap-20 p-5 absolute top-0 left-0 h-full border border-neutral-300"
      >
        <div className="flex flex-row w-full justify-between place-items-center">
          <BrandIcon
            iconSize={30}
            labelSize="text-2xl"
            labelVisibility={true}
          />
          <button className="ml-6" onClick={() => handleOpenClose()}>
            <IoIosArrowRoundBack size={30} />
          </button>
        </div>
        <div className="flex flex-col gap-3">
          {pathName.includes("user") ? (
            <>
              <div
                className="flex flex-col"
                onClick={() => isOpen && handleOpenClose()}
              >
                <SidebarLink icon={<FiPlus size={22} />} path="/user">
                  <div className={`${isOpen ? "visible" : "hidden"}`}>Baru</div>
                </SidebarLink>
              </div>
              <div
                className="flex flex-col"
                onClick={() => isOpen && handleOpenClose()}
              >
                <SidebarLink
                  icon={<LuTimer size={22} />}
                  path="/user/requested"
                >
                  <div className={`${isOpen ? "visible" : "hidden"}`}>
                    Menunggu persetujuan
                  </div>
                </SidebarLink>
              </div>
              <div
                className="flex flex-col"
                onClick={() => isOpen && handleOpenClose()}
              >
                <SidebarLink
                  icon={<RiHistoryFill size={22} />}
                  path="/user/history"
                >
                  <div className={`${isOpen ? "visible" : "hidden"}`}>
                    Riwayat
                  </div>
                </SidebarLink>
              </div>
            </>
          ) : (
            <>
              <div
                className="flex flex-col"
                onClick={() => isOpen && handleOpenClose()}
              >
                <SidebarLink icon={<RiDashboardLine size={22} />} path="/admin">
                  <div className={`${isOpen ? "visible" : "hidden"}`}>
                    Dashboard
                  </div>
                </SidebarLink>
              </div>
            </>
          )}
        </div>
        <div className="absolute bottom-5 flex flex-row place-items-center gap-3 cursor-pointer">
          <UserCard
            name={user?.name}
            auth={user?.isAdmin ? "admin" : "pengguna"}
          >
            <CiUser size={30} />
          </UserCard>
        </div>
      </motion.nav>
      <section className="flex flex-col w-full gap-5 p-0 sm:p-11 ml-0 sm:ml-20">
        <div className="nav flex sm:hidden flex-row justify-between p-3 bg-white">
          <div className="px-2 pt-1 rounded-md bg-neutral-100 content-center">
            <button
              type="submit"
              onClick={() => handleOpenClose()}
              className="btn"
            >
              <BsList size={30} />
            </button>
          </div>
          <SignOutButton />
        </div>
        <div className="h-full px-4 sm:px-0 py-4 sm:py-0">{children}</div>
      </section>
    </main>
  );
};

export default SidebarOnMobile;
