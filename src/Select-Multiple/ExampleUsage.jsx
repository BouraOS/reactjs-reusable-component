import React, { useState } from "react";
import Multiselect from "./Select-Multiple/Multiselect.tsx"; // Adjust the path as needed

const MultiSelectExample = () => {
  const [selectedColors, setSelectedColors] = useState([]);
  const colorOptions = [
    { label: "Purple", value: "purple" },
    { label: "Red", value: "red" },
    { label: "Yellow", value: "yellow" },
    { label: "Green", value: "green" },
  ];

  return (
    <Multiselect
      options={colorOptions}
      selected={selectedColors}
      onChange={setSelectedColors}
      placeholder="Select colors"
    />
  );
};
export default MultiSelectExample;
