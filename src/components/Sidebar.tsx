import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import TrainIcon from "@mui/icons-material/Train";
import StarIcon from "@mui/icons-material/Star";
import LogoutIcon from "@mui/icons-material/Logout";
import { Event } from "@mui/icons-material";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

interface SidebarProps {
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
  onTrainingClick: () => void;
  onGoalsClick: () => void;
}

const Sidebar = ({
  mobileOpen,
  handleDrawerToggle,
  onTrainingClick,
  onGoalsClick,
}: SidebarProps) => {
  const drawerWidth = 240;
  const navigate = useNavigate();
  const { logout } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleLogout = () => {
    logout(navigate);
  };

  const listItemStyle = {
    backgroundColor: "#4682B4",
    borderRadius: "5px",
    marginBottom: "8px",
    padding: "10px",
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
        <ListItem
          disablePadding
          style={listItemStyle}
          onClick={onTrainingClick}
        >
          <ListItemIcon>
            <TrainIcon />
          </ListItemIcon>
          <ListItemText primary="Trainings" />
        </ListItem>
        <ListItem disablePadding style={listItemStyle} onClick={onGoalsClick}>
          <ListItemIcon>
            <StarIcon />
          </ListItemIcon>
          <ListItemText primary="Goals" />
        </ListItem>
        <Box sx={{ marginTop: 10 }}>
          <ListItem disablePadding>
            <IconButton onClick={handleLogout}>
              <LogoutIcon sx={{ mr: 1 }} />
            </IconButton>
            <ListItemText primary="Logout" />
          </ListItem>
        </Box>
      </List>
    </Box>
  );

  return (
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
  );
};

export default Sidebar;
