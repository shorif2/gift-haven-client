import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Logout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  return (
    <button
      onClick={() => {
        logout();
        navigate("/login");
      }}
      className="text-white hover:text-red-600"
    >
      Sign Out
    </button>
  );
};

export default Logout;
