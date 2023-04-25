const SidePanel = () => {
  return (
    <div className="h-full p-4 bg-gray-50 shadow-md rounded-lg flex flex-col">
      <div className="mb-4">
        <label
          htmlFor="name-input"
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          Name
        </label>
        <input
          type="text"
          id="name-input"
          className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="goal-input"
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          Objective
        </label>
        <textarea
          rows={6}
          id="Objective-input"
          placeholder="Objective..."
          className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        />
      </div>
      <div>
        <h2 className="text-sm font-medium text-gray-700 mb-2">Goals</h2>
        <ul>
          <li className="text-sm text-gray-600">Goal 1</li>
          <li className="text-sm text-gray-600">Goal 2</li>
          <li className="text-sm text-gray-600">Goal 3</li>
        </ul>
      </div>
    </div>
  );
};

export default SidePanel;
