import axios from "axios";

// Centralized API client pointing to Laravel backend
export default axios.create({
  baseURL: "http://localhost:8000/api",
  withCredentials: true
});
