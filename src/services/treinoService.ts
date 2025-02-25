import api from "./api";

export const getTreinos = async () => {
  const response = await api.get("/treinos");
  return response.data;
};

export const saveTreino = async (treino: any) => {
  const response = await api.post("/treinos", treino);
  return response.data;
};