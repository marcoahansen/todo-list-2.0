"use client";
import { db } from "@/firebase";
import { newTip } from "@/util/newTip";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { FormEvent, useState } from "react";

import { IoMdAdd } from "react-icons/io";

function TaskInput({ user }: User) {
  const [task, setTask] = useState("");

  const createTask = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!task) return;

    const sendTask: Task = {
      task: task,
      createdAt: serverTimestamp(),
      tip: "",
      completed: false,
      user: {
        _id: user?.email!,
        name: user?.name!,
      },
    };
    setTask("");

    const newTask = await addDoc(
      collection(db, "users", user?.email!, "tasks"),
      sendTask
    );
    console.log(sendTask);
    newTip(task, newTask.id, user?.email!);
  };

  return (
    <form
      className="flex items-center justify-between w-[98%] mb-1 bg-[#DEDEDE] p-3 rounded-lg"
      onSubmit={createTask}
    >
      <input
        type="text"
        className="bg-transparent text-[#2d2d2d] focus:outline-none w-full p-1"
        placeholder="Sua tarefa..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
        disabled={!user}
      />
      <button
        type="submit"
        className="bg-[#FE76FF] hover:shadow-lg hover:opacity-90 text-white font-bold p-1 rounded-full disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        <IoMdAdd className="cursor-pointer text-3xl" />
      </button>
    </form>
  );
}

export default TaskInput;
