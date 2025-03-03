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
                  <Typography variant="body2" component="span">
                    <strong>Técnicas:</strong> {training.techniques.join(", ")}
                  </Typography>
                  <Typography variant="body2" component="span">
                    <strong>Duração:</strong> {training.durationMinutes} minutos
                  </Typography>
                  <Typography variant="body2" component="span">
                    <strong>Intensidade:</strong> {training.intensityLevel}
                  </Typography>
                  <Typography
                    variant="body2"
                    component="span"
                    color="textSecondary"
                  >
                    {training.notes}
                  </Typography>
                </>
              }
            />
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
  );
};

export default TrainingList;
