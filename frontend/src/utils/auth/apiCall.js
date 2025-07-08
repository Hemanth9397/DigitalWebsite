import axios from "axios";

const ApiCall = "http://localhost:5000/api/v1";

// const ApiCall = axios.create({
//   baseURL: "http://localhost:5000/api/v1", // Your backend base path
// });

// ApiCall.interceptors.request.use((req) => {
//   const token = localStorage.getItem("token");
//   if (token) req.headers.Authorization = `Bearer ${token}`;
//   return req;
// });

export default ApiCall;