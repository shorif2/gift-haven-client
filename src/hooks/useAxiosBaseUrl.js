import axios from "axios";

const useAxiosBaseUrl = axios.create({
  baseURL: "http://localhost:5000",
});

export default useAxiosBaseUrl;
