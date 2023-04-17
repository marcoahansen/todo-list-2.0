"use client";

import { db } from "@/firebase";
import { newTip } from "@/util/newTip";
import {
  collection,
  deleteDoc,
  doc,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { FaLightbulb, FaTrash, FaCheck } from "react-icons/fa";
import {
  AiOutlineClose,
  AiOutlineCloudDownload,
  AiOutlineCheck,
} from "react-icons/ai";
import { HiPencil } from "react-icons/hi";
import { SiOpenai } from "react-icons/si";
import * as Dialog from "@radix-ui/react-dialog";
import * as Checkbox from "@radix-ui/react-checkbox";
import Link from "next/link";

function TaskList({ user }: User) {
  const [editTask, setEditTask] = useState<string | null>(null);
  const [editTaskText, setEditTaskText] = useState<string>("");

  const [tasks, loading] = useCollection(
    query(
      collection(db, "users", user?.email!, "tasks"),
      orderBy("createdAt", "desc")
    )
  );

  useEffect(() => {
    if (editTask != null) {
      const editingTask = tasks?.docs.find((task) => task.id === editTask);
      setEditTaskText(editingTask?.data().task);
    }
  }, [editTask]);

  const saveEditTask = async (taskId: any) => {
    await updateDoc(doc(db, "users", user?.email!, "tasks", taskId), {
      task: editTaskText,
      tip: "",
    });
    newTip(editTaskText, taskId, user?.email!);
    setEditTaskText("");
    setEditTask(null);
  };

  const completeTask = async (task: any) => {
    const isTaskCompleted = task.data().completed;
    if (isTaskCompleted) {
      await updateDoc(doc(db, "users", user?.email!, "tasks", task.id), {
        completed: false,
      });
    } else {
      await updateDoc(doc(db, "users", user?.email!, "tasks", task.id), {
        completed: true,
      });
    }
  };

  const removeTask = async (taskId: any) => {
    await deleteDoc(doc(db, "users", user?.email!, "tasks", taskId));
  };
  return (
    <div className="max-h-[50vh] overflow-y-auto w-full overflowList">
      {tasks?.empty && <p>nenhuma tarefa cadastrada</p>}
      {loading && (
        <div className="animate-pulse text-center flex flex-col items-center justify-center mt-4">
          <AiOutlineCloudDownload className="w-16 h-16 text-[#FE76FF]" />
          <p>Carregando as suas tarefas...</p>
        </div>
      )}
      {tasks?.docs.map((task) => (
        <div
          key={task.id}
          className={`flex items-center justify-between w-[98%] bg-[#2D2D2D] ${
            task.data().completed && "line-through opacity-60"
          } p-3 rounded-lg gap-1 mb-[0.35rem]`}
        >
          <Checkbox.Root
            checked={task.data().completed}
            onCheckedChange={() => completeTask(task)}
            className="group focus:outline-none"
          >
            <div className="h-6 w-6 rounded-md flex items-center justify-center bg-[#515151] group-data-[state=checked]:bg-[#FE76FF]  transition-colors">
              <Checkbox.Indicator>
                <AiOutlineCheck className="text-white" />
              </Checkbox.Indicator>
            </div>
          </Checkbox.Root>
          {editTask && task.id === editTask ? (
            <input
              type="text"
              className="h-10 bg-[#3b3b3b] p-1 rounded-lg focus:outline-none flex-1"
              value={editTaskText}
              onChange={(e) => setEditTaskText(e.target.value)}
              disabled={!user}
            />
          ) : (
            <div className="h-10 flex items-center flex-1 p-1">
              <p className="text-justify">{task.data().task}</p>
            </div>
          )}
          <div className="flex items-center justify-between gap-2 text-[#DEDEDE]">
            {!task.data().tip ? (
              <FaLightbulb className="text-[#FE76FF]  w-6 h-6  opacity-20 animate-pulse" />
            ) : (
              <Dialog.Root>
                <Dialog.Trigger
                  disabled={task.data().completed}
                  type="button"
                  className="focus:outline-none disabled:cursor-not-allowed"
                >
                  <FaLightbulb className="text-[#FE76FF] w-6 h-6 hover:text-[#ffa1ff] transition-all " />
                </Dialog.Trigger>
                <Dialog.Portal>
                  <Dialog.Overlay className="w-screen h-screen bg-black/40 fixed inset-0" />
                  <Dialog.Content className="absolute p-5 bg-[#515151] rounded-xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[94%] md:max-w-[470px] ">
                    <Dialog.Close className="absolute p-1 focus:outline-none  right-4 top-4 rounded-full cursor-pointer bg-[#FE76FF] hover:bg-[#ffa1ff]">
                      <AiOutlineClose className=" text-white" />
                    </Dialog.Close>
                    <Dialog.Title className="flex flex-col items-center justify-center gap-3 text-xl  text-center text-white leading-tight mb-3">
                      <FaLightbulb className="text-[#FE76FF] w-11 h-11 animate-bounce" />
                      <p className="max-w-sm">
                        Essa é uma dica para você realizar sua tarefa!
                      </p>
                    </Dialog.Title>
                    <div className="p-3 bg-[#2D2D2D] rounded-xl text-sm text-justify">
                      <p>{task.data().tip}</p>
                    </div>
                    <div className="flex items-center justify-center gap-2 mt-4">
                      <p className="text-sm text-center">
                        Essa dica foi criada pelo ChatGPT
                      </p>
                      <Link target="blank" href="https://chat.openai.com/">
                        <SiOpenai className="hover:text-[#FE76FF]" />
                      </Link>
                    </div>
                  </Dialog.Content>
                </Dialog.Portal>
              </Dialog.Root>
            )}
            {editTask && task.id === editTask ? (
              <FaCheck
                onClick={() => saveEditTask(task.id)}
                className="w-7 h-7 text-[#FE76FF] cursor-pointer hover:text-[#ffa1ff] transition-all"
              />
            ) : (
              <button
                onClick={() => setEditTask(task.id)}
                disabled={task.data().completed}
                className="focus:outline-none disabled:cursor-not-allowed"
              >
                <HiPencil
                  className="w-7 h-7
                  hover:text-[#FFF] transition-all"
                />
              </button>
            )}

            <FaTrash
              onClick={() => removeTask(task.id)}
              className="hover:text-red-600 transition-all w-6 h-6 cursor-pointer"
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default TaskList;
