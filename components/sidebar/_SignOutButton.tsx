import Link from "next/link";
import { IoLogOutOutline } from "react-icons/io5";

const SignOutButton = () => {
  return (
    <Link href="/api/auth/signout">
    <div className="px-2 pt-1 rounded-md bg-neutral-100 content-center">
      <button
        type="button"
        className="btn text-red-500"
      >
        <IoLogOutOutline size={30} />
      </button>
    </div>

    </Link>
  );
};

export default SignOutButton;
