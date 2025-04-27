import { generateHexFromString } from "@/shared/lib/formatters/generateHexFromString"
import { cn } from "@/shared/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/shadcn/avatar"

type TProps = {
  userName: string,
  profileImage?: string
}
export const UserAvatar = ({
  userName,
  profileImage
}: TProps) => {
  const avatarBgColor = generateHexFromString(userName)
  return (
    <Avatar
      className={cn(
        'w-[35px] h-[35px]',
        ' sm:w-[50px] sm:h-[50px]'
      )}

    >
      <AvatarImage
        src={profileImage}
        alt="@shadcn"
      />
      <AvatarFallback
        className="text-white border-2 border-white"
        style={{ background: avatarBgColor }}
      >
        {userName.at(0)?.toUpperCase()}
      </AvatarFallback>
    </Avatar>
  )
}
