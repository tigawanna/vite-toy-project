import { loginUser } from "@/state/pb/config";
import { PBUserRecord } from "@/state/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { RecordAuthResponse } from "pocketbase";
import { Button } from "shadcn-fe-ui";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "shadcn-fe-ui/alert-dialog";

interface LoginModalProps {
open: boolean;
setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export function LoginModal({open,setOpen}:LoginModalProps){
const qc = useQueryClient()

function updateuser(user:PBUserRecord){
    qc.setQueryData(['pb_auth'], user)
} 
    
const users=[
    { user: "pico", password:"pass_word"},
    { user: "timon", password:"pass_word"}
]

    const mutation = useMutation<RecordAuthResponse<PBUserRecord>, Error, typeof users[0], unknown>({
        mutationFn:({user,password})=>loginUser({user,password}),
        onSuccess(data, variables, context) {
            updateuser(data.record)
        },
    })

return (
    <AlertDialog open={open} onOpenChange={setOpen}>
        {/* <AlertDialogTrigger>Open</AlertDialogTrigger> */}
        <AlertDialogContent className="w-[90%]">
            <AlertDialogHeader>
                <AlertDialogTitle>Login Time</AlertDialogTitle>
                <AlertDialogDescription>
                        Please pick a profile
                </AlertDialogDescription>

            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <Button onClick={()=>{
                        mutation.mutate(users[0],{
                            onSuccess:()=>{
                                setOpen(false)
                            }
                        })

                        }}>
                            {mutation.isPending?<Loader2 className="h-4 w-4 animate-spin"/>:"Pico"}
                        
                        </Button>
                {/* <AlertDialogAction>
                </AlertDialogAction> */}
                {/* <AlertDialogAction>
         
                </AlertDialogAction> */}
                <Button onClick={() => mutation.mutate(users[1], {
                    onSuccess: () => {
                        setOpen(false)
                    }
                })}>
                    {mutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Pico"}
                </Button>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>

);
}
