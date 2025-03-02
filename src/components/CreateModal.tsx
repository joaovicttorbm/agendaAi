import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { useState } from "react";

interface CreateModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (item: any) => void;
  view: "trainings" | "goals";
}

const CreateModal = ({ open, onClose, onSave, view }: CreateModalProps) => {
  const [newItem, setNewItem] = useState<any>({});
  const [errors, setErrors] = useState<any>({});

  const validateTraining = (item: any) => {
    const errors: any = {};

    if (!item.date) {
      errors.date = "Data é obrigatória";
    }

    if (
      !Array.isArray(item.techniques) ||
      item.techniques.length < 1 ||
      item.techniques.length > 10
    ) {
      errors.techniques =
        "Técnicas devem ser uma lista com pelo menos 1 e no máximo 10 itens";
    }

    if (
      !Number.isInteger(Number(item.durationMinutes)) ||
      item.durationMinutes <= 0 ||
      item.durationMinutes > 240
    ) {
      errors.durationMinutes =
        "Duração deve ser um número inteiro positivo entre 1 e 240";
    }

    if (!["low", "medium", "high"].includes(item.intensityLevel)) {
      errors.intensityLevel =
        "Nível de intensidade deve ser 'low', 'medium' ou 'high'";
    }

    if (item.notes && item.notes.length > 500) {
      errors.notes = "Notas não podem exceder 500 caracteres";
    }

    return errors;
  };

  const handleSave = () => {
    const validationErrors = validateTraining(newItem);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    onSave(newItem);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ ...modalStyle }}>
        <Typography variant="h6" gutterBottom>
          {view === "trainings" ? "Criar Treinamento" : "Criar Meta"}
        </Typography>
        {view === "trainings" ? (
          <>
            <TextField
              label="Data"
              type="datetime-local"
              fullWidth
              margin="normal"
              error={!!errors.date}
              helperText={errors.date}
              onChange={(e) => setNewItem({ ...newItem, date: e.target.value })}
            />
            <TextField
              label="Técnicas"
              fullWidth
              margin="normal"
              error={!!errors.techniques}
              helperText={errors.techniques}
              onChange={(e) =>
                setNewItem({
                  ...newItem,
                  techniques: e.target.value.split(","),
                })
              }
            />
            <TextField
              label="Duração (minutos)"
              type="number"
              fullWidth
              margin="normal"
              error={!!errors.durationMinutes}
              helperText={errors.durationMinutes}
              onChange={(e) =>
                setNewItem({
                  ...newItem,
                  durationMinutes: Number(e.target.value),
                })
              }
            />
            <TextField
              label="Nível de Intensidade"
              fullWidth
              margin="normal"
              error={!!errors.intensityLevel}
              helperText={errors.intensityLevel}
              onChange={(e) =>
                setNewItem({ ...newItem, intensityLevel: e.target.value })
              }
            />
            <TextField
              label="Notas"
              fullWidth
              margin="normal"
              error={!!errors.notes}
              helperText={errors.notes}
              onChange={(e) =>
                setNewItem({ ...newItem, notes: e.target.value })
              }
            />
          </>
        ) : (
          <>
            <TextField
              label="Descrição"
              fullWidth
              margin="normal"
              onChange={(e) =>
                setNewItem({ ...newItem, description: e.target.value })
              }
            />
            <TextField
              label="Status"
              fullWidth
              margin="normal"
              onChange={(e) =>
                setNewItem({ ...newItem, status: e.target.value })
              }
            />
            <TextField
              label="Progresso (%)"
              type="number"
              fullWidth
              margin="normal"
              onChange={(e) =>
                setNewItem({ ...newItem, progress: e.target.value })
              }
            />
            <TextField
              label="Notificações"
              type="checkbox"
              fullWidth
              margin="normal"
              onChange={(e) =>
                setNewItem({
                  ...newItem,
                  notifications: (e.target as HTMLInputElement).checked,
                })
              }
            />
          </>
        )}
        <Button variant="contained" color="primary" onClick={handleSave}>
          Salvar
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

export default CreateModal;
