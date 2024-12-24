import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import useAxiosBaseUrl from "../../hooks/useAxiosBaseUrl";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import LoadingButton from "../LoadingButton";
const RegisterForm = () => {
  const { newUser, loading } = useAuth();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    const name = data.name;
    const email = data.email;
    const role = data.role;
    const status = role == "buyer" ? "approved" : "pending";
    const wishlist = [];
    const cart = [];
    const userData = { email, role, status, wishlist, cart, name };
    newUser(email, data.password)
      .then(() => {
        useAxiosBaseUrl.post("/users", userData).then((res) => {
          if (res.data.insertedId) {
            navigate("/");
            toast.success("Registration Successfull!!");
          }
        });
      })
      .catch(() => {
        toast.error("Email already exists, or something went wrong...");
      });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <div className="space-y-2">
        <div className="flex w-full gap-4">
          <div className="w-full">
            <label htmlFor="name" className="text-gray-600 mb-2 block">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
              placeholder="john walker"
              {...register("name", { required: "Full Name is required." })}
            />
            {errors.name && (
              <p className=" text-primary ">{errors.name.message}</p>
            )}
          </div>
          <div className="w-full">
            <label htmlFor="email" className="text-gray-600 mb-2 block">
              Accont Type
            </label>

            <select
              {...register("role")}
              className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
            >
              <option value="buyer">Buyer</option>
              <option value="seller">Seller</option>
            </select>
          </div>
        </div>
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
            {...register("password", {
              required: "Password is required.",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters long.",
              },
              validate: {
                hasUpperCase: (value) =>
                  /[A-Z]/.test(value) ||
                  "Password must include at least one uppercase letter.",
                hasLowerCase: (value) =>
                  /[a-z]/.test(value) ||
                  "Password must include at least one lowercase letter.",
                hasNumber: (value) =>
                  /[0-9]/.test(value) ||
                  "Password must include at least one number.",
                hasSpecialChar: (value) =>
                  /[!@#$%^&*(),.?":{}|<>]/.test(value) ||
                  "Password must include at least one special character.",
              },
            })}
          />
          {errors.password && (
            <p className="text-primary">{errors.password.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="confirm" className="text-gray-600 mb-2 block">
            Confirm password
          </label>
          <input
            type="password"
            name="confirm"
            id="confirm"
            className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
            placeholder="*******"
            {...register("confirm", {
              required: "Confirm Password is required.",
              validate: (value) =>
                value === watch("password") || "Passwords do not match.",
            })}
          />
          {errors.confirm && (
            <p className="text-primary">{errors.confirm.message}</p>
          )}
        </div>
      </div>
      <div className="mt-6">
        <div className="flex items-center">
          <input
            type="checkbox"
            name="aggrement"
            id="aggrement"
            className="text-primary focus:ring-0 rounded-sm cursor-pointer"
            {...register("aggrement", { required: true })}
            required
          />
          <label
            htmlFor="aggrement"
            className="text-gray-600 ml-3 cursor-pointer"
          >
            I have read and agree to the{" "}
            <a className="text-primary">terms & conditions</a>
          </label>
        </div>
      </div>
      <div className="mt-4">
        {loading ? (
          <LoadingButton />
        ) : (
          <button
            type="submit"
            className="block w-full py-2 text-center text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium"
          >
            create account
          </button>
        )}
      </div>
    </form>
  );
};

export default RegisterForm;
