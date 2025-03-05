import api from "./api";

export const getTraining = async () : Promise<any> => {
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

export const saveTraining = async (training: any) : Promise<any> => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Usuário não autenticado");
  }
  const response = await api.post("/training", training);
  return response.data;
};

export const updateTraining = async (trainingId: string, training: any): Promise<any> => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Usuário não autenticado");
  }
  const response = await api.put(`/training/${trainingId}`, training);

  return response.data;
};

export const deleteTraining = async (trainingId: string): Promise<any> => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Usuário não autenticado");
  }
  const response = await api.delete(`/training/${trainingId}`);
  return response;
};

export const getGoals = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Usuário não autenticado");
  }

  const response = await api.get("/goal", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const saveGoal = async (goal: any) : Promise<any> => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Usuário não autenticado");
  }
  const response = await api.post("/goal", goal);
  console.log("response", response);
  return 
};
