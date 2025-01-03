import { HashLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="min-h-screen min-w-screen flex justify-center p-96">
      <HashLoader
        color="red"
        loading={true}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Loading;
