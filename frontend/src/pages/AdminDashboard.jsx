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
  TextField,
  Chip,
  Checkbox,
  FormControlLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Grid,
  Paper,
  ThemeProvider,
  createTheme,
  CssBaseline,
  Stack,
  Divider
} from "@mui/material";
import {
  Brightness4 as MoonIcon,
  Brightness7 as SunIcon,
  Add as AddIcon
} from "@mui/icons-material";
import api from "../api";

export default function AdminDashboard({ user, onLogout }) {
  const [darkMode, setDarkMode] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateTask, setShowCreateTask] = useState(false);
  const [newTask, setNewTask] = useState({ title: "", description: "", selectedEmployees: [] });

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
    const fetchData = async () => {
      try {
        const [tasksRes, employeesRes] = await Promise.all([
          api.get("/tasks"),
          api.get("/users?role=employee")
        ]);
        setTasks(tasksRes.data);
        setEmployees(employeesRes.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const createTask = async () => {
    try {
      const response = await api.post("/tasks", {
        title: newTask.title,
        description: newTask.description,
        user_ids: newTask.selectedEmployees
      });
      setTasks(prev => [...prev, response.data]);
      setNewTask({ title: "", description: "", selectedEmployees: [] });
      setShowCreateTask(false);
    } catch (error) {
      console.error("Failed to create task:", error);
    }
  };

  const toggleEmployee = (employeeId) => {
    setNewTask(prev => ({
      ...prev,
      selectedEmployees: prev.selectedEmployees.includes(employeeId)
        ? prev.selectedEmployees.filter(id => id !== employeeId)
        : [...prev.selectedEmployees, employeeId]
    }));
  };

  const selectAllEmployees = () => {
    setNewTask(prev => ({ 
      ...prev, 
      selectedEmployees: employees.map(e => e.id) 
    }));
  };

  const deselectAllEmployees = () => {
    setNewTask(prev => ({ 
      ...prev, 
      selectedEmployees: [] 
    }));
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

  const getTasksByEmployee = () => {
    const map = {};
    employees.forEach(emp => {
      map[emp.id] = {
        employee: emp,
        tasks: tasks.filter(task => task.users?.some(u => u.id === emp.id))
      };
    });
    return map;
  };

  const employeeTaskData = getTasksByEmployee();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: "flex", flexDirection: "column", height: "100vh", overflow: "hidden" }}>
        {/* Navigation */}
        <AppBar position="static" color="default" elevation={1}>
          <Toolbar>
            <Typography variant="h5" component="h1" sx={{ flexGrow: 1, fontWeight: 600 }}>
              Admin Dashboard
            </Typography>
            <IconButton
              onClick={() => setDarkMode(!darkMode)}
              color="inherit"
              sx={{ mr: 2 }}
            >
              {darkMode ? <SunIcon /> : <MoonIcon />}
            </IconButton>
            <Typography variant="body2" sx={{ mr: 2, color: "text.secondary" }}>
              {user?.email || "Admin"}
            </Typography>
            <Button variant="outlined" onClick={onLogout}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>

        {/* Content - Full height minus AppBar */}
        <Box sx={{ 
          flexGrow: 1, 
          overflow: "auto",
          p: { xs: 2, sm: 3 },
          height: "calc(100vh - 64px)"
        }}>
          {/* Create Task Button */}
          <Box sx={{ mb: 3 }}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setShowCreateTask(true)}
              size="large"
            >
              Create Task
            </Button>
          </Box>

          {/* Main Content */}
          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50%" }}>
              <CircularProgress />
            </Box>
          ) : (
            <Grid container spacing={{ xs: 2, sm: 2, md: 3 }} sx={{ height: "100%" }}>
              {Object.values(employeeTaskData).map(({ employee, tasks: employeeTasks }) => (
                <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={employee.id}>
                  <Card 
                    variant="outlined" 
                    sx={{ 
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      minHeight: { xs: "auto", sm: 300 }
                    }}
                  >
                    <CardContent sx={{ flexGrow: 1, overflow: "auto" }}>
                      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
                        <Typography variant="h6" component="h4" noWrap sx={{ flexGrow: 1, mr: 1 }}>
                          {employee.name}
                        </Typography>
                        <Chip 
                          label={employeeTasks.length} 
                          size="small" 
                          color="primary"
                        />
                      </Box>
                      
                      <Divider sx={{ mb: 2 }} />
                      
                      {employeeTasks.length === 0 ? (
                        <Typography variant="body2" color="text.secondary">
                          No tasks assigned
                        </Typography>
                      ) : (
                        <Stack spacing={1.5}>
                          {employeeTasks.map(task => (
                            <Paper 
                              key={task.id} 
                              variant="outlined"
                              sx={{ p: 1.5 }}
                            >
                              <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                                {task.title}
                              </Typography>
                              <Typography 
                                variant="body2" 
                                color="text.secondary" 
                                sx={{ 
                                  mb: 1,
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  display: "-webkit-box",
                                  WebkitLineClamp: 2,
                                  WebkitBoxOrient: "vertical"
                                }}
                              >
                                {task.description}
                              </Typography>
                              <Chip 
                                label={task.status} 
                                size="small" 
                                color={getStatusColor(task.status)}
                              />
                            </Paper>
                          ))}
                        </Stack>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>

        {/* Create Task Dialog */}
        <Dialog 
          open={showCreateTask} 
          onClose={() => setShowCreateTask(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Create New Task</DialogTitle>
          <DialogContent>
            <Stack spacing={3} sx={{ mt: 1 }}>
              <TextField
                label="Task Title"
                fullWidth
                value={newTask.title}
                onChange={e => setNewTask({...newTask, title: e.target.value})}
                required
              />
              
              <TextField
                label="Task Description"
                fullWidth
                multiline
                rows={4}
                value={newTask.description}
                onChange={e => setNewTask({...newTask, description: e.target.value})}
              />
              
              <Box>
                <Typography variant="subtitle2" gutterBottom>
                  Assign to Employees
                </Typography>
                <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
                  <Button 
                    size="small" 
                    onClick={selectAllEmployees}
                    variant="outlined"
                  >
                    Select All
                  </Button>
                  <Button 
                    size="small" 
                    onClick={deselectAllEmployees}
                    variant="outlined"
                  >
                    Deselect All
                  </Button>
                </Box>
                
                <Paper variant="outlined" sx={{ p: 2, maxHeight: 200, overflow: "auto" }}>
                  <Stack spacing={0.5}>
                    {employees.map(emp => (
                      <FormControlLabel
                        key={emp.id}
                        control={
                          <Checkbox
                            checked={newTask.selectedEmployees.includes(emp.id)}
                            onChange={() => toggleEmployee(emp.id)}
                          />
                        }
                        label={emp.name}
                      />
                    ))}
                  </Stack>
                </Paper>
              </Box>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowCreateTask(false)}>
              Cancel
            </Button>
            <Button 
              onClick={createTask} 
              variant="contained"
              disabled={!newTask.title || newTask.selectedEmployees.length === 0}
            >
              Create Task
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </ThemeProvider>
  );
}

AdminDashboard.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string,
    id: PropTypes.number
  }).isRequired,
  onLogout: PropTypes.func.isRequired
};