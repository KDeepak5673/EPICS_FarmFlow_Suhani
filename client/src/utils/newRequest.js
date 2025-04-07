import axios from "axios";

const newRequest = axios.create({
  baseURL: "https://epics-farmflow-suhani.onrender.com",
  withCredentials: true,
});

export default newRequest;
