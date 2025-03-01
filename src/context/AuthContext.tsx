import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("token", token);

    if (token) {
      try {
        const decoded: any = jwtDecode(token); // Decodifica o token
        const isTokenValid = decoded.exp * 1000 > Date.now(); // Verifica se não expirou
        if (isTokenValid) {
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem("token"); // Remove token expirado
        }
      } catch (error) {
        console.error("Erro ao decodificar o token:", error);
        setIsAuthenticated(false);
        localStorage.removeItem("token"); // Remove token inválido
      }
    } else {
      setIsAuthenticated(false); // Se não houver token, considera não autenticado
    }

    setIsLoading(false); // Finaliza a verificação de carregamento
  }, []);

  const login = (token: string) => {
    console.log("login", token);
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
  };

  const logout = (navigate: any) => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
