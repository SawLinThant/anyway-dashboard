import DashboardHeader from "../../modules/dashboard/header";
import MainContent from "../../modules/dashboard/maincontent";
import Sidebar from "../../modules/dashboard/sidebar";

const Dashboard = () => {
    return(
        <div className="w-full h-full flex flex-col border">
            <DashboardHeader/>
            <div className="w-full h-full overflow-auto flex flex-row">
               <Sidebar/>
                <MainContent/>
            </div>
        </div>
    )
}
export default Dashboard;