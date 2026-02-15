import { Navigate, Route, Routes } from "react-router-dom";
import { AuthPage } from "../pages/AuthPage/AuthPage";
import { ProductsPage } from "../pages/ProductsPage/ProductsPage";
import { ProtectedRoute } from "./ProtectedRoute";

export const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route index element={<Navigate to="auth" replace />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/products" element={<ProductsPage />} />
        </Route>
      </Routes>
    </>
  );
};
