import { useSearchParams } from "react-router-dom";
import AddProductForm from "./AddProductForm";
const AddProduct = () => {
  const [searchParams] = useSearchParams();
  const productId = searchParams.get("id");
  return (
    <div>
      <h1>{productId ? "Update Product" : "Add Product"}</h1>
      <AddProductForm productId={productId} />
    </div>
  );
};

export default AddProduct;
