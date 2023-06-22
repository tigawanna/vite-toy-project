

import { MobileSidebar } from "./MobileSidebar";

interface ToolbarProps {

}

export function Toolbar({}:ToolbarProps){
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
        </div>

 </div>
);
}
