"use client";


import { Sidebar } from "./navigation/Sidebar";
import { Toolbar } from "./navigation/Toolbar";
import { QueryClientProvider, useQuery } from "@tanstack/react-query";
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Theme } from "./types";

import { MutationCache, QueryClient } from "@tanstack/react-query";
import { getUser } from "@/state/pb/config";
import { LoginModal } from "../dialog/LoginModal";
import { useState } from "react";
import { Friends } from "../friends/Friends";
import { Loader } from "lucide-react";
import { PBUserRecord } from "@/state/user";





interface AppWrapperProps {
  children: React.ReactNode;

  theme?:Theme;
}

export function AppWrapper({theme }: AppWrapperProps) {

const user  = useQuery({ queryKey:['pb_auth'], queryFn:()=>getUser()})

function isUserLoggedIn(){
if(!user.data||user.error){
  return false
}
return true
}
const [open, setOpen] = useState(!isUserLoggedIn());
console.log("user == ",open)

if(user.isPending){
  return (
    <div className="w-full h-screen flex flex-col md:flex-row  items-center justify-center">
      <div className="h-full flex items-center justify-center">
        <Loader className="h-20 w-20 animate-spin"/>
      </div>
    </div>
  )
}
  if (user.error || (!user.isPending &&!user.data)) {
    return <LoginModal open={open} setOpen={setOpen} />
  }

  return (


        <div className="w-full h-screen flex flex-col md:flex-row  items-center justify-center">

          <div className="w-full md:hidden h-14 flex items-center justify-start bg-secondary p-2">
            <Toolbar />
        <div className="h-full flex items-center justify-center">
          {user.data?.email}
        </div>
          </div>
          <div className="md:w-[250px] hidden h-full md:flex flex-col items-center justify-center bg-secondary">
            <Sidebar theme={theme}/>
          </div>
          {/* <div className="w-full h-screen overflow-y-scroll scroll-bar">{children}</div> */}
          <div className="w-full h-full flex items-center justify-center">
        <Friends user={user.data as unknown as PBUserRecord}/>
          </div>
        </div>


   
  );
}
