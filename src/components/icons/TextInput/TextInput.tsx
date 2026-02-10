import { InputAdornment, InputLabel, OutlinedInput } from "@mui/material";
import styles from "./styles.module.css";

const inputStyle = {
  fontSize: "18px",
  padding: "15.5px 16px",
  fontWeight: 400,
  fontFamily: `"Inter", Arial, sans-serif`,
  lineHeight: "150%",
  borderRadius: "12px",
  width: "100%",
  height: "55px",
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "#EDEDED",
    borderWidth: "1.5px",
  },
};

const labelStyle = {
  fontSize: "18px",
  fontWeight: 400,
  fontFamily: `"Inter", Arial, sans-serif`,
  lineHeight: "150%",
  color: "var(--text-color)",
};

type TProps = {
  label?: string;
  id: string;
  error?: boolean;
  setError?: React.Dispatch<React.SetStateAction<boolean>>;
  value: string | undefined;
  setValue: React.Dispatch<React.SetStateAction<string | undefined>>;
  icon?: React.ReactNode;
  endIcon?: React.ReactNode;
  type?: "text" | "password";
};

export const TextInput = ({
  label,
  id,
  error,
  setError,
  value,
  setValue,
  icon,
  endIcon,
  type = "text",
}: TProps) => {
  return (
    <div className={styles.inputContainer}>
      <InputLabel htmlFor={id} sx={labelStyle}>
        {label}
      </InputLabel>
      <OutlinedInput
        id={id}
        value={value}
        error={error}
        onChange={(e) => {
          setValue(e.target.value);
          if (error && setError) setError(false);
        }}
        startAdornment={
          icon ? (
            <InputAdornment position="start">{icon}</InputAdornment>
          ) : undefined
        }
        endAdornment={
          endIcon ? (
            <InputAdornment position="end">{endIcon}</InputAdornment>
          ) : undefined
        }
        type={type}
        sx={inputStyle}
      />
    </div>
  );
};
