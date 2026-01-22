import { List, ListItem, ListItemText, Typography } from "@mui/material";
import api from "../api";
import { useEffect, useState } from "react";

export default function UserTasks({ userId }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    api.get(`/users/${userId}/tasks`)
       .then(res => setTasks(res.data));
  }, [userId]);

  return (
    <>
      <Typography variant="h6">My Tasks</Typography>
      <List>
        {tasks.map(task => (
          <ListItem key={task.id}>
            <ListItemText
              primary={task.title}
              secondary={task.status}
            />
          </ListItem>
        ))}
      </List>
    </>
  );
}
