
import { Close } from "@radix-ui/react-dialog"
import { Home, LucideIcon,  UserCircle2  } from "lucide-react";



interface RoutesProps {
  mobile?:boolean

}

export const RouteLinks = ({mobile = false}: RoutesProps) => {
  // console.log("user in route links  ==== ",user)

  const links = [
    { name: "Home", url: "/", Icon: Home },

    { name: "Auth", url: "/auth", Icon: UserCircle2 }
  ] as const
  return (
    <nav className="w-full md:w-fit  h-full  flex flex-col  items-center justify-cen gap-2 px-2 ">
      {links.map((link)=>{ 

      return(
        <RouteLink key={link.name} mobile={mobile} url={link.url} Icon={link.Icon} name={link.name}/>
      )}
      
      )}
      {/* {user &&<RouteLink mobile={mobile} url="/admin/new" Icon={UserCog} name="admin"/>} */}
      {/* {!user&&<div className="bg-red-500 h-5">hello</div>}
      {user&&<div className="bg-green-500 h-5">hello</div>} */}


    </nav>
  );
};


interface RouteLinkProps {
  mobile:boolean;
  url:string;
  name:string;
  Icon:LucideIcon
}

export function RouteLink({mobile,url,Icon,name}:RouteLinkProps){
  if(mobile){
    return(
      <Close asChild className="w-full flex items-center justify-center border-t p-3 ">
        <a href={url} className="w-full hover:text-purple-700 flex items-center justify-center gap-2">
          <Icon className="w-5 h-5" />{name}</a>
      </Close>
    )
  }
return (
 <div className='w-full  flex items-center justify-center p-3 border-t'>
    <a href={url} className="hover:text-purple-700 w-full  flex items-center justify-center gap-2">
      <Icon className="w-5 h-5"/>{name}</a>
</div>
);
}
