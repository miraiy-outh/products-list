import { Divider } from "@mui/material";
import styles from "./styles.module.css";

export const DividerWithText = () => {
  return (
    <Divider
      sx={{
        display: "flex",
        alignItems: "center",
        color: "#EDEDED",
        "&::before, &::after": {
          borderTop: "1px solid #EDEDED",
        },
      }}
    >
      <p className={styles.subtitle} style={{ fontSize: "16px" }}>
        или
      </p>
    </Divider>
  );
};
