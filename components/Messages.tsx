import { Message } from "ai";
import Markdown from "react-markdown";
import { Message as ChatMessage } from "./custom/Message";

interface ContentProps {
  isLoading: boolean;
  messages: Message[];
}

export default function Messages({ isLoading, messages }: ContentProps) {
  return isLoading ? (
    <div className="mt-8 flex flex-col gap-y-2">
      <div className="h-[30px] animate-pulse bg-black/10" />
      <div className="h-[30px] animate-pulse bg-black/10" />
      <div className="h-[30px] animate-pulse bg-black/10" />
    </div>
  ) : (
    <div className="h-[calc(100%-130px)] mb-10 my-4 overflow-y-scroll">
      {messages.map(({ id, content, role }) => (
        <ChatMessage key={id} content={content} role={role} />
      ))}
    </div>
  );
}
