import useAuth from "../../hooks/useAuth";

const SocialLoginCard = ({ type }) => {
  const { googleSingIn } = useAuth();
  const handleGoogleSign = async () => {
    await googleSingIn().then((res) => console.log(res));
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
