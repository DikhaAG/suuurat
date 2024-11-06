import Link from "next/link";
import { IconType } from "react-icons";

interface DashboardCardInterface {
  href: string;
  icon: JSX.Element,
  children: React.ReactNode,
  count: number
}
const DashboardCard = ({ href, icon, children, count }: DashboardCardInterface) => {
  return (
    <Link href={href} className="flex flex-row rounded-xl bg-blue-500 text-white transition ease-in-out hover:shadow hover:scale-105">
      <div className="bg-blue-600 rounded-l-xl p-4 text-xl font-bold">
        {count}
      </div>
      <div className="flex flex-row p-4 gap-3">
        <div className="">
            {icon}
        </div>
        <div className="">
            {children}
        </div>
      </div>
    </Link>
  );
};


export default DashboardCard