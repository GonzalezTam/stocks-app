import React from "react";
import { TextField } from "@mui/material";

interface SearchInputProps {
  customStyles?: React.CSSProperties;
  label: string;
  value: string;
  helperText?: string;
  disabled?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  customStyles,
  label,
  value,
  helperText,
  disabled,
  onChange,
}) => {
  return (
    <TextField
      type="search"
      inputProps={{ style: customStyles }}
      label={label}
      value={value}
      helperText={helperText}
      disabled={disabled}
      onChange={onChange}
      variant="outlined"
      size="small"
    />
  );
};

export default SearchInput;
