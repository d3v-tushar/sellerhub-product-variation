import { useState } from "react";

const VariationPhotos = ({ attributes }) => {
  // Your attributes data
  //   const attributes = [
  //     {
  //       attribute: "color",
  //       options: [
  //         { name: "green", images: [] },
  //         { name: "yellow", images: [] },
  //         { name: "blue", images: [] },
  //       ],
  //     },
  //     {
  //       attribute: "size",
  //       options: [
  //         { name: "s", images: [] },
  //         { name: "m", images: [] },
  //         { name: "l", images: [] },
  //       ],
  //     },
  //   ];
  // Set the initial selected attribute and option
  const [selectedImages, setSelectedImages] = useState({});
  const [selectedAttribute, setSelectedAttribute] = useState("default");
  const [selectedOption, setSelectedOption] = useState("");

  //   useEffect(() => {
  //     if (selectedAttribute !== "default") {
  //       const attributeData = attributes.find(
  //         (attribute) => attribute.attribute === selectedAttribute
  //       );

  //       if (attributeData && attributeData.options.length > 0) {
  //         setSelectedOption(attributeData.options[0].name);
  //       }
  //     }
  //   }, [selectedOption, attributes]);

  // Function to handle file selection for the selected option
  const handleVariationFileSelect = (event) => {
    const files = event.target.files;
    const newImages = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      if (file.type.startsWith("image/")) {
        const reader = new FileReader();

        reader.onload = (e) => {
          newImages.push(e.target.result);

          // Update the selectedImages state for the specific option
          setSelectedImages((prevSelectedImages) => ({
            ...prevSelectedImages,
            [`${selectedAttribute}-${selectedOption}`]: [
              ...(prevSelectedImages[
                `${selectedAttribute}-${selectedOption}`
              ] || []),
              ...newImages,
            ],
          }));

          // Update the images array for the selected option
          const selectedAttributeData = attributes.find(
            (attribute) => attribute.attribute === selectedAttribute
          );
          if (selectedAttributeData) {
            const selectedOptionData = selectedAttributeData.options.find(
              (option) => option.name === selectedOption
            );
            if (selectedOptionData) {
              selectedOptionData.images = [
                ...selectedOptionData.images,
                ...newImages,
              ];
            }
          }
        };

        reader.readAsDataURL(file);
      }
    }
  };

  // Function to render select menu with attribute options
  const renderAttributeSelect = () => {
    return (
      <div className="mb-4 flex flex-col w-11/12 mx-auto">
        <label
          className="text-base font-medium text-gray-700"
          htmlFor="attribute-select"
        >
          Variation Images
        </label>
        <select
          id="attribute-select"
          className="p-1 border-2 border-gray-300 w-fit rounded-md capitalize"
          onChange={(e) => setSelectedAttribute(e.target.value)}
        >
          <option value="default">Use Default Photos</option>
          {attributes.map((attribute, index) => (
            <option
              className="capitalize"
              key={index}
              value={attribute.attribute}
            >
              {`${attribute.attribute}`}
            </option>
          ))}
        </select>
      </div>
    );
  };

  const selectedAttributeData = attributes.find(
    (attribute) => attribute.attribute === selectedAttribute
  );

  // Function to display selected images for the selected option
  const renderSelectedImages = () => {
    const images =
      selectedImages[`${selectedAttribute}-${selectedOption}`] || [];

    return (
      <div className="w-11/12 mx-auto my-4 grid grid-cols-1 lg:grid-cols-3 divide-x divide-y border">
        <div>
          {selectedAttribute !== "default" && (
            <fieldset>
              <legend className="sr-only">Attributes</legend>
              {selectedAttributeData?.options?.map((option, index) => (
                <div onClick={() => setSelectedOption(option.name)} key={index}>
                  <input
                    type="radio"
                    name={option.name}
                    value={option.name}
                    id={option.name}
                    onChange={(e) => setSelectedOption(e.target.value)}
                    className="peer hidden [&:checked_+_label_svg]:block"
                    checked={option.name === selectedOption}
                  />

                  <label
                    htmlFor={option}
                    className="flex cursor-pointer items-center justify-between border-b bg-white p-4 text-sm font-medium peer-checked:bg-blue-300 peer-checked:ring-1 peer-checked:text-white"
                  >
                    <p className="text-gray-700 capitalize">{option.name}</p>
                    <p className="text-gray-900">{`(0/12) Photos`}</p>
                  </label>
                </div>
              ))}
            </fieldset>
          )}
        </div>
        <div className="flex justify-center items-center">
          <label
            htmlFor={`${selectedAttribute}-photos`}
            className="flex flex-col items-center w-10/12 p-5 mx-auto my-8 text-center bg-white border-2 border-gray-300 border-dashed cursor-pointer rounded-xl"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-8 h-8 text-gray-500 dark:text-gray-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
              />
            </svg>

            <h2 className="mt-1 font-medium tracking-wide text-gray-700 dark:text-gray-200">
              Add Photos
            </h2>

            <p className="mt-2 text-xs tracking-wide text-gray-500 dark:text-gray-400">
              Upload your images SVG, PNG, JPG or GIF.{" "}
            </p>
            <input
              type="file"
              id={`${selectedAttribute}-photos`}
              className="hidden"
              multiple
              accept="image/*"
              onChange={handleVariationFileSelect}
            />
          </label>
        </div>
        <div className="divide-x divide-y grid grid-cols-3 justify-center items-center">
          <label
            htmlFor="add-photos"
            className="flex justify-center items-center"
          >
            <span className="text-sm font-medium text-blue-800 cursor-pointer">
              + Add Photos
            </span>
            <input
              type="file"
              id={`${selectedAttribute}-photos`}
              className="hidden"
              multiple
              accept="image/*"
              onChange={handleVariationFileSelect}
            />
          </label>
          {images.length < 12
            ? [...Array(11 - images.length)].map((_, index) => (
                <img
                  key={index}
                  className="aspect-square"
                  src="https://cobblestone.me/wp-content/plugins/photonic/include/images/placeholder-Sm.png"
                  alt={`Placeholder ${index + 1}`}
                />
              ))
            : null}
          {images.length
            ? images.map((src, index) => (
                <img
                  key={index}
                  src={src}
                  alt={`Selected ${index + 1}`}
                  className="aspect-square"
                />
              ))
            : null}
        </div>
      </div>
    );
  };

  return (
    <div className="mx-auto my-4">
      {renderAttributeSelect()}
      {selectedAttribute !== "default" ? renderSelectedImages() : null}
    </div>
  );
};

export default VariationPhotos;
