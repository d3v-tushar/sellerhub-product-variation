import { useEffect, useState } from "react";
import "./App.css";
import SelectedAttributeOptions from "./components/SelectedAttributeOptions";
import CreateVariation from "./pages/CreateVariation";
import AddProductProtos from "./components/AddProductProtos";
import VariationPhotos from "./components/VariationPhotos";
import VariationsTable from "./components/VariationsTable";

function App() {
  const [attributes, setAttributes] = useState([]);
  const [showSelectedAttributes, setShowSelectedAttributes] = useState(false);

  useEffect(() => {
    const details = [...document.querySelectorAll("details")];
    document.addEventListener("click", function (e) {
      if (!details.some((f) => f.contains(e.target))) {
        details.forEach((f) => f.removeAttribute("open"));
      } else {
        details.forEach((f) =>
          !f.contains(e.target) ? f.removeAttribute("open") : ""
        );
      }
    });
  }, []);
  return (
    <div>
      {!showSelectedAttributes ? (
        <CreateVariation
          attributes={attributes}
          setAttributes={setAttributes}
          setShowSelectedAttributes={setShowSelectedAttributes}
        />
      ) : (
        <SelectedAttributeOptions
          attributes={attributes}
          setShowSelectedAttributes={setShowSelectedAttributes}
        />
      )}

      <details
        className="group [&_summary::-webkit-details-marker]:hidden w-11/12 mx-auto my-8"
        open
      >
        <summary className="flex cursor-pointer items-center gap-x-2 text-gray-900">
          <svg
            className="h-5 w-5 shrink-0 transition duration-300 group-open:rotate-180 border rounded-md"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
          <h2 className="font-medium text-lg">Photos</h2>
        </summary>
        <div>
          <AddProductProtos />
          {Object.keys(attributes) && showSelectedAttributes ? (
            <>
              <VariationPhotos
                attributes={attributes}
                setAttributes={setAttributes}
              />
              <VariationsTable attributes={attributes} />
            </>
          ) : null}
        </div>
      </details>
    </div>
  );
}

export default App;
