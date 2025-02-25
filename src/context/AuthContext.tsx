import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Estado para verificar se a autenticação foi carregada

  useEffect(() => {
    const token = localStorage.getItem("token");

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
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
