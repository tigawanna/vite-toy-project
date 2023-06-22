"use client"
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger 
} from "@/shadcn/ui/sheet";


interface MobileSidebarProps {

}

export function MobileSidebar({}:MobileSidebarProps){
return (
    <Sheet>
        <SheetTrigger><Menu className="mx-1 h-8 w-7"/></SheetTrigger>
        <SheetContent position="left">
            <SheetHeader>
                <SheetTitle>Are you sure absolutely sure?</SheetTitle>
  
            </SheetHeader>
            {/* <RouteLinks mobile={true} user={user} />
            <Systemicons user={user} /> */}
        </SheetContent>
    </Sheet>
);
}
