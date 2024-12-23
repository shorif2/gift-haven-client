import useAuth from "../hooks/useAuth";
import { useForm } from "react-hook-form";

const UpdateForm = () => {
  const { user } = useAuth();
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {},
  });
  //title
  //description
  //brand
  //price
  //stock
  //sellerEmail
  //category

  const onSubmit = (data) => {
    const name = data.name;
    const description = data.description;
    const price = parseFloat(data.price);
    const quantity = parseFloat(data.quantity);
    const category = data.category;
    const colors = data.colors.split(",");
    const ratings = data.ratings;
    const sellerEmail = user?.email;
    const image = [data.image.trim()];

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

    useAxiosBaseUrl
      .post("/add-products", product, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        if (res.data.insertedId) {
          toast.success("Product added successfully!!");
          reset();
        }
        if (res.data.message) {
          toast.error(res.data.message);
        }
      });
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
          Add Product
        </button>
      </div>
    </form>
  );
};

export default UpdateForm;
