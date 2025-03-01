import { List, ListItem, ListItemText, Typography } from "@mui/material";

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
}

const TrainingList = ({ trainings }: TrainingListProps) => {
  console.log("trainingsList received trainings:", trainings); // Adicionando log para depuração
  return (
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
                  <Typography variant="body2">
                    <strong>Técnicas:</strong> {training.techniques.join(", ")}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Duração:</strong> {training.durationMinutes} minutos
                  </Typography>
                  <Typography variant="body2">
                    <strong>Intensidade:</strong> {training.intensityLevel}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {training.notes}
                  </Typography>
                </>
              }
            />
          </ListItem>
        ))
      ) : (
        <Typography variant="body1" sx={{ textAlign: "center", mt: 2 }}>
          Nenhum treinamento disponível
        </Typography>
      )}
    </List>
  );
};

export default TrainingList;
