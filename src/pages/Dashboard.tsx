import { useEffect, useState } from "react";
import { Box, CssBaseline, Toolbar, Typography, Button } from "@mui/material";
import {
  getTraining,
  getGoals,
  saveTraining,
  updateTraining,
  deleteTraining,
  // saveGoal,
} from "../services/trainingService";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import TrainingList from "../components/TrainingList";
import GoalsList from "../components/GoalsList";
import CreateModal from "../components/CreateModal";

const Dashboard = () => {
  const [trainings, setTrainings] = useState<any[]>([]);
  const [goals, setGoals] = useState<any[]>([]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [view, setView] = useState<"trainings" | "goals">("trainings");
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const fetchTrainings = async () => {
      try {
        const response = await getTraining();
        setTrainings(response.data);
      } catch (error) {
        console.error("Erro ao buscar trainings", error);
      }
    };
    fetchTrainings();
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const fetchGoals = async () => {
    try {
      const response = await getGoals();
      setGoals(response.data);
    } catch (error) {
      console.error("Erro ao buscar goals", error);
    }
  };

  const handleTrainingClick = () => {
    setView("trainings");
  };

  const handleGoalsClick = () => {
    setView("goals");
    fetchGoals();
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const saveNewTraining = async (newTraining: any) => {
    try {
      const savedTraining = await saveTraining(newTraining);
      setTrainings((prevTrainings) => [...prevTrainings, savedTraining.data]);
    } catch (error) {
      console.error("Erro ao salvar novo treino", error);
    }
  };

  const updateExistingTraining = async (updatedTraining: any) => {
    try {
      const updatedTrainingResponse = await updateTraining(
        updatedTraining.trainingId,
        updatedTraining
      );
      const updatedTrainings = trainings.map((training) =>
        training.trainingId === updatedTrainingResponse.data.trainingId
          ? updatedTrainingResponse.data
          : training
      );
      setTrainings(updatedTrainings);
      console.log("Treino atualizado:", updatedTrainingResponse);
    } catch (error) {
      console.error("Erro ao atualizar treino", error);
    }
  };

  const handleSave = async (newItem: any) => {
    if (view === "trainings") {
      if (newItem.trainingId) {
        await updateExistingTraining(newItem);
      } else {
        await saveNewTraining(newItem);
      }
    } else {
      console.log("newItem , dev");
      // const savedGoal = await saveGoal(newItem);
      // setGoals([...goals, savedGoal]);
    }
  };

  const handleDelete = async (trainingId: string) => {
    try {
      await deleteTraining(trainingId);
      const updatedTrainings = trainings.filter(
        (training) => training.trainingId !== trainingId
      );
      setTrainings(updatedTrainings);
    } catch (error) {
      console.error("Erro ao deletar treino", error);
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Header handleDrawerToggle={handleDrawerToggle} />
      <Sidebar
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
        onTrainingClick={handleTrainingClick}
        onGoalsClick={handleGoalsClick}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - 240px)` },
        }}
      >
        <Toolbar />
        <Typography variant="h5" gutterBottom>
          {view === "trainings" ? "List Trainings" : "List Goals"}
        </Typography>
        <Button variant="contained" color="primary" onClick={handleOpenModal}>
          + Criar
        </Button>
        {view === "trainings" ? (
          <TrainingList
            trainings={trainings}
            onUpdate={handleSave}
            onDelete={handleDelete}
          />
        ) : (
          <GoalsList goals={goals} />
        )}
      </Box>
      <CreateModal
        open={openModal}
        onClose={handleCloseModal}
        onSave={handleSave}
        view={view}
      />
    </Box>
  );
};

export default Dashboard;
