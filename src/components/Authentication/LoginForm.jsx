import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import LoadingButton from "../LoadingButton";

const LoginForm = () => {
  const { signIn, loading } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // {...register("")}

  const onSubmit = (data) => {
    signIn(data.email, data.password)
      .then((res) => {
        if (res.user.email) {
          toast.success("Login successfull!!");
          navigate("/");
        }
      })
      .catch((error) => {
        if (error.code) {
          toast.error("Email or password don't match");
        }
      });

    console.log("something");
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <div className="space-y-2">
        <div>
          <label htmlFor="email" className="text-gray-600 mb-2 block">
            Email address
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
            placeholder="youremail.@domain.com"
            {...register("email", { required: true })}
          />
          {errors.email && <span>This field is required</span>}
        </div>
        <div>
          <label htmlFor="password" className="text-gray-600 mb-2 block">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
            placeholder="*******"
            {...register("password", { required: true })}
          />
        </div>
      </div>
      <div className="flex items-center justify-between mt-6">
        <div className="flex items-center">
          <input
            type="checkbox"
            name="remember"
            id="remember"
            className="text-primary focus:ring-0 rounded-sm cursor-pointer"
          />
          <label
            htmlFor="remember"
            className="text-gray-600 ml-3 cursor-pointer"
          >
            Remember me
          </label>
        </div>
        <a href="#" className="text-primary">
          Forgot password
        </a>
      </div>
      <div className="mt-4">
        {loading ? (
          <LoadingButton />
        ) : (
          <button
            type="submit"
            className="block w-full py-2 text-center text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium"
          >
            Login
          </button>
        )}
      </div>
    </form>
  );
};

export default LoginForm;
