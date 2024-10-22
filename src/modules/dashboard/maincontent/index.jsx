import { Route, Routes } from "react-router-dom";
import UserList from "./user";
import Detail from "./user/userdetail/[userId]";


const MainContent = () => {
  return (
    <div className="w-full flex shadow p-4 bg-slate-50">
      <Routes>
        <Route path="*" element={<UserList/>}/>
        <Route path="user/:id" element={<Detail/>}/>
      </Routes>
    </div>
  );
};
export default MainContent;
