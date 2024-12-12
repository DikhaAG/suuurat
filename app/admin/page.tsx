export const metadata = {
  title: "Admin - Dashboard",
};

const AdminHomePage = async () => {
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
