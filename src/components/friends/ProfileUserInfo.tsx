
import { Button } from "@/shadcn/ui/button";
import { PBUserRecord } from "@/state/user";
import { relativeDate } from "@/state/utils/date";
import { Mail } from "lucide-react";
import Image from "../wrappers/Image";
import { DialogWrapper } from "../dialog/DialodWrapper";
import { Icons } from "../wrappers/icons";


interface ProfileUserInfoProps {
  data: PBUserRecord | Error;
  logged_in_user: PBUserRecord
}

export function ProfileUserInfo({ data,logged_in_user }: ProfileUserInfoProps) {

  const profile_user = data;
  return (
    <div
      className="w-full flex flex-col md:flex-row items-center justify-center bg-secondary p-5 gap-5 
        border border-secondary-foreground shadow shadow-accent-foreground"
    >
      <div className="md:w-[35%] w-[90%] p-2 h-full flex items-center justify-center rounded-2xl">
        {profile_user.avatar !== "" && (
          <Image
            src={profile_user.avatar}
            alt="user image"
            height={250}
            width={250}
            className="rounded-full h-auto  aspect-square object-cover flex items-center justify-center"
          />
        )}
      </div>

      <div className="w-full h-full flex flex-col items-cente justify-center text-sm ">
        <h1> @{profile_user.username}</h1>
        {profile_user.email !== "" && (
          <h2 className="flex gap-2 items-center">
            <Mail className="h-4 w-4" />
            {profile_user.email}
          </h2>
        )}
        {profile_user.github_login !== "" && (
          <h2 className="flex gap-2  items-center">
            <Icons.gitHub size={5} className="h-4 w-4" />
            {profile_user.github_login}
          </h2>
        )}
        <h2>joined: {relativeDate(profile_user.created)}</h2>
        <p className="border-t my-1 py-2 ">bio: {profile_user.bio}</p>
      </div>
      {
<Button  className="border bg-accent hover:border-accent-foreground hover:text-accent-foreground">Follow</Button>
      }
    


    </div>
  );
}
