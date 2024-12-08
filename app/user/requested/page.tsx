import { getUserByName } from "@/app/lib/actions";
import { auth } from "@/auth";
import RequestedTable from "@/components/user/requested/RequestedTable";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Surat - Menunggu Persetujuan",
};
const UserRequestedPage = async () => {
  const session = await auth();
  const user = await getUserByName(session?.user?.name);
  if (!user) {
    return redirect("/");
  } else if (user.role === "ADMIN") {
    return redirect("/admin");
  } else if (user.role === "VALIDATOR") {
    return redirect("/validator");
  }
  return (
    <div className="flex flex-col justify-between text-neutral-700 h-full">
      <div className="flex flex-col gap-3 h-full">
        <div className="text-4xl font-semibold mb-10">Menunggu Persetujuan</div>
        <div className="h-full">
          <RequestedTable user={user} />
        </div>
      </div>
    </div>
  );
};

export default UserRequestedPage;
