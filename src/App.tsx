import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  Outlet,
} from "react-router-dom";
import Login from "./pages/Login.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import Register from "./pages/Register.tsx";
import Loading from "./components/Loading.tsx";
import { AuthProvider, useAuth } from "./context/AuthContext.tsx";
import Presentation from "./pages/Presentation.tsx";

const PublicRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <Loading />;
  }

  return isAuthenticated ? <Navigate to="/dashboard" /> : <Outlet />;
};

const PrivateRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <Loading />;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

const router = createBrowserRouter(
  [
    {
      element: <PublicRoute />,
      children: [
        { path: "/", element: <Presentation /> },
        { path: "/register", element: <Register /> },
        { path: "/login", element: <Login /> },
      ],
    },
    {
      element: <PrivateRoute />,
      children: [
        { path: "/dashboard", element: <Dashboard /> },
        { path: "/", element: <Navigate to="/dashboard" /> },
      ],
    },
  ],
  {
    future: {
      v7_relativeSplatPath: true,
    },
  }
);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
