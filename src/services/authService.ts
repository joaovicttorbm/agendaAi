import api from "./api";

export const login = async (email: string, password: string) => {
  const response = await api.post('user/auth/login', {
    email,
    password
  })
  localStorage.setItem("token", response.data.token);

  return response.data.token;
};

export const register = async ( username:string , email: string, password: string) => {
  const response = await api.post('user/register', {
    username,
    email,
    password
  })
  return response;
};



export const logout = () => {
  localStorage.removeItem("token");
};