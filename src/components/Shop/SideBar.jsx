import { useEffect, useState } from "react";
import useAxiosBaseUrl from "../../hooks/useAxiosBaseUrl";
import { useShop } from "../../hooks/useShop";

const SideBar = () => {
  const { setSearchTerm, setCategory, setSort } = useShop();
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategory = async () => {
      await useAxiosBaseUrl
        .get("/product-categories")
        .then((res) => setCategories(res.data));
    };
    fetchCategory();
  }, []);
  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.search.value);
    e.target.search.value = "";
  };

  return (
    <div className="col-span-1 bg-white px-4 pb-6 shadow rounded overflow-hidden hidden md:block">
      <div className="relative mt-4 flex items-center pb-4">
        <form onSubmit={handleSearch} className="flex w-full ">
          <input
            type="text"
            name="search"
            id="search"
            className="w-full border-gray-300 focus:border-primary rounded focus:ring-0 px-3 py-1 text-gray-600 shadow-sm"
            placeholder="Search"
          />
          <button
            type="submit"
            className="w-min px-2 bg-primary text-lg rounded text-white flex justify-center items-center"
          >
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </form>
      </div>
      <div className="divide-y divide-gray-200 space-y-5">
        <div>
          <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">
            Categories
          </h3>
          <div className="space-y-2">
            <select
              onChange={(e) => setCategory(e.target.value)}
              className="w-full mb-4 h-10"
              name="select"
              id=""
            >
              <option value="">Choose Categories</option>
              {categories?.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <div className="flex items-center">
              <input
                type="checkbox"
                name="cat-1"
                id="cat-1"
                className="text-primary focus:ring-0 rounded-sm cursor-pointer"
              />
              <label
                htmlFor="cat-1"
                className="text-gray-600 ml-3 cusror-pointer"
              >
                Bedroom
              </label>
              <div className="ml-auto text-gray-600 text-sm">(15)</div>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                name="cat-2"
                id="cat-2"
                className="text-primary focus:ring-0 rounded-sm cursor-pointer"
              />
              <label
                htmlFor="cat-2"
                className="text-gray-600 ml-3 cusror-pointer"
              >
                Sofa
              </label>
              <div className="ml-auto text-gray-600 text-sm">(9)</div>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                name="cat-3"
                id="cat-3"
                className="text-primary focus:ring-0 rounded-sm cursor-pointer"
              />
              <label
                htmlFor="cat-3"
                className="text-gray-600 ml-3 cusror-pointer"
              >
                Office
              </label>
              <div className="ml-auto text-gray-600 text-sm">(21)</div>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                name="cat-4"
                id="cat-4"
                className="text-primary focus:ring-0 rounded-sm cursor-pointer"
              />
              <label
                htmlFor="cat-4"
                className="text-gray-600 ml-3 cusror-pointer"
              >
                Outdoor
              </label>
              <div className="ml-auto text-gray-600 text-sm">(10)</div>
            </div>
          </div>
        </div>

        <div className="pt-4">
          <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">
            Price
          </h3>
          <label
            htmlFor="Toggle4"
            className="w-full inline-flex justify-between items-center p-2 cursor-pointer bg-gray-100  dark:text-gray-100"
          >
            <input id="Toggle4" type="checkbox" className="hidden peer" />
            <span
              onClick={() => setSort("asc")}
              className="px-4  dark:bg-primary peer-checked:dark:bg-gray-700"
            >
              LOW
            </span>
            <span
              onClick={() => setSort("desc")}
              className="px-4  dark:bg-gray-700 peer-checked:dark:bg-primary"
            >
              HIGH
            </span>
          </label>
        </div>

        <div className="pt-4">
          <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">
            size
          </h3>
          <div className="flex items-center gap-2">
            <div className="size-selector">
              <input type="radio" name="size" id="size-xs" className="hidden" />
              <label
                htmlFor="size-xs"
                className="text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600"
              >
                XS
              </label>
            </div>
            <div className="size-selector">
              <input type="radio" name="size" id="size-sm" className="hidden" />
              <label
                htmlFor="size-sm"
                className="text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600"
              >
                S
              </label>
            </div>
            <div className="size-selector">
              <input type="radio" name="size" id="size-m" className="hidden" />
              <label
                htmlFor="size-m"
                className="text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600"
              >
                M
              </label>
            </div>
            <div className="size-selector">
              <input type="radio" name="size" id="size-l" className="hidden" />
              <label
                htmlFor="size-l"
                className="text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600"
              >
                L
              </label>
            </div>
            <div className="size-selector">
              <input type="radio" name="size" id="size-xl" className="hidden" />
              <label
                htmlFor="size-xl"
                className="text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600"
              >
                XL
              </label>
            </div>
          </div>
        </div>
        <button
          onClick={() => {
            setCategory(""), setSort("asc"), setSearchTerm("");
          }}
          className="block w-full py-1 text-center text-white bg-primary border border-primary rounded-b hover:bg-transparent hover:text-primary transition"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default SideBar;
