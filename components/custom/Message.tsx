"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

import { BotIcon, UserIcon } from "./icons";
import { Markdown } from "./markdown";

export const Message = ({
  role,
  content,
}: {
  role: string;
  content: string | ReactNode;
}) => {
  return (
    <motion.div
      className={`flex flex-row gap-4 py-2 w-full md:px-0 first-of-type:pt-6`}
      initial={{ y: 5, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      <div className="size-[24px] flex flex-col justify-center items-center shrink-0 text-zinc-400">
        {role === "assistant" ? <BotIcon /> : <UserIcon />}
      </div>

      <div className="flex flex-col gap-2 w-full">
        {content && (
          <div className="text-white flex flex-col gap-4">
            <Markdown>{content as string}</Markdown>
          </div>
        )}
      </div>
    </motion.div>
  );
};
