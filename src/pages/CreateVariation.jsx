/* eslint-disable react/prop-types */

const CreateVariation = ({
  attributes,
  setAttributes,
  setShowSelectedAttributes,
}) => {
  const removeAttr = (indexToRemove) => {
    setAttributes([
      ...attributes.filter((_, index) => index !== indexToRemove),
    ]);
  };
  const addAttr = (event) => {
    if (event.target.value !== "") {
      const newAttribute = {
        attribute: event.target.value.toLowerCase(),
        options: [],
      };
      setAttributes([...attributes, newAttribute]);

      event.target.value = "";
    }
  };

  const addOption = (attrIndex, event) => {
    const updatedAttributes = [...attributes];
    updatedAttributes[attrIndex].options.push({
      name: event.target.value.toLowerCase(),
    });
    setAttributes(updatedAttributes);
    event.target.value = "";
  };

  const removeOption = (attrIndex, optionIndex) => {
    const updatedAttributes = [...attributes];
    updatedAttributes[attrIndex].options.splice(optionIndex, 1);
    setAttributes(updatedAttributes);
  };

  const handleContinue = () => {
    if (Object.keys(attributes).length) setShowSelectedAttributes(true);
    else window.alert("No Variations Selected");
  };

  return (
    <div className="w-11/12 mx-auto">
      <h2 className="text-lg font-semibold text-gray-700 capitalize">
        Create your variations
      </h2>

      <div className=" flex flex-col lg:flex-row gap-2 my-2">
        <div className="my-2 w-full border">
          <h4 className="text-base font-semibold text-gray-700 m-1 ">
            Variations
          </h4>

          <div className="p-4 border-t">
            <h4 className="text-base font-medium text-gray-700">Attributes</h4>
            <div className="flex-wrap inline-flex my-2">
              <div className="flex flex-wrap gap-2">
                {attributes.map((attr, index) => (
                  <div key={index} className="px-3 py-1 border rounded-md flex">
                    <span className="text-base mr-2 capitalize">
                      {attr.attribute}
                    </span>

                    <button onClick={() => removeAttr(index)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6 text-gray-600"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
                <div className="relative border rounded-md">
                  <details className="group w-full mx-4 my-1">
                    <summary className="flex cursor-pointer items-center gap-2 border-gray-400 pb-1 text-gray-900 transition hover:border-gray-600">
                      <span className="text-sm font-medium text-blue-800">
                        + Add Attribute
                      </span>
                    </summary>

                    <div className="z-50 group-open:absolute group-open:top-auto group-open:left-0 group-open:mt-2 ltr:group-open:start-0">
                      <div className="w-60 rounded border border-gray-200 bg-white p-4">
                        <label
                          htmlFor="CreateYourOwn"
                          className="grid items-center gap-2"
                        >
                          <span className="text-sm font-medium text-gray-700">
                            Attriute Name
                          </span>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              id="CreateYourOwn"
                              placeholder="Press Enter To Add"
                              onKeyUp={(event) =>
                                event.key === "Enter" ? addAttr(event) : null
                              }
                              className="px-2 border rounded-md border-gray-200"
                            />
                          </div>
                        </label>
                      </div>
                    </div>
                  </details>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="my-2 w-full border">
          <h4 className="text-base font-semibold text-gray-700 m-1">
            Attribute Options
          </h4>

          <div className="p-4 border-t">
            {attributes.length ? (
              attributes.map((attr, index) => (
                <div
                  key={index}
                  className={attributes.length > 1 ? "mb-4" : "mb-2"}
                >
                  <h4 className="text-base font-medium text-gray-700 capitalize mb-2">
                    {attr.attribute}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {attr.options.map((option, optionIndex) => (
                      <div
                        key={optionIndex}
                        className="px-3 py-1 border rounded-md flex"
                      >
                        <span className="text-base mr-2">{option.name}</span>
                        {/* Here, update to option.name */}
                        <button
                          onClick={() => removeOption(index, optionIndex)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-6 h-6 text-gray-600"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </button>
                      </div>
                    ))}

                    <div className="relative border rounded-md">
                      <details className="group w-full mx-4 my-1">
                        <summary className="flex cursor-pointer items-center gap-2 border-gray-400 pb-1 text-gray-900 transition hover:border-gray-600">
                          <span className="text-sm font-medium text-blue-800">
                            + Add Option
                          </span>
                        </summary>
                        <div className="z-50 group-open:absolute group-open:top-auto group-open:left-0 group-open:mt-2 ltr:group-open:start-0 shadow-md">
                          <div className="w-60 rounded border border-gray-200 bg-white p-4">
                            <label
                              htmlFor={`optionInput-${index}`}
                              className="grid items-center gap-2"
                            >
                              <span className="text-sm font-medium text-gray-700 capitalize">
                                {attr.attribute} Option Name
                              </span>
                              <div className="flex gap-2">
                                <input
                                  type="text"
                                  id={`optionInput-${index}`}
                                  placeholder="Press Enter To Add"
                                  onKeyUp={(event) =>
                                    event.key === "Enter"
                                      ? addOption(index, event)
                                      : null
                                  }
                                  className="px-2 border rounded-md border-gray-200"
                                />
                              </div>
                            </label>
                          </div>
                        </div>
                      </details>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-700">
                <span className="text-black font-bold">Important: </span>
                Arrange attributes here in the order you want to appear in your
                listing.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Base */}

      <div className="flex gap-2">
        <button
          onClick={handleContinue}
          className="inline-block rounded border border-indigo-600 bg-blue-600 px-12 py-2 text-sm font-medium text-white hover:bg-blue-500 focus:outline-none focus:ring active:text-blue-500"
        >
          Continue
        </button>
        <button
          className="inline-block rounded border border-indigo-600 px-12 py-2 text-sm font-medium text-blue-600 hover:bg-transparent focus:outline-none focus:ring active:text-blue-500"
          onClick={() => setShowSelectedAttributes(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default CreateVariation;
