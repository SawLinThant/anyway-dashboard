import { Route, Routes } from "react-router-dom";
import UserList from "./user";
import Detail from "./user/userdetail/[userId]";
import NumberList from "./number/numberlist";
import CustomizeForm from "./eventform/customizeform";


const MainContent = () => {
  return (
    <div className="w-full flex p-4 bg-slate-50">
      <Routes>

        {/* userRoute */}
        <Route path="*" element={<UserList/>}/>
        <Route path="user/:id" element={<Detail/>}/>

        {/* luckydraw Route */}
        <Route path="luckydraw" element={<NumberList/>}/>

        {/* form customization */}
        <Route path="eventform" element={<CustomizeForm/>}/>
      </Routes>
    </div>
  );
};
export default MainContent;
