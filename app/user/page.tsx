import CreateForm from "@/components/user/CreateForm";
import { auth } from "@/auth";
import { getUserByName } from "../lib/actions";
import { redirect } from "next/navigation";

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
    <div className="flex flex-col justify-between text-neutral-700 h-full">
      <div className="flex flex-col gap-3 h-full">
        <div className="text-4xl font-semibold mb-10">Buat Surat Baru</div>
        <CreateForm authorId={user.id} />
      </div>
    </div>
  );
};

export default UserHomePage;
