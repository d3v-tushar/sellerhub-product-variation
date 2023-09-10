import { useState } from "react";
import "./App.css";
import SelectedAttributeOptions from "./components/SelectedAttributeOptions";
import CreateVariation from "./pages/CreateVariation";
import AddProductProtos from "./components/AddProductProtos";
import VariationPhotos from "./components/VariationPhotos";
import VariationsTable from "./components/VariationsTable";

function App() {
  const [attributes, setAttributes] = useState([]);
  const [showSelectedAttributes, setShowSelectedAttributes] = useState(false);
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
      <AddProductProtos />
      {Object.keys(attributes) && showSelectedAttributes ? (
        <>
          <VariationPhotos attributes={attributes} />
          <VariationsTable attributes={attributes} />
        </>
      ) : null}
    </div>
  );
}

export default App;
