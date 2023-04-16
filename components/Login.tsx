"use client";
import { AiOutlineGoogle } from "react-icons/ai";
import { FaLightbulb } from "react-icons/fa";
import { signIn } from "next-auth/react";

function Login() {
  return (
    <div className=" w-[97%] md:max-w-[500px] flex flex-col items-center justify-center gap-16 bg-[#515151] p-20 rounded-lg shadow-lg">
      <div className="flex flex-col items-center justify-center font-extrabold text-3xl md:text-5xl gap-5 ">
        <FaLightbulb className="text-[#FE76FF] text-8xl animate-bounce" />
        <h1>ToDo List 2.0</h1>
      </div>
      <button
        onClick={() => signIn("google")}
        className="text-md flex items-center justify-center text-center md:text-xl font-medium gap-2 bg-[#FE76FF] px-6 py-2 rounded-lg hover:shadow-lg text-white"
      >
        <AiOutlineGoogle className="w-7 h-7" />
        <p>Sign with google</p>
      </button>
    </div>
  );
}

export default Login;
