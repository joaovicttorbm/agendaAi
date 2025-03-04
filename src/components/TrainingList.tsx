import {
  List,
  ListItem,
  ListItemText,
  Typography,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import EditTrainingModal from "./EditTrainingModal.tsx";

interface Training {
  trainingId: string;
  date: string;
  techniques: string[];
  durationMinutes: number;
  intensityLevel: string;
  notes: string;
}

interface TrainingListProps {
  trainings: Training[];
  onUpdate: (updatedTraining: Training) => void;
}

const TrainingList = ({ trainings, onUpdate }: TrainingListProps) => {
  const [selectedTraining, setSelectedTraining] = useState<Training | null>(
    null
  );

  const handleEditClick = (training: Training) => {
    setSelectedTraining(training);
  };

  const handleCloseModal = () => {
    setSelectedTraining(null);
  };

  const handleSave = (updatedTraining: Training) => {
    onUpdate(updatedTraining);
    handleCloseModal();
  };

  return (
    <>
      <List>
        {trainings?.length > 0 ? (
          trainings.map((training) => (
            <ListItem
              key={training.trainingId}
              sx={{
                borderBottom: "1px solid #ddd",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <ListItemText
                primary={`Treinamento em ${new Date(
                  training.date
                ).toLocaleString()}`}
                secondary={
                  <>
                    <Typography variant="body2" component="div">
                      <strong>Techniques:</strong>{" "}
                      {training.techniques.join(", ")}
                    </Typography>
                    <Typography variant="body2" component="div">
                      <strong>DurationMinutes:</strong>{" "}
                      {training.durationMinutes} minutes
                    </Typography>
                    <Typography variant="body2" component="div">
                      <strong>IntensityLevel:</strong> {training.intensityLevel}
                    </Typography>
                    <Typography
                      variant="body2"
                      component="div"
                      color="textSecondary"
                    >
                      {training.notes}
                    </Typography>
                  </>
                }
              />
              <IconButton onClick={() => handleEditClick(training)}>
                <EditIcon />
              </IconButton>
            </ListItem>
          ))
        ) : (
          <Typography
            variant="body1"
            component="span"
            sx={{ textAlign: "center", mt: 2 }}
          >
            Nenhum treinamento disponível
          </Typography>
        )}
      </List>
      {selectedTraining && (
        <EditTrainingModal
          training={selectedTraining}
          onClose={handleCloseModal}
          onSave={handleSave}
        />
      )}
    </>
  );
};

export default TrainingList;
