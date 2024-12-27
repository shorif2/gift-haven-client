const Categories = () => {
  return (
    <div className="container py-16">
      <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">
        shop by category
      </h2>
      <div className="grid grid-cols-3 gap-3">
        <div className="relative rounded-sm overflow-hidden group">
          <img
            src="/images/category/flowers.jpg"
            alt="category 1"
            className="w-full"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-white font-roboto font-medium group-hover:bg-opacity-60 transition">
            Flowers
          </div>
        </div>
        <div className="relative rounded-sm overflow-hidden group">
          <img
            src="/images/category/watch.jpg"
            alt="category 1"
            className="w-full"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-white font-roboto font-medium group-hover:bg-opacity-60 transition">
            Watch
          </div>
        </div>
        <div className="relative rounded-sm overflow-hidden group">
          <img
            src="/images/category/neckless.jpg"
            alt="neckless "
            className="w-full"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-white font-roboto font-medium group-hover:bg-opacity-60 transition">
            Neckless
          </div>
        </div>
        <div className="relative rounded-sm overflow-hidden group">
          <img
            src="/images/category/birthday.jpg"
            alt="category 1"
            className="w-full"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-white font-roboto font-medium group-hover:bg-opacity-60 transition">
            BirthDay
          </div>
        </div>
        <div className="relative rounded-sm overflow-hidden group">
          <img
            src="/images/category/wedding.jpg"
            alt="category 1"
            className="w-full"
          />
          <a className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-white font-roboto font-medium group-hover:bg-opacity-60 transition">
            Wedding
          </a>
        </div>
        <div className="relative rounded-sm overflow-hidden group">
          <img
            src="/images/category/category-6.jpg"
            alt="category 1"
            className="w-full"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-white font-roboto font-medium group-hover:bg-opacity-60 transition">
            Kitchen
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
