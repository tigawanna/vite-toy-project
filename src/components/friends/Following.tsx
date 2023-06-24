import { pb } from "@/state/pb/config";
import { useQuery } from "@tanstack/react-query";
import { PBUserRecord } from "@/state/user";
import { getFollowing } from "@/state/models/friends/friends";
import { Friend } from "./Friend";

interface FollowingProps {
  user: PBUserRecord;
}

export function Following({ user }: FollowingProps) {
  const query = useQuery({
    queryKey: ["following"],
    queryFn: () => getFollowing(pb, user.id),
  });

  if (query.isLoading) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-red-900 text-red-300 rounded-lg p-5">
        loading following
      </div>
    );
  }

  if (query.error) {
    return (
      <div
        className="w-full h-full flex flex-col items-center justify-center bg-red-900 text-red-300
rounded-lg p-5
">
        error loading following {query.error?.message}
      </div>
    );
  }

  if (!query.data) {
    return (
      <div
        className="w-full h-full flex flex-col items-center justify-center text-lg
rounded-lg p-5
">
        no following
      </div>
    );
  }

  const following = query.data.items;
  // console.log(query.data)
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4 gap-1">
      <div className="text-xl font-bold">Following</div>

      {following.map((profile) => {
        return <Friend friend={profile} me={user} />;
      })}
    </div>
  );
}
