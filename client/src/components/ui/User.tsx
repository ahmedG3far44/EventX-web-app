import type { UserType } from "@/contexts/AuthProvider";

const User = ({ user }: { user: UserType }) => {
  return (
    <div className="flex items-center space-x-2">
      <img
        className={"w-8 h-8 rounded-full overflow-hidden object-center bg-zinc-400"}
        src={user.profileImage}
        alt=""
      />
      <h2 className="text-sm">{user.name}</h2>
    </div>
  );
};

export default User;
