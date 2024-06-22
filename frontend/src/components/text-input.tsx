import { TextField, OutlinedTextFieldProps } from "@mui/material";

interface CustomTextInputProps extends OutlinedTextFieldProps {
  title: string;
  placeholder: string;
}

const DefaultTextInput: React.FC<Partial<CustomTextInputProps>> = (props) => {
  const { title, placeholder, sx, ...rest } = props;
  return (
    <TextField
      size="small"
      variant="outlined"
      color="primary"
      label={title}
      placeholder={placeholder}
      sx={{
        ".MuiOutlinedInput-input": {
          padding: "0.6rem 1rem",
        },
        margin: "0.8rem 0rem",
        ...sx,
      }}
      fullWidth
      {...rest}
    />
  );
};

export { DefaultTextInput };
