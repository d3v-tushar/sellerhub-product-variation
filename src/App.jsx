import { useState } from "react";
import "./App.css";
import SelectedAttributeOptions from "./components/SelectedAttributeOptions";
import CreateVariation from "./pages/CreateVariation";
import AddProductProtos from "./components/AddProductProtos";
//import VariationPhotos from "./components/VariationPhotos";

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
        <SelectedAttributeOptions attributes={attributes} />
      )}
      <AddProductProtos />
      {/* <VariationPhotos /> */}
    </div>
  );
}

export default App;
