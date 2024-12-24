import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Logout = ({ type }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  return (
    <button
      onClick={() => {
        logout();
        navigate("/login");
      }}
      className={type === "dash" ? "" : "text-white hover:text-red-600"}
    >
      Sign Out
    </button>
  );
};

export default Logout;
