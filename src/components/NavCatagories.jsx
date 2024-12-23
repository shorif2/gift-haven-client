const NavCatagories = () => {
  return (
    <div className="px-8 py-4 bg-primary md:flex items-center cursor-pointer relative group hidden">
      <span className="text-white">
        <i className="fa-solid fa-bars"></i>
      </span>
      <span className="capitalize ml-2 text-white hidden md:block">
        All Categories
      </span>

      <div className="absolute left-0 top-full bg-white shadow-md py-3 divide-y divide-gray-300 divide-dashed opacity-0 group-hover:opacity-100 transition duration-300 invisible group-hover:visible w-[600px]">
        <div className="flex items-center px-6 py-3 hover:bg-gray-100 transition">
          <img
            src="/images/icons/sofa.svg"
            alt="sofa"
            className="w-5 h-5 object-contain"
          />
          <span className="ml-6 text-gray-600 text-sm">Sofa</span>
        </div>
        <div className="flex items-center px-6 py-3 hover:bg-gray-100 transition">
          <img
            src="/images/icons/terrace.svg"
            alt="terrace"
            className="w-5 h-5 object-contain"
          />
          <span className="ml-6 text-gray-600 text-sm">Living Room</span>
        </div>
        <div className="flex items-center px-6 py-3 hover:bg-gray-100 transition">
          <img
            src="/images/icons/bed.svg"
            alt="bed"
            className="w-5 h-5 object-contain"
          />
          <span className="ml-6 text-gray-600 text-sm">Bedroom</span>
        </div>
        <div className="flex items-center px-6 py-3 hover:bg-gray-100 transition">
          <img
            src="/images/icons/office.svg"
            alt="Outdoor"
            className="w-5 h-5 object-contain"
          />
          <span className="ml-6 text-gray-600 text-sm">Outdoor</span>
        </div>
        <div className="flex items-center px-6 py-3 hover:bg-gray-100 transition">
          <img
            src="/images/icons/outdoor-cafe.svg"
            alt="outdoor"
            className="w-5 h-5 object-contain"
          />
          <span className="ml-6 text-gray-600 text-sm">Outdoor</span>
        </div>
        <div className="flex items-center px-6 py-3 hover:bg-gray-100 transition">
          <img
            src="/images/icons/bed-2.svg"
            alt="Mattress"
            className="w-5 h-5 object-contain"
          />
          <span className="ml-6 text-gray-600 text-sm">Mattress</span>
        </div>
      </div>
    </div>
  );
};

export default NavCatagories;
