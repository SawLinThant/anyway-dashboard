import { Route, Routes } from "react-router-dom";
import UserList from "./user";
import Detail from "./user/userdetail/[userId]";
import NumberList from "./number/numberlist";


const MainContent = () => {
  return (
    <div className="w-full flex shadow p-4 bg-slate-50">
      <Routes>

        {/* userRoute */}
        <Route path="*" element={<UserList/>}/>
        <Route path="user/:id" element={<Detail/>}/>

        {/* luckydraw Route */}
        <Route path="luckydraw" element={<NumberList/>}/>
      </Routes>
    </div>
  );
};
export default MainContent;
