"use client";

import { signOut } from "next-auth/react";
import { ImExit } from "react-icons/im";

function User({ user }: User) {
  return (
    <div className=" w-[97%] flex items-center justify-between md:max-w-[500px] bg-[#515151] p-4 rounded-lg shadow-lg text-lg ">
      <div className="flex items-center gap-3">
        <img
          src={user?.image! || `https://ui-avatars.com/api/?name=${user?.name}`}
          alt="profile picture"
          className="h-11 w-11 rounded-full"
        />
        <p>Olá, {user?.name}!</p>
      </div>
      <ImExit
        onClick={() => signOut()}
        className=" cursor-pointer text-[#FE76FF] text-3xl hover:opacity-70"
      />
    </div>
  );
}

export default User;
