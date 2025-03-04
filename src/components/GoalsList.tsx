import { List, ListItem, ListItemText, Typography } from "@mui/material";
import Loading from "./Loading";

interface Goal {
  description: string;
  status: string;
  progress: number;
  notifications: boolean;
}

interface GoalsListProps {
  goals: Goal[];
}

const GoalsList = ({ goals }: GoalsListProps) => {
  return (
    <List>
      {goals?.length > 0 ? (
        goals.map((goal, index) => (
          <ListItem
            key={index}
            sx={{
              borderBottom: "1px solid #ddd",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <ListItemText
              primary={goal.description}
              secondary={
                <>
                  <Typography variant="body2">
                    <strong>Status:</strong> {goal.status}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Progress:</strong> {goal.progress}%
                  </Typography>
                  <Typography variant="body2">
                    <strong>Notifications:</strong>{" "}
                    {goal.notifications ? "Enabled" : "Disabled"}
                  </Typography>
                </>
              }
            />
          </ListItem>
        ))
      ) : (
        <>
          <Typography variant="body1" sx={{ textAlign: "center", mt: 2 }}>
            Em Desenvolvimento .....
          </Typography>
          <Loading />
        </>
      )}
    </List>
  );
};

export default GoalsList;
