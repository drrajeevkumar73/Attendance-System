import { useAppSelector } from "@/lib/hooks";
import axios from "axios";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { StreamChat } from "stream-chat";

export default function useInitializeChatClient() {
  const { user } = useAppSelector((state) => state.loginlice);
  if (!user) throw new Error("User is not logged in");

  const [chatClient, setChatClient] = useState<StreamChat | null>(null);
 
  useEffect(() => {
    const client = StreamChat.getInstance(process.env.NEXT_PUBLIC_STREAM_KEY!);


    const initializeClient = async () => {
      try {
        const { data } = await axios.get("/api/get-token");
        await client.connectUser(
          {
            id: user.id,
            name: user.displayname,
          },
          data.token,
        );
        console.log("Received token:", data);

        setChatClient(client);
      } catch (error) {
        console.error("Error initializing chat client:", error);
      }
    };

    initializeClient();

    return () => {
      setChatClient(null);
      client.disconnectUser();
    };
  }, [user.id, user.displayname]);

  return chatClient;
}
