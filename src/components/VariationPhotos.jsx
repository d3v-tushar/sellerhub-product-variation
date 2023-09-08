// import { useState } from "react";

// const VariationPhotos = () => {
//   // Your attributes data
//   const attributes = [
//     {
//       attribute: "color",
//       options: [
//         { name: "green", images: [] },
//         { name: "yellow", images: [] },
//         { name: "blue", images: [] },
//       ],
//     },
//     // Add more attributes as needed
//   ];
//   const [selectedImages, setSelectedImages] = useState({});
//   const [selectedAttribute, setSelectedVariation] = useState("default");
//   const [selectedOption, setSelectedOption] = useState("");

//   // Function to handle file selection for the selected variation
//   const handleFileSelect = (event) => {
//     const files = event.target.files;
//     const newImages = [];

//     for (let i = 0; i < files.length; i++) {
//       const file = files[i];

//       if (file.type.startsWith("image/")) {
//         const reader = new FileReader();

//         reader.onload = (e) => {
//           newImages.push(e.target.result);

//           // Update the selectedImages state for the specific option
//           setSelectedImages((prevSelectedImages) => ({
//             ...prevSelectedImages,
//             [selectedAttribute]: [
//               ...(prevSelectedImages[selectedAttribute] || []),
//               ...newImages,
//             ],
//           }));

//           // Update the images array for the selected option
//           const selectedAttribute = attributes.find(
//             (attribute) => attribute.attribute === selectedAttribute
//           );
//           if (selectedAttribute) {
//             const updatedOptions = selectedAttribute.options.map((option) =>
//               option.name === selectedAttribute
//                 ? { ...option, images: [...option.images, ...newImages] }
//                 : option
//             );
//             selectedAttribute.options = updatedOptions;
//           }
//         };

//         reader.readAsDataURL(file);
//       }
//     }
//   };

//   //console.log(attributes);

//   // Function to render select menu with attribute options
//   const renderAttributeOptions = () => {
//     return (
//       <div className="mb-4 flex flex-col w-11/12 mx-auto">
//         <label
//           className="text-base font-medium text-gray-700"
//           htmlFor="attribute-select"
//         >
//           Variation Images
//         </label>
//         <select
//           id="attribute-select"
//           className="p-1 border-2 border-gray-800 w-fit rounded-md"
//           onChange={(e) => setSelectedVariation(e.target.value)}
//         >
//           <option value="default">Use Default Photos</option>
//           {attributes.map((attribute, index) => (
//             <option
//               className="capitalize"
//               key={index}
//               value={`${attribute.attribute}`}
//             >
//               {`${attribute.attribute}`}
//             </option>
//           ))}
//         </select>
//       </div>
//     );
//   };

//   // Function to display selected images for the selected variation
//   const renderSelectedImages = () => {
//     const images = selectedImages[selectedAttribute] || [];
//     console.log(attributes);
//     console.log(selectedOption);

//     return (
//       <div className="w-11/12 mx-auto my-4 grid grid-cols-3">
//         <div className="border">
//           <fieldset className="grid grid-cols-2 gap-4">
//             <div>
//               {attributes
//                 .filter(
//                   (attribute) => attribute.attribute === selectedAttribute
//                 )
//                 .map((attribute) =>
//                   attribute.options.map((option) => (
//                     <label
//                       htmlFor={option}
//                       className="block cursor-pointer rounded-lg border border-gray-100 bg-white p-4 text-sm font-medium shadow-sm hover:border-gray-200 peer-checked:border-blue-500 peer-checked:ring-1 peer-checked:ring-blue-500"
//                     >
//                       <p>{option.name}</p>
//                       <input
//                         type="radio"
//                         value={option}
//                         id={option}
//                         className="peer hidden [&:checked_+_label_svg]:block"
//                         onChange={(e) => setSelectedOption(e.target.value)}
//                       />

//                       <svg
//                         className="hidden h-5 w-5 text-blue-600"
//                         xmlns="http://www.w3.org/2000/svg"
//                         viewBox="0 0 20 20"
//                         fill="currentColor"
//                       >
//                         <path
//                           fillRule="evenodd"
//                           d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
//                           clipRule="evenodd"
//                         />
//                       </svg>
//                     </label>
//                   ))
//                 )}
//             </div>
//           </fieldset>

