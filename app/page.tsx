"use client";

import { useChat } from "ai/react";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Upload } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Messages from "../components/Messages";

export default function Page() {
  const { toast } = useToast();
  const { isSignedIn } = useUser();
  const [isLoading, setIsLoading] = useState(true);
  const { messages, input, handleInputChange, handleSubmit, setMessages } =
    useChat();

  function handleChange() {
    const fileInput = document.getElementById("fileInput") as HTMLInputElement;

    if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
      toast({
        duration: 2000,
        variant: "destructive",
        description: "No file attached.",
      });
      return;
    }
    const fileData = fileInput.files[0];
    const formData = new FormData();
    formData.append("file", fileData);
    const loadingToast = toast({
      duration: 10000,
      description: "Adding your PDF to AI's knowledge...",
    });
    fetch("/api/upsert", {
      method: "POST",
      body: formData,
    }).then((res) => {
      loadingToast.dismiss();
      if (res.ok) {
        toast({
          duration: 2000,
          description: "Added the PDF to AI's knowledge successfully.",
        });
      } else {
        toast({
          duration: 2000,
          variant: "destructive",
          description: "Failed to add the PDF to AI's knowledge.",
        });
      }
    });
  }

  useEffect(() => {
    if (isSignedIn) {
      fetch("/api/chat/history")
        .then((res) => res.json())
        .then((res) => {
          if (res?.messages?.length > 0) setMessages(res.messages);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => setIsLoading(false));
    }
  }, [isSignedIn]);

  return (
    <main className="w-full h-screen max-w-2xl mx-auto flex flex-col justify-center py-8 overflow-hidden">
      {isSignedIn && (
        <>
          <input
            type="file"
            id="fileInput"
            className="hidden"
            accept="application/pdf"
            onChange={handleChange}
          />

          <div className="flex flex-row items-start justify-between">
            <h1 className="text-xl font-semibold bg-gradient-to-r from-orange-600 via-indigo-500 to-slate-400 text-transparent bg-clip-text">
              FutureGuide
            </h1>
            <SignedIn>
              <div className="size-[28px] rounded-full bg-black/10">
                <UserButton />
              </div>
            </SignedIn>
          </div>

          <Messages isLoading={isLoading} messages={messages} />
          <div className="flex w-full px-10 items-center shadow">
            <div className="cursor-pointer border bg-white px-2 py-1 pt-2 text-gray-400 hover:text-gray-800">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger
                    onClick={() => {
                      const tmp = document.querySelector(
                        `[id="fileInput"]`
                      ) as HTMLInputElement;
                      tmp?.click();
                    }}
                  >
                    <Upload className="size-[21px]" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <span>Upload Resume</span>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Input
              value={input}
              disabled={isLoading}
              className="!rounded-none"
              onChange={handleInputChange}
              placeholder="Ask something..."
              onKeyDown={(e) => {
                if (e.key.toLowerCase() == "enter") handleSubmit();
              }}
            />
          </div>
        </>
      )}

      {!isSignedIn && (
        <div className="flex flex-col items-center text-white">
          <h1 className="w-max text-3xl text-center flex gap-2">
            Welcome to
            <span className="w-max">
              <span className="block bg-gradient-to-r from-orange-600 via-indigo-500 to-slate-400 text-transparent bg-clip-text animate-typing overflow-hidden whitespace-nowrap border-r-4 border-r-white pr-5 font-bold">
                FutureGuide
              </span>
            </span>
          </h1>
          <div className="mt-8 ">
            <SignedOut>
              <div className="flex gap-10">
                <SignInButton mode="modal">
                  <span className="auth-button">Sign in</span>
                </SignInButton>
                <SignUpButton mode="modal">
                  <span className="auth-button">Sign up</span>
                </SignUpButton>
              </div>
            </SignedOut>
          </div>
        </div>
      )}
    </main>
  );
}
