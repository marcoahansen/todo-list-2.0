import openai from "./chatgpt";

const query = async (prompt: string) => {
  const res = await openai
    .createCompletion({
      model: "text-davinci-003",
      prompt,
      temperature: 0.6,
      top_p: 1,
      max_tokens: 500,
      frequency_penalty: 0,
      presence_penalty: 0,
    })
    .then((res) => res.data.choices[0].text)
    .catch(
      (err) =>
        `ChatGPT não conseguiu criar uma dica para essa tarefa =( (Error: ${err.message}`
    );

  return res;
};

export default query;
