import { Navigate, Route, Routes } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import HomePage from "pages/HomePage";
import AdminPage from "pages/AdminPage";
import DashboardPage from "pages/DashboardPage";
import AuthPage from "pages/AuthPage";
import NotFoundPage from "pages/404";
import Loader from "components/modules/Loader";
import { getProfile } from "services/user";

const Router = () => {
  // get users data to handle accessibility based on user's role
  const { data, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });
  console.log({ data, isLoading });
  if (isLoading) return <Loader />;
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route
        path="/dashboard"
        element={data ? <DashboardPage /> : <Navigate to="/auth" />}
      />
      <Route
        path="/auth"
        element={data ? <Navigate to="/dashboard" /> : <AuthPage />}
      />
      <Route
        path="/admin"
        element={
          data && data.data.role === "ADMIN" ? (
            <AdminPage />
          ) : (
            <Navigate to="/" />
          )
        }
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default Router;
