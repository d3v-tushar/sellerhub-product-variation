import { useState } from "react";
import AttributeOptions from "../components/AttributeOptions";

const Demo = () => {
  const [attributes, setAttributes] = useState([]);
  const [options, setOptions] = useState({});

  const removeAttr = (indexToRemove) => {
    const updatedAttributes = [...attributes];
    updatedAttributes.splice(indexToRemove, 1);
    setAttributes(updatedAttributes);

    // Remove options associated with the removed attribute
    const updatedOptions = { ...options };
    delete updatedOptions[indexToRemove];
    setOptions(updatedOptions);
  };

  const addAttr = (event) => {
    if (event.target.value !== "") {
      const newAttribute = event.target.value;
      setAttributes([...attributes, newAttribute]);

      // Initialize options for the new attribute
      setOptions({
        ...options,
        [attributes.length]: [], // Initialize with an empty array
      });

      event.target.value = "";
    }
  };

  const addOption = (attrIndex, option) => {
    const updatedOptions = { ...options };
    updatedOptions[attrIndex].push(option);
    setOptions(updatedOptions);
  };

  console.log(attributes);
  console.log(options);

  return (
    // ... Your existing JSX code ...

    <div className="col-span-2 m-2">
      <h4 className="text-base font-semibold text-gray-700">
        Attribute & Options You have selected
      </h4>
      <div className="bg-white rounded-md p-4">
        {attributes.map((attr, index) => (
          <div key={index} className="mb-4">
            <h4 className="text-base font-semibold text-gray-700">{attr}</h4>
            <div className="flex flex-wrap gap-2">
              {options[index].map((option, optionIndex) => (
                <div key={optionIndex} className="px-3 py-1 border rounded-md">
                  {option}
                </div>
              ))}
              <div className="relative border rounded-md">
                <details className="group w-full mx-4 my-1">
                  <summary className="flex cursor-pointer items-center gap-2 border-gray-400 pb-1 text-gray-900 transition hover:border-gray-600">
                    <span className="text-sm font-medium text-blue-800">
                      + Add Option
                    </span>
                  </summary>
                  <div className="z-50 group-open:absolute group-open:top-auto group-open:left-0 group-open:mt-2 ltr:group-open:start-0">
                    <div className="w-64 rounded border border-gray-200 bg-white p-4">
                      <label
                        htmlFor={`optionInput-${index}`}
                        className="grid items-center gap-2"
                      >
                        <span className="text-sm font-medium text-gray-700">
                          Option Name
                        </span>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            id={`optionInput-${index}`}
                            placeholder="Press Enter To Add"
                            onKeyUp={(event) =>
                              event.key === "Enter"
                                ? addOption(index, event.target.value)
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
  );
};

export default Demo;
