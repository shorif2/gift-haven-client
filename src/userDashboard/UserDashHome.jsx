import useAuth from "../hooks/useAuth";
import Loading from "../pages/Loading";

const UserDashHome = () => {
  const { userDetails, loading } = useAuth();
  if (loading) {
    return <Loading />;
  }
  return (
    <div className="space-y-4">
      <h1 className="font-medium">My Profile</h1>
      <div className="border p-5 rounded-lg flex justify-between">
        <div className="rounded-full flex gap-4 justify-start items-center">
          <div className="w-[72px] h-[72px] rounded-full border flex justify-center items-center text-3xl  text-primary font-bold">
            {userDetails?.name[0] || "?"}
          </div>
          <div>
            <h2>{userDetails?.name}</h2>
            <h2 className="text-gray-500">Role: {userDetails?.role}</h2>
            <p className="text-gray-500">Los Angeles, California, USA</p>
          </div>
        </div>
        <button className=" flex gap-2 items-center px-4 py-1 text-sm border rounded h-min hover:text-primary">
          <i className="fa-regular fa-pen-to-square"></i>Edit
        </button>
      </div>
      <div className="border p-5 rounded-lg flex justify-between">
        <div className="rounded-full space-y-4 w-full">
          <h2 className="font-medium text-lg">Personal Information</h2>
          <div className="rounded-full flex justify-start gap-4 text-gray-500 w-1/2">
            <div className="space-y-2 w-1/2">
              <h2>First Name</h2>
              <p>{userDetails?.name}</p>
            </div>
            <div className="space-y-2 w-1/2">
              <h2>Last Name</h2>
              <p>{userDetails?.name}</p>
            </div>
          </div>
          <div className="rounded-full flex flex-col md:flex-row gap-4 text-gray-500 lg:w-1/2">
            <div className="space-y-2 w-1/2">
              <h2>Email Address</h2>
              <p>{userDetails?.email}</p>
            </div>
            <div className="space-y-2 w-1/2">
              <h2>Phone</h2>
              <p>(213) 555-1234</p>
            </div>
          </div>
          <div className="rounded-full flex gap-4 text-gray-500 w-1/2">
            <div className="space-y-2">
              <h2>Bio</h2>
              <p>Bio not added yet</p>
            </div>
          </div>
        </div>
        <button className="flex gap-2 items-center px-4 py-1 text-sm border rounded h-min hover:text-primary">
          <i className="fa-regular fa-pen-to-square"></i>Edit
        </button>
      </div>
      <div className="border p-5 rounded-lg flex justify-between">
        <div className="rounded-full space-y-4 w-full">
          <h2 className="font-medium text-lg">Shipping Address</h2>
          <div className="rounded-full flex flex-col md:flex-row justify-start gap-4 text-gray-500 lg:w-1/2">
            <div className="space-y-2 w-1/2">
              <h2>Country</h2>
              <p>United State of America</p>
            </div>
            <div className="space-y-2 w-1/2">
              <h2>City/State</h2>
              <p>California,USA</p>
            </div>
          </div>
          <div className="rounded-full flex flex-col md:flex-row gap-4 text-gray-500 md:w-1/2">
            <div className="space-y-2 w-1/2">
              <h2>Postal Code</h2>
              <p>ERT 62574</p>
            </div>
            <div className="space-y-2 w-1/2">
              <h2>TAX ID</h2>
              <p>AS564178969</p>
            </div>
          </div>
        </div>
        <button className=" flex gap-2 items-center px-4 py-1 text-sm border rounded h-min hover:text-primary">
          <i className="fa-regular fa-pen-to-square"></i>Edit
        </button>
      </div>
    </div>
  );
};

export default UserDashHome;
