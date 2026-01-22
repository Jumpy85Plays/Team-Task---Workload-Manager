import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import UserTasks from "./pages/UserTasks";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/tasks" element={<UserTasks userId={1} />} />
      </Routes>
    </BrowserRouter>
  );
}
