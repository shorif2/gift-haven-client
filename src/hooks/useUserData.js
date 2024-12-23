import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import useAxiosBaseUrl from "./useAxiosBaseUrl";

const useUserData = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const res = await useAxiosBaseUrl.get(`/user`, {
        params: { email: user.email },
      });
      setUserData(res.data);
    };
    if (user?.email) {
      fetchData();
    }
  }, [user]);
  return userData;
};

export default useUserData;
