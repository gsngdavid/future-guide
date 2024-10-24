import { Message } from "ai";
import { Message as ChatMessage } from "./custom/Message";
import { useScrollToBottom } from "../hooks/use-scroll-to-bottom";
import { useEffect } from "react";

interface ContentProps {
  isLoading: boolean;
  messages: Message[];
}

export default function Messages({ isLoading, messages }: ContentProps) {
  const [messagesContainerRef, messagesEndRef] =
    useScrollToBottom<HTMLDivElement>(messages, isLoading);

  return isLoading ? (
    <div className="mt-8 flex flex-col gap-y-2">
      <div className="h-[30px] animate-pulse bg-black/10" />
      <div className="h-[30px] animate-pulse bg-black/10" />
      <div className="h-[30px] animate-pulse bg-black/10" />
    </div>
  ) : (
    <div className="h-[calc(100%-130px)] mb-10 my-4 overflow-y-scroll pr-7">
      <div ref={messagesContainerRef}>
        {messages.map(({ id, content, role }) => (
          <ChatMessage key={id} content={content} role={role} />
        ))}
        <div
          ref={messagesEndRef}
          className="shrink-0 min-w-[24px] min-h-[24px]"
        />
      </div>
    </div>
  );
}
