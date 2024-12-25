import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useAxiosBaseUrl from "../hooks/useAxiosBaseUrl";
import Loading from "../pages/Loading";

const AddProductForm = ({ productId }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit, reset, setValue } = useForm({
    defaultValues: {
      name: "",
      description: "",
      price: "",
      quantity: "",
      category: "",
      colors: "",
      ratings: "",
      sellerEmail: "",
      image: "",
    },
  });
  useEffect(() => {
    if (productId) {
      setIsEditing(true);
      const fetchProduct = async () => {
        try {
          const response = await useAxiosBaseUrl.get("/single-product", {
            params: { id: productId },
          });
          for (const key in response.data) {
            setValue(key, response.data[key]);
          }
        } catch (error) {
          console.error("Error fetching product:", error);
        }
      };
      fetchProduct();
    } else {
      setIsEditing(false);
      reset();
      setValue("sellerEmail", user?.email);
    }
  }, [productId, reset, setValue, user]);
  if (loading) {
    return <Loading />;
  }
  const onSubmit = (data) => {
    setLoading(true);
    const name = data.name;
    const description = data.description;
    const price = parseFloat(data.price);
    const quantity = parseFloat(data.quantity);
    const category = data.category;
    const colors = data?.colors?.toString().split(",");
    const ratings = data.ratings;
    const sellerEmail = data?.sellerEmail;
    const image = [data.image];

    const product = {
      name,
      description,
      price,
      quantity,
      category,
      colors,
      ratings,
      sellerEmail,
      image,
    };
    const token = localStorage.getItem("access-token");
    if (!isEditing) {
      useAxiosBaseUrl
        .post("/add-products", product, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.data.insertedId) {
            toast.success("Product added successfully!!");
            setLoading(false);
            reset();
          }
          if (res.data.message) {
            toast.error(res.data.message);
            setLoading(false);
          }
        });
    }
    if (isEditing) {
      useAxiosBaseUrl
        .patch(`/update-product?id=${productId}`, product, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            reset();
            toast.success("Product Updated Successfully!!");
            navigate("/dashboard/product");
          } else {
            toast.error("Something went wrong...");
            setLoading(false);
          }
        });
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" className="pt-4">
      <div className="space-y-2">
        <div className="flex w-full gap-4">
          <div className="w-full">
            <label htmlFor="name" className="text-gray-600 mb-2 block">
              Product Title
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
              placeholder="product title"
              {...register("name", { required: true })}
            />
          </div>
          <div className="w-full">
            <label htmlFor="sellerEmail" className="text-gray-600 mb-2 block">
              Seller Email
            </label>
            <input
              type="text"
              name="sellerEmail"
              id="sellerEmail"
              disabled
              defaultValue={user?.email}
              className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
              placeholder="seller email"
              {...register("sellerEmail")}
            />
          </div>
        </div>
        <div className="flex w-full gap-4">
          <div className="w-full">
            <label htmlFor="category" className="text-gray-600 mb-2 block">
              Category
            </label>
            <input
              type="text"
              name="category"
              id="category"
              className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
              placeholder="category name"
              {...register("category", { required: true })}
            />
          </div>
          <div className="w-full">
            <label htmlFor="ratings" className="text-gray-600 mb-2 block">
              Ratings
            </label>
            <input
              type="number"
              name="ratings"
              id="ratings"
              step="0.1"
              min="0"
              className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
              placeholder="Example: 4"
              {...register("ratings", { required: true })}
            />
          </div>
        </div>
        <div className="flex w-full gap-4">
          <div className="w-full">
            <label htmlFor="image" className="text-gray-600 mb-2 block">
              Image URL
            </label>
            <input
              type="text"
              name="image"
              id="image"
              className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
              placeholder="https://example.com/watch.jpg"
              {...register("image", { required: true })}
            />
          </div>
        </div>
        <div className=" w-full flex gap-4">
          <div className="w-full">
            <label htmlFor="quantity" className="text-gray-600 mb-2 block">
              Quantity
            </label>
            <input
              type="number"
              name="quantity"
              id="quantity"
              className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
              placeholder="quantity"
              {...register("quantity", { required: true })}
            />
          </div>
          <div className="w-full">
            <label htmlFor="price" className="text-gray-600 mb-2 block">
              Price
            </label>
            <input
              type="number"
              name="price"
              id="price"
              step="0.001"
              min="0"
              className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
              placeholder="price"
              {...register("price", { required: true })}
            />
          </div>
          <div className="w-full">
            <label htmlFor="colors" className="text-gray-600 mb-2 block">
              Color
            </label>
            <input
              type="text"
              name="colors"
              id="colors"
              className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
              placeholder="red,blue,green"
              {...register("colors", { required: true })}
            />
          </div>
        </div>

        <div>
          <label htmlFor="description" className="text-gray-600 mb-2 block">
            Description
          </label>
          <textarea
            type="text"
            name="description"
            rows="6"
            id="description"
            className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
            placeholder="description"
            {...register("description", { required: true })}
          ></textarea>
        </div>
      </div>
      <div className="mt-4">
        <button
          type="submit"
          className="block w-full py-2 text-center text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium"
        >
          {loading ? (
            <span>
              <svg
                className="animate-spin"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="10"
                  cy="10"
                  r="9"
                  stroke="#E5E7EB"
                  strokeWidth="2"
                />
                <mask id="path-2-inside-1_2527_20940" fill="white">
                  <path d="M18.4736 13.0353C18.9931 13.2214 19.5703 12.9518 19.7037 12.4163C20.0051 11.2058 20.0781 9.94661 19.9156 8.70384C19.7099 7.12996 19.1325 5.62766 18.2311 4.32117C17.3297 3.01467 16.1303 1.94151 14.7319 1.19042C13.6278 0.597345 12.4247 0.218536 11.186 0.0705813C10.6381 0.0051315 10.1811 0.449069 10.1707 1.00081C10.1602 1.55254 10.6008 2.0019 11.147 2.08101C12.0682 2.21444 12.9618 2.508 13.7863 2.95091C14.9052 3.5519 15.865 4.4106 16.5862 5.45601C17.3075 6.50142 17.7695 7.7035 17.9341 8.96286C18.0554 9.89095 18.0127 10.8305 17.8103 11.7391C17.6904 12.2778 17.9541 12.8492 18.4736 13.0353Z" />
                </mask>
                <path
                  d="M18.4736 13.0353C18.9931 13.2214 19.5703 12.9518 19.7037 12.4163C20.0051 11.2058 20.0781 9.94661 19.9156 8.70384C19.7099 7.12996 19.1325 5.62766 18.2311 4.32117C17.3297 3.01467 16.1303 1.94151 14.7319 1.19042C13.6278 0.597345 12.4247 0.218536 11.186 0.0705813C10.6381 0.0051315 10.1811 0.449069 10.1707 1.00081C10.1602 1.55254 10.6008 2.0019 11.147 2.08101C12.0682 2.21444 12.9618 2.508 13.7863 2.95091C14.9052 3.5519 15.865 4.4106 16.5862 5.45601C17.3075 6.50142 17.7695 7.7035 17.9341 8.96286C18.0554 9.89095 18.0127 10.8305 17.8103 11.7391C17.6904 12.2778 17.9541 12.8492 18.4736 13.0353Z"
                  stroke="#3758F9"
                  strokeWidth="4"
                  mask="url(#path-2-inside-1_2527_20940)"
                />
              </svg>
            </span>
          ) : (
            <>{productId ? "Update Product" : "Add Product"}</>
          )}
        </button>
      </div>
    </form>
  );
};

export default AddProductForm;
