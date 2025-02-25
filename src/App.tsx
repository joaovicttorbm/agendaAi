import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Outlet,
} from "react-router-dom";
import Login from "./pages/Login.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import { AuthProvider, useAuth } from "./context/AuthContext.tsx";
import Register from "./pages/Register.tsx";
import Loading from "./components/Loading.tsx";

const PublicRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <Loading />;
  }

  return isAuthenticated ? <Navigate to="/" /> : <Outlet />;
};

const PrivateRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();
  console.log(isAuthenticated, "private");

  if (isLoading) {
    return <Loading />;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};
function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <Routes>
            <Route element={<PublicRoute />}>
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
            </Route>
            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
