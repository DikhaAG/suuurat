import { useCallback } from "react";
interface UserCardInterface {
  children: React.ReactNode;
  name: string | null | undefined;
  auth: string;
}
const UserCard = ({ children, name, auth }: UserCardInterface) => {
  return (
    <>
      <div className="">{children}</div>
      <div className="flex flex-col">
        <div className="text-md">{name}</div>
        <div className="px-2.5 pb-0.5 bg-blue-400 text-center rounded-xl text-sm text-white">
          {auth}
        </div>
      </div>
    </>
  );
};
export default UserCard;
