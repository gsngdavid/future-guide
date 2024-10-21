import { Message } from "ai";
import Markdown from "react-markdown";

interface ContentProps {
  isDisabled: boolean;
  messages: Message[];
}

export default function Messages({ isDisabled, messages }: ContentProps) {
  // {isSignedIn && disabled && (

  //   )}

  //   {isSignedIn &&
  //     !disabled &&
  //     )}
  return isDisabled ? (
    <div className="mt-8 flex flex-col gap-y-2">
      <div className="h-[30px] animate-pulse bg-black/10" />
      <div className="h-[30px] animate-pulse bg-black/10" />
      <div className="h-[30px] animate-pulse bg-black/10" />
    </div>
  ) : (
    messages.map(({ content }, idx) => (
      // <MemoizedMD key={idx} message={content} />
      <Markdown key={idx}>{content}</Markdown>
    ))
  );
}
