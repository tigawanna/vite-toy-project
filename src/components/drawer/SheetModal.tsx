import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger 
} from "@/shadcn/ui/sheet";

interface SheetModalProps {

}

export function SheetModal({}:SheetModalProps){
return (
    <Sheet>
        <SheetTrigger><Menu className="mx-1 h-8 w-7"/></SheetTrigger>
        <SheetContent position="left">
            <SheetHeader>
                <SheetTitle>Are you sure absolutely sure?</SheetTitle>
                <SheetDescription>
                    This action cannot be undone. This will permanently delete your account
                    and remove your data from our servers.
                </SheetDescription>
            </SheetHeader>
        </SheetContent>
    </Sheet>
);
}
