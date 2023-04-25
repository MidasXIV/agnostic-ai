const MenuBar = () => {
  return (
    <header className="flex items-center justify-between px-2 py-3 bg-gray-50 mx-2 mt-2 rounded-lg">
      <div className="flex items-center">
        <h1 className="text-lg font-bold text-gray-700 mr-4">Uno</h1>
      </div>
      <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
        Change Theme
      </button>
    </header>
  );
};

export default MenuBar;
