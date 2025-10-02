import axios from "axios";

const client = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // adjust to your backend
  withCredentials: true, // 👈 send/receive httpOnly cookies
});

export default client;
