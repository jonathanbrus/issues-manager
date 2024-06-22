import { FormControl, InputLabel, MenuItem, OutlinedInput, Select } from "@mui/material";

export const CustomSelect: React.FC<{
  title: string;
  options: string[];
  value: string;
  onChange: (option: string) => void;
}> = (props) => {
  const { title, options, value, onChange } = props;

  return (
    <FormControl sx={{ margin: "0.8rem 0rem", minWidth: "12rem" }} fullWidth>
      <InputLabel>{title}</InputLabel>
      <Select
        size="small"
        value={value}
        onChange={({ target }) => onChange(target.value as string)}
        input={
          <OutlinedInput
            label={title}
            sx={{
              ".MuiOutlinedInput-input": { padding: "0.6rem 1rem" },
              minWidth: "12rem",
              textTransform: "capitalize",
            }}
          />
        }
        fullWidth
      >
        {options.map((option) => (
          <MenuItem key={option} value={option} sx={{ textTransform: "capitalize" }}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
