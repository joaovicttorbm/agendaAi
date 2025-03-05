import { useState } from "react";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";

interface Training {
  trainingId: string;
  date: string;
  techniques: string[];
  durationMinutes: number;
  intensityLevel: string;
  notes: string;
}

interface EditTrainingModalProps {
  training: Training;
  onClose: () => void;
  onSave: (updatedTraining: Training) => void;
}

const EditTrainingModal = ({
  training,
  onClose,
  onSave,
}: EditTrainingModalProps) => {
  const [updatedTraining, setUpdatedTraining] = useState<Training>(training);
  const [errors, setErrors] = useState<any>({});

  const validateTraining = (training: Training) => {
    const errors: any = {};

    if (training.intensityLevel === "high" && training.durationMinutes < 10) {
      errors.durationMinutes =
        'If intensity level is "high", duration must be at least 10 minutes';
    }

    if (training.techniques.length < 1 || training.techniques.length > 10) {
      errors.techniques =
        "Techniques must be an array with at least 1 and at most 10 items";
    }

    if (training.durationMinutes <= 0 || training.durationMinutes > 240) {
      errors.durationMinutes =
        "Duration must be a positive integer between 1 and 240";
    }

    if (training.notes && training.notes.length > 500) {
      errors.notes = "Notes cannot exceed 500 characters";
    }

    return errors;
  };

  const handleSave = () => {
    const validationErrors = validateTraining(updatedTraining);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    onSave(updatedTraining);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  return (
    <Modal open={true} onClose={onClose}>
      <Box sx={{ ...modalStyle }}>
        <Typography variant="h6" gutterBottom>
          Edit Training
        </Typography>
        <TextField
          label="Date"
          type="datetime-local"
          fullWidth
          margin="normal"
          value={formatDate(updatedTraining.date)}
          onChange={(e) =>
            setUpdatedTraining({ ...updatedTraining, date: e.target.value })
          }
        />
        <TextField
          label="Techniques"
          fullWidth
          margin="normal"
          value={updatedTraining.techniques.join(", ")}
          onChange={(e) =>
            setUpdatedTraining({
              ...updatedTraining,
              techniques: e.target.value.split(","),
            })
          }
          error={!!errors.techniques}
          helperText={errors.techniques}
        />
        <TextField
          label="Duration (minutes)"
          type="number"
          fullWidth
          margin="normal"
          value={updatedTraining.durationMinutes}
          onChange={(e) =>
            setUpdatedTraining({
              ...updatedTraining,
              durationMinutes: Number(e.target.value),
            })
          }
          error={!!errors.durationMinutes}
          helperText={errors.durationMinutes}
        />
        <TextField
          label="Intensity Level"
          fullWidth
          margin="normal"
          value={updatedTraining.intensityLevel}
          onChange={(e) =>
            setUpdatedTraining({
              ...updatedTraining,
              intensityLevel: e.target.value,
            })
          }
          error={!!errors.intensityLevel}
          helperText={errors.intensityLevel}
        />
        <TextField
          label="Notes"
          fullWidth
          margin="normal"
          value={updatedTraining.notes}
          onChange={(e) =>
            setUpdatedTraining({ ...updatedTraining, notes: e.target.value })
          }
          error={!!errors.notes}
          helperText={errors.notes}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          sx={{ mt: 2 }}
        >
          Save
        </Button>
      </Box>
    </Modal>
  );
};

const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default EditTrainingModal;
