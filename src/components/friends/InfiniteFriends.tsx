import { QueryVariables, getPbPaginatedFriends } from "@/state/models/friends/custom_friends";
import { pb } from "@/state/pb/config";
import { UseInfiniteQueryResult, UseQueryResult, useInfiniteQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { Friend } from "./Friend";
import { PBUserRecord } from "@/state/user";

interface InfiniteFriendsProps {
  user: PBUserRecord;
  logged_in: PBUserRecord;
  type: "following" | "followers";
}

export function InfiniteFriends({ type, user, logged_in }: InfiniteFriendsProps) {
  const currentdate = dayjs(new Date()).format("YYYY-MM-DDTHH:mm:ssZ[Z]");

  const params: QueryVariables = {
    created: currentdate,
    limit: "5",
    logged_in: logged_in.id,
    type,
    user_id: user.id,
  };
  const query_key = [`custom_${type}`, params];
  const query = useInfiniteQuery({
    queryKey: query_key,
    queryFn: ({ queryKey, pageParam }) => getPbPaginatedFriends(pb, params, pageParam),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage && lastPage[lastPage.length - 1]) {
        return {
          created: lastPage[lastPage?.length - 1]?.created,
          id: lastPage[lastPage?.length - 1]?.friendship_id,
        };
      }
      return;
    },

    defaultPageParam: {
      created: currentdate,
      id: "",
    },
    // enabled:false
  });

  if (query.isPending) {
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
console.log(query.data)
  return (
    <div className="w-full h-full flex items-center justify-center animate-in fade-in">
      {query.data &&
        query.data.pages.map((page, idx) => {
          return (
            <div key={idx} className="flex flex-col gap-2 items-center justify-center">
              {page.map((profile) => {
                return <Friend friend={profile} me={user} key={profile.friendship_id} />;
              })}
            </div>
          );
        })}
    </div>
  );
}

function handleQueryStates(query: UseInfiniteQueryResult<any> | UseQueryResult<any>) {
  if (query.isPending) {
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
}
