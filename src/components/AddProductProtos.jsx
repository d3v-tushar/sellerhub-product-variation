import { useState } from "react";

const AddProductProtos = () => {
  const [selectedImages, setSelectedImages] = useState([]);
  // Function to handle file selection
  const handleFileSelect = (event) => {
    const files = event.target.files;
    const newImages = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      if (file.type.startsWith("image/")) {
        const reader = new FileReader();

        reader.onload = (e) => {
          newImages.push(e.target.result);
          setSelectedImages((prevImages) => [...newImages, ...prevImages]);
        };

        reader.readAsDataURL(file);
      }
    }
  };

  return (
    <div className="w-11/12 mx-auto my-4 grid grid-cols-3">
      <div className="border">
        <span className="arrow">
          Default Photos {`(${selectedImages.length}/12 Photos)`}
        </span>
      </div>
      <div className="flex justify-center items-center border-t border-b">
        <label
          htmlFor="dropzone-file"
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
            id="dropzone-file"
            className="hidden"
            multiple
            accept="image/*"
            onChange={handleFileSelect}
          />
        </label>
      </div>
      <div className="image-preview border grid grid-cols-3 even:border-l">
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
        {selectedImages.length < 12
          ? [...Array(11 - selectedImages.length)].map((_, index) => (
              <img
                key={index}
                className="border"
                src="https://cobblestone.me/wp-content/plugins/photonic/include/images/placeholder-Sm.png"
                alt={`Placeholder ${index + 1}`}
              />
            ))
          : null}
        {selectedImages.length
          ? selectedImages.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`Selected ${index + 1}`}
                className="image-thumbnail"
              />
            ))
          : null}
      </div>
    </div>
  );
};

export default AddProductProtos;
