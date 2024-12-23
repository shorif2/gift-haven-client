import axios from "axios";

const useAxiosBaseUrl = axios.create({
  baseURL: "http://localhost:5000",
  // baseURL: "https://gift-haven-client-two.vercel.app",
});

export default useAxiosBaseUrl;
