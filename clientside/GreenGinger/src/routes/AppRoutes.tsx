import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home/HomePage";
import NotFound from "../pages/NotFound/NotFound";
import MiddlewareRoute from "./MiddelwareRoute";
import FormLogin from "../pages/Login/FormLogin";
const AppRoutes = () => {
  return (
    <Routes>
      {/* NHÓM 1: Các trang CHỈ dành cho người chưa có tài khoản */}
      <Route element={<MiddlewareRoute isPublicOnly={true} />}>
        <Route path="/login" element={<FormLogin />} />
      </Route>

      {/* NHÓM 2: Các trang BẮT BUỘC phải đăng nhập mới được vào */}
      <Route element={<MiddlewareRoute />}>
        <Route path="/" element={<Home />} />
        {/* Thêm các trang quản lý, profile... ở đây */}
      </Route>

      {/* NHÓM 3: Trang lỗi hoặc trang công khai hoàn toàn */}
      <Route path="/404" element={<NotFound />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;