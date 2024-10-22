import { useNavigate } from "react-router-dom";
import { SidebarRoutes } from "../../../lib/config";

const Sidebar = () => {
  const navigate = useNavigate();
    return (
      <aside className="w-[16rem] border-r h-full py-4 flex flex-col gap-4">
        <div className="w-full h-full flex flex-col gap-4">
            {SidebarRoutes.map((route) =>(
                <div
                onClick={() => navigate(route.path)}
                className="w-full h-12 py-4 pl-10 flex flex-row gap-2 items-center justify-start hover:bg-secondary hover:text-white cursor-pointer rounded-sm">
                    <div>{route.icon}</div>
                    <div>{route.label}</div>
                </div>
            ))}
        </div>
      </aside>
    );
  };
  export default Sidebar;