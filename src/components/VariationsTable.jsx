import React, { useState, useEffect } from "react";

const VariationsTable = ({ attributes }) => {
  const [variations, setVariations] = useState([]);

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
    "Variation",
    ...attributes.map((attr) => attr.attribute),
    "Price",
    "Quantity",
    "SKU",
  ];

  // Initialize variation data AFTER variations are populated
  useEffect(() => {
    const initialVariationData = variations.map((variation, index) => ({
      id: index,
      variationName: variation.map((opt) => opt.name).join(" - "),
      price: "",
      quantity: "",
      sku: "",
    }));
    setVariationData(initialVariationData);
  }, [variations]);

  const [variationData, setVariationData] = useState([]);

  // Update variation data
  const handleUpdateVariation = (id, field, value) => {
    const updatedVariationData = variationData.map((variation) =>
      variation.id === id ? { ...variation, [field]: value } : variation
    );
    setVariationData(updatedVariationData);
  };

  return (
    <div className="w-11/12 mx-auto my-4">
      <h2 className="text-lg font-semibold text-gray-700 my-2 capitalize">
        Manage Variations
      </h2>
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            {tableHeaders.map((header) => (
              <th
                key={header}
                className="border border-gray-300 px-4 py-2 text-left bg-gray-100"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {variationData.map((variation) => (
            <tr key={variation.id}>
              <td className="border border-gray-300 px-4 py-2">
                {variation.variationName}
              </td>
              {attributes.map((attr, index) => (
                <td key={index} className="border border-gray-300 px-4 py-2">
                  {variation[attr.attribute]}
                </td>
              ))}
              <td className="border border-gray-300 px-4 py-2">
                <input
                  type="text"
                  value={variation.price}
                  onChange={(e) =>
                    handleUpdateVariation(variation.id, "price", e.target.value)
                  }
                />
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <input
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
                  type="text"
                  value={variation.sku}
                  onChange={(e) =>
                    handleUpdateVariation(variation.id, "sku", e.target.value)
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
