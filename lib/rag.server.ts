import { openai, RAGChat,  } from "@upstash/rag-chat";

export default new RAGChat({
  model: openai("gpt-3.5-turbo-0125"),

  promptFn: ({ context, question, chatHistory }) =>
    `You are FutureGuide, an AI career coach with access to an Upstash Vector Store. 
  Be supportive and provide as much career advice as possible using the provided context and chat history.
  If the answer isn't available, politely inform the user.
  ------
  Chat history:
  ${chatHistory}
  ------
  Context:
  ${context}
  ------
  Question: ${question}
  Answer:`,
});
