import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useAxiosBaseUrl from "../hooks/useAxiosBaseUrl";
import Loading from "../pages/Loading";

const AllUsers = () => {
  const [allUser, setAllUser] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      const res = await useAxiosBaseUrl.get("/all-users");
      setAllUser(res.data);
      setLoading(false);
    };
    fetchUser();
  }, []);

  const handleAction = async (userId, action) => {
    const res = await useAxiosBaseUrl.patch(
      `/user?userId=${userId}&action=${action}`
    );
    if (res.data.modifiedCount) {
      toast.success(`Successfully ${action}`);
    }
  };
  if (loading) {
    return <Loading />;
  }
  return (
    <div>
      <h1 className="text-lg pb-4">All users</h1>

      <div className="flex justify-between items-center border p-4">
        <div className="w-full max-w-xl relative flex">
          <span className="absolute left-4 top-2 text-lg text-gray-400">
            <i className="fa-solid fa-magnifying-glass"></i>
          </span>
          <input
            type="text"
            name="search"
            id="search"
            className="w-full border border-primary border-r-0 pl-12 py-2 pr-3 rounded-l-md focus:outline-none hidden md:flex"
            placeholder="search"
          />
          <button className="bg-primary border border-primary text-white px-8 rounded-r-md hover:bg-transparent hover:text-primary transition">
            Search
          </button>
        </div>
        <div className="flex gap-4">
          <button className=" border border-primary px-8 py-1.5  rounded-md hover:bg-transparent hover:text-primary transition">
            Buyer
          </button>
          <button className=" border border-primary  px-8 py-1.5 rounded-md hover:bg-transparent hover:text-primary transition">
            Seller
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-4 pt-4">
        {allUser?.map((user) => (
          <div
            key={user._id}
            className="w-full border p-4 flex gap-4 justify-between"
          >
            <div className="avatar flex gap-4 w-1/4">
              <div className="w-24 rounded">
                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
              </div>
              <div>
                <p className="font-medium">Name</p>
                <p>{user?.name}</p>
              </div>
            </div>
            <div className="w-1/4">
              <p className="font-medium">Account Type</p>
              <p>{user?.role}</p>
            </div>
            <div className="w-1/4">
              <p className="font-medium">Status</p>
              <p
                className={
                  user?.status === "blocked" ? "text-red-500" : "text-green-500"
                }
              >
                {user?.status}
              </p>
            </div>
            <div className="text-sm flex gap-4 justify-end items-center w-1/4">
              {user?.status === "pending" && (
                <button
                  onClick={() => handleAction(user._id, "approved")}
                  className="border px-2 py-1 h-min rounded bg-green-500"
                >
                  Approve
                </button>
              )}

              <button
                onClick={() =>
                  handleAction(
                    user._id,
                    user.status === "blocked" ? "approved" : "blocked"
                  )
                }
                className="border px-2 py-1 h-min rounded bg-red-500 text-white"
              >
                {user.status === "blocked" ? "Unblock" : "Block"}
              </button>
              <button
                onClick={() => handleAction(user._id, "remove")}
                className="border px-2 py-1 h-min rounded bg-yellow-500"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllUsers;
