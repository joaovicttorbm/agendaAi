import {
  List,
  ListItem,
  ListItemText,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import EditTrainingModal from "./EditTrainingModal";

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
  onDelete: (trainingId: string) => void;
}

const TrainingList = ({ trainings, onUpdate, onDelete }: TrainingListProps) => {
  const [selectedTraining, setSelectedTraining] = useState<Training | null>(
    null
  );

  const handleEditClick = (training: Training) => {
    setSelectedTraining(training);
  };

  const handleDeleteClick = (trainingId: string) => {
    onDelete(trainingId);
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
                primary={`Training  ${new Date(
                  training.date
                ).toLocaleString()}`}
                secondary={
                  <>
                    <Box>
                      <Typography variant="body2" component="span">
                        <strong>Techniques:</strong>{" "}
                        {training.techniques?.join(", ") || "N/A"}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" component="span">
                        <strong>DurationMinutes:</strong>{" "}
                        {training.durationMinutes} minutes
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" component="span">
                        <strong>IntensityLevel:</strong>{" "}
                        {training.intensityLevel}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography
                        variant="body2"
                        component="span"
                        color="textSecondary"
                      >
                        {training.notes}
                      </Typography>
                    </Box>
                  </>
                }
              />
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <IconButton onClick={() => handleEditClick(training)}>
                  <EditIcon />
                </IconButton>
                <IconButton
                  onClick={() => handleDeleteClick(training.trainingId)}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </ListItem>
          ))
        ) : (
          <Typography
            variant="body1"
            component="span"
            sx={{ textAlign: "center", mt: 2 }}
          >
            Not found training
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
