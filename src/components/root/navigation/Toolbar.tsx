

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MobileSidebar } from "./MobileSidebar";
import { pb } from "@/state/pb/config";
import { Button } from "@/shadcn/ui/button";
import { Loader, Loader2, LogOut } from "lucide-react";

interface ToolbarProps {

}

export function Toolbar({}:ToolbarProps){
    const qc = useQueryClient()
    async function logoutUser() {
        try {
            await pb.authStore.clear()
            await qc.invalidateQueries({queryKey:["pb_auth"]});
            location.reload()
        } catch (error) {
            throw error;

        }
    }

    const mutation = useMutation<void, Error, void, unknown>({
        mutationFn:logoutUser,
    })

return (
    <div className='w-full h-full  flex items-center justify-start  bg-secondary '>
        <div className='flex  items-center justify-center  text-xl font-bold shadow-md gap-2'>
            <div className="bg-secondary  z-50">
                {/* <MobileViewSheet user={user} /> */}
                {/* <Mobilesidebar/> */}
                {/* <MobileNav/> */}
                {/* <DaisyMobileSidebar/> */}
                <MobileSidebar/>
            </div>
            APP
            <Button onClick={()=>mutation.mutate()}>
                {mutation.isPending ?<Loader className="h-4 w-4 animate-spin"/>:<LogOut className="h-4 w-4"/>}
            </Button>
        </div>

 </div>
);
}
