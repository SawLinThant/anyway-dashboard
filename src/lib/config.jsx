import { FaUserGroup } from "react-icons/fa6";
import { FaWpforms } from "react-icons/fa6";
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
        icon: <GiPerspectiveDiceSixFacesRandom size={20}/>
    },
    {
        id: 'eventform',
        label: 'Event Form',
        path: '/dashboard/eventform',
        icon: <FaWpforms  size={20}/>
    },
]