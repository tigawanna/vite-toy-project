import { PBUserRecord } from "@/state/user"

export interface IFollowerRecord {
    collectionId: string
    collectionName: string
    created: string
    expand: Expand
    id: string
    updated: string
    user_a: string
    user_a_follow_user_b: string
    user_b: string
    user_b_follow_user_a: string
}

export interface Expand {
    user_a:PBUserRecord
    user_b:PBUserRecord
}


