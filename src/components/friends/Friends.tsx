import { Button } from "@/shadcn/ui/button";
import { getFollowers } from "@/state/models/followers/followers";
import { PBUserRecord } from "@/state/models/user/types";
import { pb } from "@/state/pb/config";
import { useQuery } from "@tanstack/react-query";
import { LucideFileWarning, Mail } from "lucide-react";
import Image from "../wrappers/Image";
import { IFriendRecord } from "@/state/models/followers/types";

interface FriendsProps {
  user: PBUserRecord;
}

export function Friends({ user }: FriendsProps) {

  const query = useQuery({
    queryKey: ["freinds"],
    queryFn: () => getFollowers(pb, user.id),
  });


  if (query.isLoading) {
    return (
      <div
        className="w-full h-full flex flex-col items-center justify-center bg-red-900 text-red-300
rounded-lg p-5
">
        loading friends
      </div>
    );
  }

  if (query.error) {
    return (
      <div
        className="w-full h-full flex flex-col items-center justify-center bg-red-900 text-red-300
rounded-lg p-5
">
        error loading friends {query.error?.message}
      </div>
    );
  }

  if (!query.data || (query.data && query.data.items.length === 0)) {
    return (
      <div
        className="w-full h-full flex flex-col items-center justify-center text-lg
rounded-lg p-5
">
        no friends
      </div>
    );
  }

  const freinds = query.data;
  console.log("freilnds  === ",freinds.items)
  
  
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4">
        
      {freinds.items.map((friend) => {
        return (
          <div
            className="w-full flex flex-col md:flex-row items-center  gap-2 p-2 bg-secondary
            rounded-lg border border-accent shadow" 
            key={friend.id}>
            <Image
             src={friend.expand.user_b.avatar}
             alt="avatar"
             className="w-16 h-16 rounded-full "
             height={50}
             width={50}
             />
             <div className="w-fit sm:w-full flex flex-col sm:flex-row justify-between px-5 text-sm">
            <div className="flex flex-col px-3 pl-5">
            <div className="flex gap-1 items-center">@{friend.expand.user_b.username} </div>
            <div className="flex gap-1 items-center"><Mail className="h-3 w-3"/>{friend.expand.user_b.email} </div>
            </div>
            <div className="flex items-center justify-center">
            <FollowButton friend={friend} />
           </div>
            </div>

          </div>
        );
      })}
    </div>
  );
}


interface FollowButtonProps {
    friend: IFriendRecord
}

export function FollowButton({friend}:FollowButtonProps){
    if (friend.user_a_follow_user_b === "no" && friend.user_b_follow_user_a === "yes"){
        return(
            <Button>follow back</Button>
        )
    }
    if (friend.user_a_follow_user_b === "no"){
        return(
            <Button>follow</Button>
        )
    }
    if ((friend.user_a_follow_user_b === "yes" && friend.user_b_follow_user_a === "yes")){
        return(
                <Button>Unfollow</Button>
        )
    }
    if(friend.user_a_follow_user_b === "yes"){
        return(
            <Button>Unfollow</Button>
    )
    }
return (
 <div className='w-full h-full flex items-center justify-center'>
    <LucideFileWarning className="h-3 w-3 text-red-600"/>
 </div>
);
}
