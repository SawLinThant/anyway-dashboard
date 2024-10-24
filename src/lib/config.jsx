import { FaUserGroup } from "react-icons/fa6";
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";

export const SidebarRoutes = [
    {
        id: 'customer',
        label: 'Customer',
        path: 'dashboard',
        icon: <FaUserGroup size={20}/>
    },
    {
        id: 'luckydraw',
        label: 'LuckyDraw',
        path: '/dashboard/luckydraw',
        icon: <FaUserGroup size={20}/>
    },
]