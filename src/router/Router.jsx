import { Route, Routes } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import HomePage from "pages/HomePage";
import DashboardPage from "pages/DashboardPage";
import AuthPage from "pages/AuthPage";
import AdminPage from "pages/AdminPage";
import NotFoundPage from "pages/404";
import { getProfile } from "services/user";

const Router = () => {
  // get users data to handle accessibility based on user's role
  const { data, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });
  console.log({ data, isLoading });
  if (isLoading) <h3>Loading...</h3>;
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default Router;
