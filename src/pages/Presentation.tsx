import {
  AppBar,
  Toolbar,
  Button,
  Container,
  Typography,
  Grid2,
} from "@mui/material";
import { Event } from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";

const Presentation = () => {
  return (
    <>
      <AppBar position="static" color="default" elevation={0}>
        <Toolbar sx={{ justifyContent: "space-between", flexWrap: "nowrap" }}>
          <Typography
            variant="h6"
            sx={{ display: "flex", alignItems: "center" }}
          >
            <Event sx={{ mr: 1, color: "blue" }} />
          </Typography>
          <Grid2
            container
            spacing={2}
            sx={{ justifyContent: "center", flexWrap: "nowrap" }}
          >
            <Grid2>
              <Button
                component={RouterLink}
                to="/register"
                color="primary"
                variant="outlined"
                sx={{ whiteSpace: "nowrap" }}
              >
                Register
              </Button>
            </Grid2>
            <Grid2>
              <Button
                component={RouterLink}
                to="/login"
                color="primary"
                variant="contained"
                sx={{ whiteSpace: "nowrap" }}
              >
                Login
              </Button>
            </Grid2>
          </Grid2>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" sx={{ textAlign: "center", mt: 10 }}>
        <Grid2 container spacing={2}>
          <Grid2>
            <Typography
              variant="h3"
              gutterBottom
              sx={{ fontSize: { xs: "2rem", sm: "3rem" } }}
            >
              Agenda AI Training and Goal Management Platform for Brazilian
              Jiu-Jitsu
            </Typography>
          </Grid2>
          <Grid2>
            <Typography
              variant="h6"
              sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}
            >
              Manage your training and goals in an organized and efficient way.
              Record your training, track your progress and achieve new goals in
              Jiu-Jitsu.
            </Typography>
          </Grid2>
        </Grid2>
      </Container>
    </>
  );
};

export default Presentation;
