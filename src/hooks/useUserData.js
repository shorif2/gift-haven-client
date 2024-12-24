import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import useAxiosBaseUrl from "./useAxiosBaseUrl";

const useUserData = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState(null);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const res = await useAxiosBaseUrl.get(`/user`, {
  //       params: { email: user.email },
  //     });
  //     setUserData(res.data);
  //     console(userData);
  //   };
  //   if (user?.email) {
  //     fetchData();
  //   }
  // }, [user, userData]);
  return userData;
};

export default useUserData;
