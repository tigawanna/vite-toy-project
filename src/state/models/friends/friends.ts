import { PB } from "@/state/pb/config";
import { FollowUserMutaionProps, FriendRecord } from "./types";


export async function getFollowing(pb: PB, user_id: string) {
    // console.log("user id  == ",user_id)
    try {
        const resultList = await pb.collection('friends').getList<FriendRecord>(1, 20, {
            filter: `
            user_a.id="${user_id}"&&user_a_follow_user_b="yes"
            ||
            user_b.id="${user_id}"&&user_b_follow_user_a="yes"`,
            expand: 'user_a,user_b',
        });

        return resultList;
    } catch (error: any) {
        console.log("error getting following", error);
        // return new Error(error);
        throw error

    }
}


export async function getFollowers(pb: PB, user_id: string) {
    // console.log("user id  == ",user_id)
    try {
        const resultList = await pb.collection('friends').getList<FriendRecord>(1, 20, {
            filter: `
            user_a.id="${user_id}"&&user_b_follow_user_a="yes"
            ||
            user_b.id="${user_id}"&&user_a_follow_user_b="yes"`,
            expand: 'user_a,user_b',
        });

        return resultList;
    } catch (error: any) {
        console.log("error getting followers", error);
        // return new Error(error);
        throw error

    }
}


export async function followUser({pb,user_a,user_b}: FollowUserMutaionProps) {
    try {
        const new_friend = await pb.collection('friend').create({
            user_a,
            user_b,
            user_a_follow_user_b: "yes",
            user_b_follow_user_a: "no",

        });
    if(new_friend instanceof Error){
         console.log("error getting ceaing new friend",new_friend)

    }

    } catch (error: any) {
        console.log(`error following user: ${user_b} `, error);
        return new Error(error);

    }

}
