import { IoMdLogOut } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const DashboardHeader = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };
  return (
    <header className="w-full h-[7rem] shadow py-4 px-6 flex flex-row border-b items-center justify-between">
      <h2 className="font-pacifico text-3xl font-bold text-secondary">Anyway</h2>
      <div
      onClick={handleLogout}
      className="flex flex-row items-center gap-2 font-bold text-xl hover:cursor-pointer"><div>Logout</div> <IoMdLogOut /></div>
    </header>
  );
};
export default DashboardHeader;
