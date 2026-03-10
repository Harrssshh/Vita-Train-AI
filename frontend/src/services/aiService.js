import axios from "axios";
import { auth } from "../firebase";

const API_URL =   import.meta.env.VITE_API_URL || "http://localhost:5000/api/ai";

const getAuthHeader = async () => {
  const user = auth.currentUser;

  if (!user) {
    console.warn("User not logged in");
    return {};
  }

  const token = await user.getIdToken();

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const generatePlan = async (data) => {
  const config = await getAuthHeader();
  const res = await axios.post(`${API_URL}/generate-plan`, data, config);
  return res.data;
};
