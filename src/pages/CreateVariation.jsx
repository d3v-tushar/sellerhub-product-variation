/* eslint-disable react/prop-types */

import { useState } from "react";
import AttributeOptions from "../components/AttributeOptions";

const CreateVariation = () => {
  const [attributes, setAttributes] = useState([]);

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
    updatedAttributes[attrIndex].options.push(event.target.value.toLowerCase());
    setAttributes(updatedAttributes);
    event.target.value = "";
  };

  const removeOption = (attrIndex, optionIndex) => {
    const updatedAttributes = [...attributes];
    updatedAttributes[attrIndex].options.splice(optionIndex, 1);
    setAttributes(updatedAttributes);
  };

  console.log(attributes);
  return (
    <div className="min-h-[100svh] p-8 bg-gray-200">
      <h2 className="text-lg font-semibold text-gray-700">
        Create your variations
      </h2>

      <div className="grid grid-cols-4 m-4">
        <div className="col-span-2 m-2">
          <h4 className="text-base font-semibold text-gray-700 m-1">
            Variations
          </h4>

          <div className="bg-white p-4 rounded-md">
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
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-6 h-6 text-gray-600"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
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
        <div className="col-span-2 m-2">
          <h4 className="text-base font-semibold text-gray-700 m-1">
            Attribute Options
          </h4>

          <div className="bg-white rounded-md p-4">
            {attributes.map((attr, index) => (
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
                      <span className="text-base mr-2">{option}</span>

                      <button onClick={() => removeOption(index, optionIndex)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="w-6 h-6 text-gray-600"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
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
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateVariation;
