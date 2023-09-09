const SelectedAttributeOptions = ({
  attributes,
  setShowSelectedAttributes,
}) => {
  // Calculate the number of variations and attributes
  const numVariations = attributes.reduce(
    (acc, attr) => acc * (attr.options.length || 1),
    1
  );

  return (
    <div className="w-11/12 mx-auto my-4">
      <div className="flex gap-2">
        <h2 className="text-lg font-semibold text-gray-700 my-2 capitalize">
          Attributes & Options you have selected
        </h2>
        <button
          onClick={() => setShowSelectedAttributes(false)}
          className="focus:outline-none active:text-opacity-75"
        >
          <span className="block rounded-xl bg-white px-4 py-1 border border-gray-600 text-sm font-medium hover:bg-transparent">
            Edit
          </span>
        </button>
      </div>

      <div className="flow-root rounded-lg w-full lg:w-1/2 border py-3 shadow-sm">
        <dl className="-my-3 divide-y text-sm">
          <div className="grid grid-cols-1 justify-between gap-1 p-3 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900 border-r">
              Number Of Variations
            </dt>
            <dd className="text-gray-700 sm:col-span-2">{numVariations}</dd>
          </div>

          {attributes.map((attr, index) => (
            <div
              key={index}
              className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4"
            >
              <dt className="font-medium text-gray-900 border-r capitalize">
                {attr.attribute}
              </dt>
              <dd className="text-gray-700 sm:col-span-2">
                {attr.options.map((option) => option.name).join(", ")}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
};

export default SelectedAttributeOptions;
