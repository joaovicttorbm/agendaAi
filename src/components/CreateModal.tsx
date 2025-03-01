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

  const handleSave = () => {
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
              onChange={(e) => setNewItem({ ...newItem, date: e.target.value })}
            />
            <TextField
              label="Técnicas"
              fullWidth
              margin="normal"
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
              onChange={(e) =>
                setNewItem({ ...newItem, durationMinutes: e.target.value })
              }
            />
            <TextField
              label="Nível de Intensidade"
              fullWidth
              margin="normal"
              onChange={(e) =>
                setNewItem({ ...newItem, intensityLevel: e.target.value })
              }
            />
            <TextField
              label="Notas"
              fullWidth
              margin="normal"
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
