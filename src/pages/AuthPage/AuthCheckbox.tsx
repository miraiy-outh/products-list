import { Checkbox, FormControlLabel } from "@mui/material";

const checkboxStyle = {
  color: "#EDEDED",
  padding: 0,
  marginRight: "10px",
};

const labelStyle = {
  margin: 0,
  "& .MuiFormControlLabel-label": {
    fontSize: "16px",
    fontWeight: 400,
    fontFamily: `"Inter", Arial, sans-serif`,
    lineHeight: "150%",
    color: "#9C9C9C",
  },
};

type TProps = {
  value: boolean;
  setValue: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AuthCheckbox = ({ value, setValue }: TProps) => {
  return (
    <FormControlLabel
      control={
        <Checkbox
          sx={checkboxStyle}
          value={value}
          onChange={() => setValue(!value)}
        />
      }
      label="Запомнить данные"
      sx={labelStyle}
    />
  );
};
