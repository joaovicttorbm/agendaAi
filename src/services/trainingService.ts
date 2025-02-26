import api from "./api";

export const getTraining = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Usuário não autenticado");
  }

  const response = await api.get("/training", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const saveTreino = async (treino: any) => {
  const response = await api.post("/treinos", treino);
  return response.data;
};