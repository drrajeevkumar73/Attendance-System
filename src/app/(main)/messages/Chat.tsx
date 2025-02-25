"use client";

import { Loader2 } from "lucide-react";
import useInitializeChatClient from "./useIntialzeChatClient";
import { Chat as StremChat } from "stream-chat-react";
import ChatSidebar from "./ChatSidebar";
import ChatChannel from "./ChatChannel";
import { useTheme } from "next-themes";

export default function Chat() {
  const chaltClient = useInitializeChatClient();
  const { resolvedTheme } = useTheme();
  if (!chaltClient) {
    return <Loader2 className="mx-auto my-3 animate-spin" />;
  }
  return (
    <main className="relative w-full overflow-hidden rounded-2xl bg-card shadow-sm min-h-screen">
      <div className="absolute bottom-0 top-0 flex w-full">
        <StremChat
          client={chaltClient}
          theme={
            resolvedTheme === "dark"
              ? "str-chat__theme-dark"
              : "str-chat__theme-light"
          }
        >
          <ChatSidebar />
          <ChatChannel />
        </StremChat>
      </div>
    </main>
  );
}
