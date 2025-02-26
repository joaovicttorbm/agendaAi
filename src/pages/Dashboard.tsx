import { useEffect, useState } from "react";
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import { getTraining } from "../services/trainingService";
import { Event } from "@mui/icons-material";
import { logout } from "../services/authService";

const drawerWidth = 240;

const Dashboard = () => {
  const [trainings, setTrainings] = useState<any[]>([]);
  const [mobileOpen, setMobileOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const fetchTrainings = async () => {
      try {
        const response = await getTraining();
        console.info(response.data);
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

  const handleLogout = () => {
    logout();
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Box sx={{ display: "flex", justifyContent: "center", marginBottom: 1 }}>
        <Event sx={{ fontSize: 40 }} />
      </Box>
      <Typography variant="h6" sx={{ my: 2 }}>
        AgendaAI
      </Typography>
      <List>
        <ListItem disablePadding>
          <ListItemText primary="Trainings" />
        </ListItem>
        <ListItem disablePadding>
          <IconButton onClick={handleLogout}>
            <LogoutIcon sx={{ mr: 1 }} />
          </IconButton>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" noWrap component="div">
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      <Box component="nav">
        <Drawer
          variant={isMobile ? "temporary" : "permanent"}
          open={isMobile ? mobileOpen : true}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Typography variant="h5" gutterBottom>
          List Trainings
        </Typography>
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
                        <strong>Técnicas:</strong>{" "}
                        {training.techniques.join(", ")}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Duração:</strong> {training.durationMinutes}{" "}
                        minutos
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
      </Box>
    </Box>
  );
};

export default Dashboard;
