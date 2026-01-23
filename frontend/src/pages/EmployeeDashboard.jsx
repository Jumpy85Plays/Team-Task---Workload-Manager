import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Card,
  CardContent,
  CardActions,
  CircularProgress,
  Chip,
  ThemeProvider,
  createTheme,
  CssBaseline,
  Grid
} from "@mui/material";
import {
  Brightness4 as MoonIcon,
  Brightness7 as SunIcon,
  PlayArrow as StartIcon,
  CheckCircle as CompleteIcon
} from "@mui/icons-material";
import api from "../api";

export default function EmployeeDashboard({ user, onLogout }) {
  const [darkMode, setDarkMode] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: darkMode ? "#90caf9" : "#1976d2",
      },
      success: {
        main: "#10b981",
      },
      warning: {
        main: "#f59e0b",
      },
    },
  });

  useEffect(() => {
    const fetchTasks = async () => {
      if (!user?.id) return;
      try {
        const response = await api.get(`/my-tasks/${user.id}`);
        setTasks(response.data);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, [user]);

  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      await api.patch(`/tasks/${taskId}/status`, { status: newStatus });
      setTasks(prev =>
        prev.map(task =>
          task.id === taskId ? { ...task, status: newStatus } : task
        )
      );
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "success";
      case "in progress":
        return "warning";
      case "pending":
        return "default";
      default:
        return "default";
    }
  };

  const groupedTasks = {
    pending: tasks.filter(t => t.status === "pending"),
    "in progress": tasks.filter(t => t.status === "in progress"),
    completed: tasks.filter(t => t.status === "completed")
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: "flex", flexDirection: "column", height: "100vh", overflow: "hidden" }}>
        {/* Navigation */}
        <AppBar position="static" color="default" elevation={1}>
          <Toolbar>
            <Typography variant="h5" component="h1" sx={{ flexGrow: 1, fontWeight: 600 }}>
              My Tasks
            </Typography>
            <IconButton
              onClick={() => setDarkMode(!darkMode)}
              color="inherit"
              sx={{ mr: 2 }}
            >
              {darkMode ? <SunIcon /> : <MoonIcon />}
            </IconButton>
            <Typography variant="body2" sx={{ mr: 2, color: "text.secondary" }}>
              {user?.name || user?.email || "Employee"}
            </Typography>
            <Button variant="outlined" onClick={onLogout}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>

        {/* Content */}
        <Box sx={{ 
          flexGrow: 1,
          overflow: "auto",
          p: { xs: 2, sm: 3, md: 4 },
          height: "calc(100vh - 64px)"
        }}>
          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
              <CircularProgress />
            </Box>
          ) : tasks.length === 0 ? (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
              <Typography variant="h6" color="text.secondary">
                No tasks assigned yet.
              </Typography>
            </Box>
          ) : (
            <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
              {Object.entries(groupedTasks).map(([statusKey, taskGroup]) => 
                taskGroup.length > 0 && (
                  <Grid item xs={12} md={6} lg={4} key={statusKey}>
                    <Box sx={{ height: "100%" }}>
                      <Box sx={{ display: "flex", alignItems: "center", mb: 2, gap: 1 }}>
                        <Typography variant="h5" component="h2" sx={{ fontWeight: 600 }}>
                          {statusKey.charAt(0).toUpperCase() + statusKey.slice(1)}
                        </Typography>
                        <Chip
                          label={taskGroup.length}
                          color={getStatusColor(statusKey)}
                        />
                      </Box>
                      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        {taskGroup.map(task => (
                          <Card 
                            key={task.id} 
                            variant="outlined"
                            sx={{
                              transition: "all 0.2s",
                              "&:hover": {
                                boxShadow: 3,
                                transform: "translateY(-2px)"
                              }
                            }}
                          >
                            <CardContent>
                              <Typography variant="h6" component="h3" gutterBottom fontWeight={600}>
                                {task.title}
                              </Typography>
                              <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                                {task.description}
                              </Typography>
                              <Chip 
                                label={task.status} 
                                color={getStatusColor(task.status)}
                                size="small"
                              />
                            </CardContent>
                            <CardActions sx={{ px: 2, pb: 2 }}>
                              {statusKey !== "in progress" && (
                                <Button
                                  variant="contained"
                                  color="warning"
                                  startIcon={<StartIcon />}
                                  onClick={() => updateTaskStatus(task.id, "in progress")}
                                  fullWidth
                                >
                                  Start Task
                                </Button>
                              )}
                              {statusKey !== "completed" && (
                                <Button
                                  variant="outlined"
                                  startIcon={<CompleteIcon />}
                                  onClick={() => updateTaskStatus(task.id, "completed")}
                                  fullWidth
                                >
                                  Mark Complete
                                </Button>
                              )}
                            </CardActions>
                          </Card>
                        ))}
                      </Box>
                    </Box>
                  </Grid>
                )
              )}
            </Grid>
          )}
        </Box>
      </Box>
    </ThemeProvider>
  );
}

EmployeeDashboard.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    email: PropTypes.string
  }).isRequired,
  onLogout: PropTypes.func.isRequired
};