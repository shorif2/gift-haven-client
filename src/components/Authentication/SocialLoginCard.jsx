import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

import useAxiosBaseUrl from "../../hooks/useAxiosBaseUrl";

const SocialLoginCard = ({ type }) => {
  const { googleSingIn } = useAuth();
  const navigate = useNavigate();
  const handleGoogleSign = async () => {
    const role = "buyer";
    const status = "approved";
    const wishlist = [];
    const cart = [];
    googleSingIn()
      .then((res) => {
        console.log(res);

        if (res) {
          const email = res?.user.email;
          const name = res?.user?.displayName;
          const image = res?.user?.photoURL;
          const userData = { email, role, status, wishlist, cart, name, image };
          useAxiosBaseUrl.post("/users", userData).then((res) => {
            console.log(res);
            if (res.data.insertedId) {
              toast.success("Registration Successfull!!");
              navigate("/");
            }
          });
        } else {
          toast.success("Login Successfull !!");
          navigate("/");
        }
      })
      .catch(() => {
        toast.error("Email already exists, or something went wrong...");
      });
  };
  return (
    <div className="mt-4 flex gap-4">
      <button className="w-1/2 py-2 text-center text-white bg-blue-800 rounded uppercase font-roboto font-medium text-sm hover:bg-blue-700">
        facebook
      </button>
      <button
        onClick={() => handleGoogleSign()}
        className="w-1/2 py-2 text-center text-white bg-red-600 rounded uppercase font-roboto font-medium text-sm hover:bg-red-500"
      >
        google
      </button>
    </div>
  );
};

export default SocialLoginCard;
