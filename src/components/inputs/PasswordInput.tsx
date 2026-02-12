import { IconButton } from "@mui/material";
import { useState } from "react";
import { TextInput } from "../icons/TextInput/TextInput";
import { PasswordIcon } from "../icons/PasswordIcon";
import { HideIcon } from "../icons/HideIcon";

type TProps = {
  error: boolean;
  setError?: React.Dispatch<React.SetStateAction<boolean>>;
  value: string | undefined;
  setValue: React.Dispatch<React.SetStateAction<string | undefined>>;
};
export const PasswordInput = ({ error, setError, value, setValue }: TProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };
  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  return (
    <TextInput
      label="Пароль"
      id="password"
      error={error}
      setError={setError}
      type={showPassword ? "text" : "password"}
      value={value}
      setValue={setValue}
      icon={<PasswordIcon />}
      endIcon={
        <IconButton
          aria-label={
            showPassword ? "hide the password" : "display the password"
          }
          onClick={handleClickShowPassword}
          onMouseDown={handleMouseDownPassword}
          onMouseUp={handleMouseUpPassword}
          edge="end"
        >
          {<HideIcon />}
        </IconButton>
      }
    />
  );
};
