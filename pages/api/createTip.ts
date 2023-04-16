// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { db } from "@/firebase";
import query from "@/lib/queryApi";
import { doc, updateDoc } from "firebase/firestore";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  tip: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { prompt, taskId, user } = req.body;
  if (!prompt) {
    res.status(400).json({ tip: "Não existe tarefa!" });
    return;
  }
  if (!taskId) {
    res.status(400).json({ tip: "Não existe tarefa!" });
    return;
  }

  const response = await query(prompt);

  const tip =
    response || "ChatGPT não conseguiu criar uma dica para essa tarefa =(";

  await updateDoc(doc(db, "users", user, "tasks", taskId), {
    tip: tip,
  });

  res.status(200).json({ tip: tip });
}
