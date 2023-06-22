"use client"

import { LogOutIcon, Moon, Sun } from "lucide-react";







export interface SystemIconsProps {

}

export function Systemicons({ }: SystemIconsProps) {



  return (
    <div className="w-full h-fit flex flex-col items-center justify-center p-3 ">

      {/* {user && (
          <div className="h-full gap-3 flex flex-col w-full items-center justify-center p-5">
          <Image
            alt={user.username}
            src={user.avatar !== "" ? user.avatar :"https://picsum.photos/200"}
            width={50} height={50}
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://picsum.photos/200";
            }}
            className="rounded-xl w-14 h-14" />
         
          <Button
            type="button"
            className="border-0"
            onClick={() => {
              start();
              mutate({})
            }}
            disabled={isPending || countdownValue > 1}>
            <LogOutIcon size={20} className="mx-5 h-5 w-5" />
          </Button>
        </div>

      )} */}

    </div>
  );
}
