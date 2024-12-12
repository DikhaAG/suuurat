import { auth } from "@/auth";
import { getUserByName } from "@/app/lib/actions/userActions";
import { redirect } from "next/navigation";
import CreateSuratForm from "@/components/user/create-surat-form";

export const metadata = {
  title: "Surat - Buat Baru",
};

const UserHomePage = async () => {
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
    <>
      <div className="flex flex-col gap-3">
        <div className="text-4xl font-semibold mb-10">Buat Surat Baru</div>
        <div className="container">
          <CreateSuratForm userData={user} />
        </div>
      </div>
    </>
  );
};

export default UserHomePage;
