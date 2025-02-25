import { useEffect, useState } from "react";
import { getTreinos } from "../services/treinoService";

const Dashboard = () => {
  const [treinos, setTreinos] = useState([]);

  useEffect(() => {
    const fetchTreinos = async () => {
      try {
        const data = await getTreinos();
        setTreinos(data);
      } catch (error) {
        console.error("Erro ao buscar treinos", error);
      }
    };
    fetchTreinos();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      <ul>
        {treinos.map((treino, index) => (
          <li key={index}>{treino}</li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
