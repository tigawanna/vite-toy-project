import { Button } from "@/shadcn/ui/button";
import { getFollowers } from "@/state/models/followers/followers";
import { PBUserRecord } from "@/state/models/user/types";
import { pb } from "@/state/pb/config";
import { useQuery } from "@tanstack/react-query";
import { LucideFileWarning, Mail } from "lucide-react";
import Image from "../wrappers/Image";
import { IFollowerRecord } from "@/state/models/followers/types";


interface FollowersProps {
  user: PBUserRecord;
}

export function Followers({ user }: FollowersProps) {

  const query = useQuery({
    queryKey: ["followers"],
    queryFn: () => getFollowers(pb, user.id),
  });


  if (query.isLoading) {
    return (
      <div
        className="w-full h-full flex flex-col items-center justify-center bg-red-900 text-red-300 rounded-lg p-5">
        loading Followers
      </div>
    );
  }

  if (query.error) {
    return (
      <div
        className="w-full h-full flex flex-col items-center justify-center bg-red-900 text-red-300
rounded-lg p-5
">
        error loading Followers {query.error?.message}
      </div>
    );
  }

  if (!query.data || (query.data && query.data.items.length === 0)) {
    return (
      <div
        className="w-full h-full flex flex-col items-center justify-center text-lg
rounded-lg p-5
">
        no Followers
      </div>
    );
  }

  const followers = query.data;
 
  
  
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4">
        
      {followers.items.map((fwr) => {
          const follower = fwr.expand.user_a.id === user.id ? fwr.expand.user_b : fwr.expand.user_a
        return (
          <div
            className="w-full flex flex-col md:flex-row items-center  gap-2 p-2 bg-secondary
            rounded-lg border border-accent shadow" 
            key={follower.id}>
            <Image
             src={follower.avatar}
             alt="avatar"
             className="w-16 h-16 rounded-full "
             height={50}
             width={50}
             />
             <div className="w-fit sm:w-full flex flex-col sm:flex-row justify-between px-5 text-sm">
            <div className="flex flex-col px-3 pl-5">
            <div className="flex gap-1 items-center">@{follower.email} </div>
            <div className="flex gap-1 items-center"><Mail className="h-3 w-3"/>{follower.email} </div>
            </div>
            <div className="flex items-center justify-center">
            <FollowButton follower={fwr} me={user}/>
           </div>
            </div>

          </div>
        );
      })}
    </div>
  );
}


interface FollowButtonProps {
    follower: IFollowerRecord;
    me: PBUserRecord;

}

export function FollowButton({follower,me}:FollowButtonProps){
  const am_user_a  = me.id === follower.user_a

  if(am_user_a){
  // if (follower.user_a_follow_user_b === "no" && follower.user_b_follow_user_a === "yes") {
  //   return (
  //     <Button>follow back</Button>
  //   )
  // }
  
     //  am not following my follower
  if (follower.user_a_follow_user_b === "no") {
    return (
      <Button>follow</Button>
    )
  }
  // if ((follower.user_a_follow_user_b === "yes" && follower.user_b_follow_user_a === "yes")) {
  //   return (
  //     <Button>Unfollow</Button>
  //   )
  // }

  // am following my follower
  if (follower.user_a_follow_user_b === "yes") {
    return (
      <Button>Unfollow</Button>
    )
  }
}else{
    //  am not following my follower and user following me
    // if (follower.user_b_follow_user_a === "no" && follower.user_a_follow_user_b === "yes") {
    //   return (
    //     <Button>follow back</Button>
    //   )
    // }
   //  am not following my follower
    if (follower.user_b_follow_user_a === "no") {
      return (
        <Button>follow back</Button>
      )
    }
    // mutually followig each other
    // if ((follower.user_b_follow_user_a === "yes" && follower.user_a_follow_user_b === "yes")) {
    //   return (
    //     <Button>Unfollow</Button>
    //   )
    // }

    // am following my follower
    if (follower.user_b_follow_user_a === "yes") {
      return (
        <Button>Unfollow</Button>
      )
    }
}


return (
 <div className='w-full h-full flex items-center justify-center'>
    <LucideFileWarning className="h-3 w-3 text-red-600"/>
 </div>
);
}
