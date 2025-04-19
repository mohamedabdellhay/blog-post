import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    // لو مفيش توكن، نوجهه لصفحة تسجيل الدخول
    return <Navigate to="/login" />;
  }

  // لو فيه توكن، نسمح بالوصول للـ Dashboard أو أي صفحة محمية
  return <Outlet />;
};

export default PrivateRoute;