//           {/* {attributes
//             .filter((attribute) => attribute.attribute === selectedVariation)
//             .map((attribute) =>
//               attribute.options.map((option) => (
//                 <span
//                   key={`${attribute.attribute}-${option.name}`}
//                   className="arrow capitalize"
//                 >
//                   {option.name}
//                 </span>
//               ))
//             )} */}
//         </div>
//         <div className="border-t border-b">
//           <label
//             htmlFor={`${selectedAttribute}-photos`}
//             className="flex flex-col items-center w-10/12 max-w-lg p-5 mx-auto mt-2 text-center bg-white border-2 border-gray-300 border-dashed cursor-pointer dark:bg-gray-900 dark:border-gray-700 rounded-xl"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               strokeWidth="1.5"
//               stroke="currentColor"
//               className="w-8 h-8 text-gray-500 dark:text-gray-400"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
//               />
//             </svg>

//             <h2 className="mt-1 font-medium tracking-wide text-gray-700 dark:text-gray-200">
//               Add Photos
//             </h2>

//             <p className="mt-2 text-xs tracking-wide text-gray-500 dark:text-gray-400">
//               Upload or darg & drop your images SVG, PNG, JPG or GIF.{" "}
//             </p>
//             <input
//               type="file"
//               id={`${selectedAttribute}-photos`}
//               className="hidden"
//               multiple
//               accept="image/*"
//               onChange={handleFileSelect}
//             />
//           </label>
//         </div>
//         <div className="image-preview border grid grid-cols-3 even:border-l">
//           {images.map((src, index) => (
//             <img
//               key={index}
//               src={src}
//               alt={`${selectedAttribute} - Image ${index + 1}`}
//               className="image-thumbnail"
//             />
//           ))}
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="mx-auto my-4">
//       {renderAttributeOptions()}
//       {renderSelectedImages()}
//     </div>
//   );
// };

// export default VariationPhotos;

import { useState } from "react";

const VariationPhotos = () => {
  const [selectedImages, setSelectedImages] = useState({});
  const [selectedAttribute, setSelectedAttribute] = useState("default");
  const [selectedOption, setSelectedOption] = useState("");

  // Your attributes data
  const attributes = [
    {
      attribute: "color",
      options: [
        { name: "green", images: [] },
        { name: "yellow", images: [] },
        { name: "blue", images: [] },
      ],
    },
    // Add more attributes as needed
  ];

  // Function to handle file selection for the selected option
  const handleFileSelect = (event) => {
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
          className="p-1 border-2 border-gray-300 w-fit rounded-md"
          onChange={(e) => setSelectedAttribute(e.target.value)}
        >
          <option value="default">Use Default Photos</option>
          {attributes.map((attribute, index) => (
            <option
              className="capitalize"
              key={index}
              value={`${attribute.attribute}`}
            >
              {`${attribute.attribute}`}
            </option>
          ))}
        </select>
      </div>
    );
  };

  // Function to render options for the selected attribute
  const renderOptionSelect = () => {
    const selectedAttributeData = attributes.find(
      (attribute) => attribute.attribute === selectedAttribute
    );

    if (!selectedAttributeData) {
      return null;
    }

    return <div className="mb-4 flex flex-col w-11/12 mx-auto"></div>;
  };

  const selectedAttributeData = attributes.find(
    (attribute) => attribute.attribute === selectedAttribute
  );

  console.log(attributes);
  console.log(selectedOption);

  // Function to display selected images for the selected option
  const renderSelectedImages = () => {
    const images =
      selectedImages[`${selectedAttribute}-${selectedOption}`] || [];

    return (
      <div className="w-11/12 mx-auto my-4 grid grid-cols-3">
        <div className="border">
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
        <div className="border-t border-b flex justify-center items-center">
          <label
            htmlFor={`${selectedAttribute}-photos`}
            className="flex flex-col items-center w-10/12 max-w-lg p-5 mx-auto mt-2 text-center bg-white border-2 border-gray-300 border-dashed cursor-pointer dark:bg-gray-900 dark:border-gray-700 rounded-xl"
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
              Upload or darg & drop your file SVG, PNG, JPG or GIF.{" "}
            </p>
            <input
              type="file"
              id={`${selectedAttribute}-photos`}
              className="hidden"
              multiple
              accept="image/*"
              onChange={handleFileSelect}
            />
          </label>
        </div>
        <div className="image-preview border grid grid-cols-3 even:border-l justify-center items-center">
          <label
            htmlFor="add-photos"
            className="flex justify-center items-center"
          >
            <span className="text-sm font-medium text-blue-800 cursor-pointer">
              + Add Photos
            </span>
            <input
              type="file"
              id="add-photos"
              className="hidden"
              multiple
              accept="image/*"
              onChange={handleFileSelect}
            />
          </label>
          {images.length < 12
            ? [...Array(11 - images.length)].map((_, index) => (
                <img
                  key={index}
                  className="border h-28 w-36"
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
                  className="border h-28 w-36"
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

      {renderSelectedImages()}
    </div>
  );
};

export default VariationPhotos;
