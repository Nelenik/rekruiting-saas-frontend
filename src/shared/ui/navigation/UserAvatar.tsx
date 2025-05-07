import { generateRgbFromString } from "@/shared/lib/formatters/generateRgbFromString"
import { cn } from "@/shared/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/shadcn/avatar"

type TProps = {
  userName: string,
  profileImage?: string,
  className?: string
}
/**
 * `UserAvatar` is a user interface component that displays a circular avatar.
 * If a profile image is provided, it is shown. Otherwise, a fallback with the user's initial and a generated background color is rendered.
 *
 * The background color is deterministically generated based on the user's name using `generateRgbFromString`.
 * This provides a consistent, personalized fallback color for each user.
 *
 * @param userName - The name of the user. Used for generating the fallback background color and initial letter.
 * @param profileImage - Optional URL of the user's profile image. If not provided, the fallback is used.
 * @param className - Optional additional class names to apply to the avatar container.
 *
 * @example
 * <UserAvatar
 *   userName="Alice"
 *   profileImage="https://example.com/alice.jpg"
 * />
 *
 * <UserAvatar
 *   userName="Bob"
 * />
 */
export const UserAvatar = ({
  userName,
  profileImage,
  className
}: TProps) => {
  const avatarBgColor = generateRgbFromString(userName)
  return (
    <Avatar
      className={cn(
        'w-[35px] h-[35px] border border-transparent  transition duration-300',
        ' md:w-[44px] md:h-[44px]',
        className
      )}

    >
      <AvatarImage
        src={profileImage}
        alt="@shadcn"
      />
      <AvatarFallback
        className="text-white "
        style={{ background: avatarBgColor }}
      >
        {userName.at(0)?.toUpperCase()}
      </AvatarFallback>
    </Avatar>
  )
}
