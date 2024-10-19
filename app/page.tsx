"use client";

import { useChat } from "ai/react";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function Page() {
  const { toast } = useToast();
  const { isSignedIn } = useUser();
  const [disabled, setDisabled] = useState(true);
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
          description: "Added the PDF to AI's knowledge succesfully.",
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
        .finally(() => setDisabled(false));
    }
  }, [isSignedIn]);

  return (
    <div className="mx-auto flex w-full max-w-md flex-col py-8">
      <input
        type="file"
        id="fileInput"
        className="hidden"
        accept="application/pdf"
        onChange={handleChange}
      />
    </div>
  );
}
