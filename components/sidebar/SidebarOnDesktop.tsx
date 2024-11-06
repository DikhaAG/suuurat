"use client";
import { motion, useAnimationControls } from "framer-motion";
import { FiPlus } from "react-icons/fi";
import { RiHistoryFill, RiDashboardLine } from "react-icons/ri";
import BrandIcon from "../icons/BrandIcon";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import SidebarLink from "./SidebarLink";
import { CiUser } from "react-icons/ci";
import { IoLogOutOutline } from "react-icons/io5";
import { User } from "@prisma/client";
import { MdMailOutline } from "react-icons/md";
import Link from "next/link";
import { signOut } from "@/auth";
import SignOutButton from "./SignOutButton";

const containerVariants = {
  open: {
    width: "16rem",
    transition: {
      type: "spring",
      damping: 15,
      duration: 0.5,
    },
  },
  close: {
    width: "5rem",
    transition: {
      type: "spring",
      damping: 15,
      duration: 0.5,
    },
  },
};
const arrowVariants = {
  close: {
    rotate: 360,
  },
  open: {
    rotate: 180,
  },
};

interface SidebarOnDesktopInterface {
  children: React.ReactNode;
  user: User | null;
}
const SidebarOnDesktop = ({ children, user }: SidebarOnDesktopInterface) => {
  const pathName = usePathname();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const containerControls = useAnimationControls();
  const arrowControls = useAnimationControls();
  const handleOpenClose = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    if (isOpen) {
      containerControls.start("open");
      arrowControls.start("open");
    } else {
      containerControls.start("close");
      arrowControls.start("close");
    }
  }, [arrowControls, containerControls, isOpen]);
  return (
    <main className="w-full h-screen flex flex-row relative">
      <motion.nav
        animate={containerControls}
        variants={containerVariants}
        initial={"close"}
        className="hidden sm:flex flex-col z-10 gap-20 p-5 absolute top-0 left-0 h-full bg-white border border-neutral-300"
      >
        <div className="flex flex-row w-full justify-between place-items-center">
          <div className={`${isOpen ? "visible" : "hidden"}`}>
            <BrandIcon
              iconSize={30}
              labelSize="text-2xl"
              labelVisibility={isOpen ? true : false}
            />
          </div>
          <div className="cursor-pointer" onClick={() => handleOpenClose()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-8 m-1"
            >
              <motion.path
                variants={arrowVariants}
                animate={arrowControls}
                transition={{
                  duration: 0.5,
                  ease: "easeInOut",
                }}
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
              />
            </svg>
          </div>
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
                  icon={<RiHistoryFill size={22} />}
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
                  icon={<MdMailOutline size={22} />}
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
        <div className="fixed bottom-4 self-center">
          <div className="relative ">
            <SignOutButton />
          </div>
        </div>
      </motion.nav>
      <section className="flex flex-col w-full gap-5">
        <div id="topNavDesktop" className="hidden sm:flex relative mb-5">
          <div className="flex flex-row fixed top-0 left-0 w-full place-content-end px-12 py-5">
            <div id="AccountTopNavDesktop" className="flex flex-row gap-3">
              <div className="flex flex-col place-items-end">
                <div className="">{user?.name}</div>
                <div className="px-2.5 pb-0.5 bg-blue-400 text-center rounded-xl text-sm text-white">
                  {user?.isAdmin ? "admin" : "pengguna"}
                </div>
              </div>
              <div className="text-center place-content-center">
                <CiUser size={40} />
              </div>
            </div>
          </div>
        </div>
        {children}
      </section>
    </main>
  );
};

export default SidebarOnDesktop;
