import { useEffect, useRef, RefObject } from "react";

export function useScrollToBottom<T extends HTMLElement>(
  messages: any[]
): [RefObject<T>, RefObject<T>] {
  const containerRef = useRef<T>(null);
  const endRef = useRef<T>(null);

  useEffect(() => {
    const container = containerRef.current;
    const end = endRef.current;
    if (container && end) {
      const observer = new MutationObserver(() => {
        end.scrollIntoView({ behavior: "instant", block: "end" });
      });

      observer.observe(container, {
        childList: true,
        subtree: true,
        attributes: true,
        characterData: true,
      });

      end.scrollIntoView({ behavior: "smooth", block: "end" });

      return () => observer.disconnect();
    }
  }, [messages]);

  return [containerRef, endRef];
}
