

import { RouteLinks } from "./RouteLinks";
import { Systemicons } from "./Systemicons";
import { Theme } from "../types";


interface SideBarProps {

theme:Theme|undefined
}

export function Sidebar({}:SideBarProps){

return (
    <div className='w-full h-full flex flex-col items-center justify-center '>
    <div className='w-full h-[20%] flex flex-col items-center justify-center  text-2xl font-bold shadow-md'>
        APP
    </div>
   <RouteLinks />

    <Systemicons />
</div>
);
}







