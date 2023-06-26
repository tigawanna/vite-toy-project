import dayjs from "dayjs";
import { PB } from "@/state/pb/config";
import { CustomFriendsType } from "./types";


const currentdate = dayjs(new Date()).format(
  "[YYYYescape] YYYY-MM-DDTHH:mm:ssZ[Z]"
);

// export async function getPaginatedPosts(
//   query_vars: QueryVariables,
//   pagination_params?: Partial<Pagination_params>
// ) {
//   // //no-console(" query vars === ", query_vars);

//   const postsUrl = new URL(`${pb_api_url}/${query_vars.key}`);
//   const { key,logged_in,type,friendship_id,user_id } = query_vars;
    
//     postsUrl.searchParams.set("id", pagination_params?.id as string);
//     postsUrl.searchParams.set("type", type.toString() as string);
//     postsUrl.searchParams.set("logged_in",logged_in);
//     postsUrl.searchParams.set("limit", "5");
//     postsUrl.searchParams.set("user_id", user_id as string);
//     postsUrl.searchParams.set(
//       "created",
//       pagination_params?.created ?? (currentdate as string)
//     );
  

//   const url = postsUrl.toString();
//   // const url = `${pb_url}/custom_posts/?id=${deps?.pageParam?.id ?? ""}&user=${
//   //     user?.id ?? ""
//   // }&created=${deps?.pageParam?.created ?? currentdate}`;

//   let headersList = {
//     Accept: "*/*",
//   };
//   try {
//     const response = await fetch(url, {
//       method: "GET",
//       headers: headersList,
//     });
//     const data = await response.json();
//     //no-console("response === ", data);
//     if (data.code === 400) {
//       throw new Error(data.message);
//     }
//     return data as CustomFriendsType[];
//   } catch (e: any) {
//     //no-console("error fetching custom ", e);
//     throw new Error(e.message);
//   }
// }

export interface QueryVariables {
  user_id?: string;
  logged_in: string;
  type:"followers"|"following"
  id?: string;
  limit: string;
  created: string;
 }

interface Pagination_params {
  created: string;
  id: string;
}

export async function getPbPaginatedFriends(
  pb: PB,
  query_vars: QueryVariables,
  pagination_params?: Partial<Pagination_params>
) {

  const { user_id,logged_in,type} = query_vars;
  const params:QueryVariables={
    id: pagination_params?.id,
    user_id,
    logged_in,
    type,
    limit:'5',
    created: pagination_params?.created ?? (currentdate as string),

}

  try {
    const posts = await pb.send<CustomFriendsType[]>("custom_friends", {
      params,
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${pb.authStore.token}`,
      },
    });
    // logSuccess(kleur.red("paginated posts === "), posts);
    return posts;
  } catch (error) {
    console.log("error getting paginated posts ==== ", error);
    throw error;
  }
}
