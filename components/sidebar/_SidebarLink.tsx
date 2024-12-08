import Link from "next/link";

interface SidebarLink {
    children: React.ReactNode,
    icon: React.ReactNode,
    path: string,
}

const SidebarLink = ({
  children, icon, path,
}: SidebarLink) => {
  return (
    <Link
      href={path}
      className="transition ease-in-out hover:bg-blue-400 hover:scale-105 text-slate-600 hover:text-white hover:shadow-lg px-2 py-2 rounded-md"
    >
      <div className="flex flex-row gap-3">
        <div className="py-0.5">
          {icon}
        </div>
        <div className={``}>{children}</div>
      </div>
    </Link>
  );
};

export default SidebarLink;
