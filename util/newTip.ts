export const newTip = async (task: string, taskId: any, user: string) => {
  const input = task.trim();
  await fetch("/api/createTip", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt: `me dê uma dica de como ${input}`,
      taskId,
      user,
    }),
  });
};
