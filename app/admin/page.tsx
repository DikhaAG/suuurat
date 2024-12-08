// import { auth } from "@/auth";
// import {
//   countAllConfirmedSurat,
//   countAllRequestedSurat,
//   getUserByName,
// } from "@/app/lib/actions";
// import { redirect } from "next/navigation";
// import DashboardCard from "@/components/admin/dashboard/DashboardCard";
// import { FaCheck, FaEnvelope } from "react-icons/fa6";

export const metadata = {
  title: "Surat - Dashboard",
};

const AdminHomePage = async () => {
  // const session = await auth();
  // const user = await getUserByName(session?.user?.name);
  // if (!user) {
  //   return redirect("/");
  // } else if (!user.isAdmin) {
  //   return redirect("/user");
  // }

  // const requestedSuratCount = await countAllRequestedSurat();
  // const confirmedSuratCount = await countAllConfirmedSurat();
  return (
    <div className="flex flex-col justify-between text-neutral-700 h-full">
      <div className="flex flex-col gap-3 h-full">
        <div className="text-4xl font-semibold mb-10">Dashboard</div>
        {/* <div className="flex flex-col sm:flex-row gap-3"> */}
        {/*   <DashboardCard */}
        {/*     href="/admin/requested" */}
        {/*     count={requestedSuratCount} */}
        {/*     icon={<FaEnvelope size={25} />} */}
        {/*   > */}
        {/*     Surat Masuk */}
        {/*   </DashboardCard> */}
        {/*   <DashboardCard */}
        {/*     href="/admin/history" */}
        {/*     count={confirmedSuratCount} */}
        {/*     icon={<FaCheck size={25} />} */}
        {/*   > */}
        {/*     Surat Terkonfirmasi */}
        {/*   </DashboardCard> */}
        {/* </div> */}
      </div>
    </div>
  );
};

export default AdminHomePage;
