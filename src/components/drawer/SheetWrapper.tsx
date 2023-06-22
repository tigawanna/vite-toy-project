import * as Dialog from '@radix-ui/react-dialog';

interface SheetWrapperProps{
    children:React.ReactNode
}

export function SheetWrapper({children}:SheetWrapperProps){
    return(
    <Dialog.Root>
        <Dialog.Trigger asChild>
            <button className="shadow-secondary-foreground
            hover:bg-mauve3 inline-flex h-[35px] items-center justify-center 
            rounded-[4px] bg-secondary px-[15px] font-medium leading-none 
            shadow-[0_2px_10px] focus:shadow-[0_0_0_2px]
            focus:shadow-secondary-foreground focus:outline-none"> 
                Edit profile
            </button>
        </Dialog.Trigger>
        <Dialog.Portal>
            <Dialog.Overlay className="bg-primary bg-opacity-70 
            data-[state=open]:animate-overlayShow fixed inset-0" />
            <Dialog.Content className="
            data-[state=open]:animate-contentShow 
            fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] 
            translate-x-[-50%] translate-y-[-50%] rounded-[6px] 
            bg-secondary p-[25px] 
            shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] 
            focus:outline-none">


                    {children}

            </Dialog.Content>
        </Dialog.Portal>
    </Dialog.Root>
)};


