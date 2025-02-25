import { useAppSelector } from "@/lib/hooks";
import React from "react";
import { ChannelList } from "stream-chat-react";

export default function ChatSidebar() {
  const { user } = useAppSelector((state) => state.loginlice);
  if (!user) throw new Error("User is not logged in");
  return (
    <div className="border-r-1 flex size-full h-full flex-col md:w-72">
      <ChannelList
        filters={{
          type: "messaging",
          members: { $in: [user.id] },
        }}
        showChannelSearch
        options={{ state: true, presence: true, limit: 8 }}
        sort={{ last_message_at: -1 }}
        additionalChannelSearchProps={{
          searchForChannels: true,
          searchQueryParams: {
            channelFilters: {
              filters: {
                members: { $in: [user.id] },
              },
            },
          },
        }}
      />
    </div>
  );
}
