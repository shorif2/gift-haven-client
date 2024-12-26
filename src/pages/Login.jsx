import { Link, useNavigate } from "react-router-dom";
import LoginForm from "../components/Authentication/LoginForm";
import SocialLoginCard from "../components/Authentication/SocialLoginCard";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  if (user) navigate("/");
  return (
    <div className="container py-16 md:h-screen">
      <div className="max-w-lg mx-auto shadow px-6 py-7 rounded h-max overflow-hidden">
        <h2 className="text-2xl uppercase font-medium mb-1">Login</h2>
        <p className="text-gray-600 mb-6 text-sm">welcome back customer</p>
        <LoginForm />

        <div className="mt-6 flex justify-center relative">
          <div className="text-gray-600 uppercase px-3 bg-white z-10 relative">
            Or login with
          </div>
          <div className="absolute left-0 top-3 w-full border-b-2 border-gray-200"></div>
        </div>
        {/* social sign-in or sign-up */}
        <SocialLoginCard type="login" />
        <p className="mt-4 text-center text-gray-600 ">
          Don&apos;t have account?
          <Link to="/register" className="text-primary">
            Register now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
