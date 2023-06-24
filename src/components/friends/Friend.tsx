import { FriendRecord } from "@/state/models/friends/types";
import Image from "../wrappers/Image";
import { PBUserRecord } from "@/state/user";
import { LucideFileWarning, Mail } from "lucide-react";
import { Button } from "shadcn-fe-ui";
import { AsyncButton } from "../wrappers/AsyncButton";
import { useMutation } from "@tanstack/react-query";
import { followUser } from "@/state/models/friends/friends";
import { pb } from "@/state/pb/config";

interface FriendProps {
    friend:FriendRecord;
    me:PBUserRecord
}

export function Friend({friend,me}:FriendProps){
const am_user_a = friend.user_a === me.id;
const profile = am_user_a ? friend.expand.user_b : friend.expand.user_a;

return (
    <div className="w-full flex items-center  gap-2 p-2 bg-secondary
            rounded-lg border border-accent shadow">

        <div className="w-[30%]   h-full flex items-center justify-center rounded-2xl">
            {profile.avatar !== "" && (
                <Image
                    src={profile.avatar}
                    alt="user image"
                    height={50}
                    width={50}
                    className="rounded-full h-auto  
                                aspect-square object-cover flex items-center justify-center"
                />
            )}
        </div>

        <div className="w-full h-full flex flex-col items-cente justify-center text-xs gap-1">
            <h1> @{profile.username}</h1>
            {profile.email !== "" && (
                <h2 className="flex gap-2 items-center">
                    <Mail className="h-4 w-4" />
                    {profile.email}
                </h2>
            )}

            {/* <h2>joined: {relativeDate(profile.created)}</h2> */}
            </div>
            <div className="text-red-400">
                 <FollowButton follower={friend} me={me}/>
            </div>
    </div>
);
}


interface FollowButtonProps {
    follower: FriendRecord;
    me: PBUserRecord;

}

export function FollowButton({ follower, me }: FollowButtonProps) {
   const follow_mutation = useMutation({
    mutationFn:()=>followUser(pb,user_a,user_b),
    })
    const am_user_a = me.id === follower.user_a

    if (am_user_a) {
        //  am not following my follower
        if (follower.user_a_follow_user_b === "no") {
            console.log("am not following my follower")
            return (
                <AsyncButton >follow</AsyncButton>
            )
        }
            // am following my follower
        if (follower.user_a_follow_user_b === "yes") {
            console.log("am following my follower")
            return (
                <AsyncButton >Unfollow</AsyncButton>
            )
        }
    } else {

        //  am not following my follower
        if (follower.user_b_follow_user_a === "no") {
            console.log("am not following my follower")
            return (
                <AsyncButton>follow back</AsyncButton>
            )
        }

        // am following my follower
        if (follower.user_b_follow_user_a === "yes") {
            console.log("am following my follower")
            return (
                <AsyncButton >Unfollow</AsyncButton>
            )
        }
    }

        console.log("fall through case  === ",follower)
    return (
        <div className='w-full h-full flex items-center justify-center'>
            <LucideFileWarning className="h-3 w-3 text-red-600" />
        </div>
    );
}
