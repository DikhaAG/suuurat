
import { signOut } from "@/auth";
import { IoLogOutOutline } from "react-icons/io5";

const SignOutButton = () => {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <button type="submit" className="btn text-red-500">
        <IoLogOutOutline size={30} />
      </button>
    </form>
  );
};

export default SignOutButton