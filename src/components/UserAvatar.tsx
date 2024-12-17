import Image from "next/image";
import avatarPlaceholder from "@/assets/avatar-placeholder.png"
import { cn } from "@/lib/utils";

interface UserAvatarUrl {
    avatarUrl: string | null | undefined;
    size?: number;
    className?: string;
  }
  

export default function UserAvatar({avatarUrl,size,className}:UserAvatarUrl) {
  return (
    <Image
    src={avatarUrl || avatarPlaceholder}
    alt="avatarUrl not found"
    width={size ?? 48}
    height={size ?? 48}
    className={cn(
      "aspect-square h-fit flex-none rounded-full bg-secondary object-cover",
      className,
    )}/>
  )
}
