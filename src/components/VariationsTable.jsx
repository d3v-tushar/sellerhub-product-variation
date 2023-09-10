import React, { useState, useEffect } from "react";

const VariationsTable = ({ attributes }) => {
  const [variations, setVariations] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [selected, setSelected] = useState([]);

  // Calculate the total number of variations
  const numVariations = attributes.reduce(
    (acc, attr) => acc * (attr.options.length || 1),
    1
  );

  // Generate all possible combinations of attribute options
  useEffect(() => {
    const generateVariations = () => {
      const attributeCombinations = [[]];
      attributes.forEach((attribute) => {
        const newCombinations = [];
        attributeCombinations.forEach((combination) => {
          attribute.options.forEach((option) => {
            newCombinations.push([...combination, option]);
          });
        });
        attributeCombinations.length = 0;
        attributeCombinations.push(...newCombinations);
      });
      return attributeCombinations;
    };

    const variations = generateVariations();
    setVariations(variations);
  }, [attributes]);

  // Define table headers
  const tableHeaders = [
    {
      key: "selectAll",
      label: "Select All",
    },
    {
      key: "actions",
      label: "Actions",
    },
    {
      key: "photos",
      label: "Photos",
    },
    {
      key: "sku",
      label: "SKU",
    },
    {
      key: "upc",
      label: "UPC",
    },
    ...attributes.map((attr) => ({
      key: attr.attribute.toLowerCase(),
      label: attr.attribute[0].toUpperCase() + attr.attribute.slice(1),
    })),
    {
      key: "quantity",
      label: "Quantity",
    },
    {
      key: "price",
      label: "Price",
    },
  ];

  // Initialize variation data AFTER variations are populated
  useEffect(() => {
    const initialVariationData = variations.map((variation, index) => ({
      id: index,
      variationName: variation.map((opt) => opt.name).join(" - "),
      variationNameOptions: variation.map((opt) => opt.name), // New field
      select: false,
      photos: 0,
      sku: "",
      upc: "",
      quantity: "1",
      price: "",
    }));

    setVariationData(initialVariationData);
  }, [variations]);

  const [variationData, setVariationData] = useState([]);

  // Update variation data
  const handleUpdateVariation = (id, field, value, attrIndex) => {
    const updatedVariationData = variationData.map((variation) =>
      variation.id === id ? { ...variation, [field]: value } : variation
    );

    // Generate the variation name based on selected options for each attribute
    updatedVariationData.forEach((variation) => {
      const selectedOptions = attributes.map((attr, index) => {
        const optionName =
          index === attrIndex ? value : variation.variationNameOptions[index];
        return optionName ? `${attr.attribute}: ${optionName}` : "";
      });
      variation.variationName = selectedOptions.join(", ");
    });

    setVariationData(updatedVariationData);
  };

  // Toggle select for a variation
  const handleToggleSelect = (id) => {
    const updatedVariationData = variationData.map((variation) =>
      variation.id === id
        ? { ...variation, select: !variation.select }
        : variation
    );
    setVariationData(updatedVariationData);

    // Check if the ID is already in the selected array
    if (selected.includes(id)) {
      // If it's already selected, remove it from the selected array
      setSelected(selected.filter((selectedId) => selectedId !== id));
    } else {
      // If it's not selected, add it to the selected array
      setSelected([...selected, id]);
    }
  };

  // Handle select all rows
  const handleSelectAll = () => {
    const updatedSelectAll = !selectAll;
    const updatedVariationData = variationData.map((variation) => ({
      ...variation,
      select: updatedSelectAll,
    }));
    setVariationData(updatedVariationData);
    setSelectAll(updatedSelectAll);

    if (updatedSelectAll) {
      // Select all variations
      const allIds = variationData.map((variation) => variation.id);
      setSelected(allIds);
    } else {
      // Deselect all variations
      setSelected([]);
    }
  };

  // Delete selected variations
  const handleDeleteVariations = () => {
    const updatedVariationData = variationData.filter(
      (variation) => !variation.select
    );
    setVariationData(updatedVariationData);
  };

  // Placeholder function to handle entering price
  const handleEnterPrice = (value) => {
    const updatedVariationData = variationData.map((variation) => {
      if (selected.includes(variation.id)) {
        return { ...variation, price: value };
      }
      return variation;
    });

    setVariationData(updatedVariationData);
  };

  return (
    <div className="w-11/12 mx-auto my-8">
      <h2 className="text-lg font-semibold text-gray-700 my-2 capitalize">
        {`Variation Combinations (${numVariations})`}
      </h2>
      <div className="flex gap-2 my-2">
        <div className="relative border rounded-md flex items-center">
          <details className="group w-full mx-4 my-1">
            <summary className="flex cursor-pointer items-center gap-2 border-gray-400 pb-1 text-gray-900 transition hover:border-gray-600">
              <span className="text-sm font-medium text-blue-800">
                Enter Price
              </span>
            </summary>

            <div className="z-50 group-open:absolute shadow-lg group-open:top-auto group-open:left-0 group-open:mt-2 ltr:group-open:start-0">
              <div className="w-60 rounded border border-gray-200 bg-white p-4">
                <label
                  htmlFor="CreateYourOwn"
                  className="grid items-center gap-2"
                >
                  <span className="text-sm font-medium text-gray-700">
                    Enter Price For Selected
                  </span>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      id="CreateYourOwn"
                      placeholder="Press Enter To Add"
                      onKeyUp={(event) =>
                        event.key === "Enter"
                          ? handleEnterPrice(event.target.value)
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
        <button
          //   onClick={() => handleEnterQuantity(variation.id)}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        >
          Enter Quantity
        </button>
        <button
          //   onClick={() => handleEnterSKU(variation.id)}
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
        >
          Enter SKU
        </button>
        <button
          //   onClick={() => handleDeleteVariations(variation.id)}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
        >
          Delete
        </button>
      </div>
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            {tableHeaders.map((header) => (
              <th key={header.key} className="border border-gray-300 px-4 py-2">
                {header.key === "selectAll" ? (
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={handleSelectAll}
                  />
                ) : (
                  header.label
                )}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {variationData.map((variation) => (
            <tr key={variation.id}>
              <td className="border border-gray-300 px-4 py-2">
                <input
                  type="checkbox"
                  checked={variation.select}
                  onChange={() => handleToggleSelect(variation.id)}
                />
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  onClick={() => handleDeleteVariations(variation.id)}
                  className="text-blue-800 font-bold"
                >
                  Delete
                </button>
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {variation.photos}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <input
                  className="focus:outline-none"
                  type="text"
                  value={variation.sku}
                  onChange={(e) =>
                    handleUpdateVariation(variation.id, "sku", e.target.value)
                  }
                />
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <input
                  className="focus:outline-none"
                  type="text"
                  value={variation.upc}
                  onChange={(e) =>
                    handleUpdateVariation(variation.id, "upc", e.target.value)
                  }
                />
              </td>

              {/* Render attribute columns */}
              {attributes.map((attr, attrIndex) => (
                <td
                  key={attrIndex}
                  className="border border-gray-300 px-4 py-2 capitalize"
                >
                  {attrIndex === 0
                    ? variation.variationNameOptions[attrIndex]
                    : variation.variationNameOptions[attrIndex]}
                </td>
              ))}

              <td className="border border-gray-300 px-4 py-2">
                <input
                  className="focus:outline-none w-16"
                  type="text"
                  value={variation.quantity}
                  onChange={(e) =>
                    handleUpdateVariation(
                      variation.id,
                      "quantity",
                      e.target.value
                    )
                  }
                />
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <input
                  className="focus:outline-none w-24"
                  type="text"
                  value={variation.price}
                  onChange={(e) =>
                    handleUpdateVariation(variation.id, "price", e.target.value)
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VariationsTable;
