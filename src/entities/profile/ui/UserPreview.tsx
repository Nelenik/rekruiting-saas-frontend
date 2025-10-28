import { TUser } from "@/shared/api/types";
import { cn } from "@/shared/lib/utils";
import { UserAvatar } from "./UserAvatar";

type TProps = {
  user: TUser
  className?: string,
}
export const UserPreview = ({ user, className }: TProps) => {
  const { name, email, profile_image: image } = user
  return (
    <div className={cn("flex gap-3", className)}>
      <UserAvatar
        userName={name}
        profileImage={image}
        className='w-10 h-10'
      />
      <div>
        <p className="font-semibold">{name}</p>
        <p>{email}</p>
      </div>
    </div>
  );
}