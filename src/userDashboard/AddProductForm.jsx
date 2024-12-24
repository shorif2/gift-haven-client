import { useForm } from "react-hook-form";
import useAxiosBaseUrl from "../hooks/useAxiosBaseUrl";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Loading from "../pages/Loading";

const AddProductForm = ({ productId }) => {
  const { user, loading } = useAuth();
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
            reset();
          }
          if (res.data.message) {
            toast.error(res.data.message);
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
            toast.success("Porduct Updated Successfully!!");
            navigate("/dashboard/product");
          } else {
            toast.error("Something went wrong...");
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
          {productId ? "Update Product" : "Add Product"}
        </button>
      </div>
    </form>
  );
};

export default AddProductForm;
