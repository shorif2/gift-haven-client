const DrawerToggle = () => {
  return (
    <div className="text-center md:hidden">
      <button
        className="text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 block md:hidden"
        type="button"
        data-drawer-target="drawer-example"
        data-drawer-show="drawer-example"
        aria-controls="drawer-example"
      >
        <i className="fa-solid fa-chevron-right"></i>
        <i className="fa-solid fa-chevron-right"></i>
      </button>
    </div>
  );
};

export default DrawerToggle;
