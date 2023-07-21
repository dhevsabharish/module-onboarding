import { TextField } from "@mui/material";
import { useState } from "react";

const CustomValuesWidget = (props) => {
  const { value = [], onChange, label, placeholder } = props;
  const [inputValue, setInputValue] = useState(value.join(", "));

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleBlur = () => {
    const newValues = inputValue.split(",").map((v) => v.trim());
    onChange(newValues);
  };

  return (
    <TextField
      variant="outlined"
      label={label}
      value={inputValue}
      onChange={handleInputChange}
      onBlur={handleBlur}
      placeholder={placeholder}
      fullWidth
    />
  );
};

export default CustomValuesWidget;
