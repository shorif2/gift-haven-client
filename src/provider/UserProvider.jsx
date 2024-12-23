import { useEffect, useState } from "react";

import useAxiosBaseUrl from "../hooks/useAxiosBaseUrl";
import UserContext from "../hooks/useUser";
import useAuth from "../hooks/useAuth";

const UserProvider = ({ children }) => {
  const { user } = useAuth();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await useAxiosBaseUrl.get(`/user`, {
        params: { email: user.email },
      });
      setUserData(res.data);
      console.log(userData);
    };
    if (user?.email) {
      fetchData();
    }
  }, [user, userData]);

  return (
    <UserContext.Provider value={{ userData }}>{children}</UserContext.Provider>
  );
};

export default UserProvider;
