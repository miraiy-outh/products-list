import { Button } from "@mui/material";
import styles from "./styles.module.css";
import { RefreshIcon } from "../../../components/icons/RefreshIcon";
import { ContainedButton } from "../../../components/buttons/ContainedButton";
import { PlusOutlinedIcon } from "../../../components/icons/PlusOutlinedIcon ";
import { useState, type CSSProperties } from "react";
import { ProductsTable } from "./ProductsTable/ProductsTable";
import React from "react";

const refreshButtonStyle: CSSProperties = {
  border: "1px solid #ECECEB",
  borderRadius: "8px",
  backgroundColor: "white",
  padding: "10px",
  width: "42px",
  height: "42px",
  minWidth: "auto",
};
// остался поиск, пагинация, cud операции
export const ProductsBlock = React.memo(
  ({ search = "", skip }: { search?: string; skip: number }) => {
    const [pageNumber, setPageNumber] = useState<number>(1);
    const handleAddProduct = () => {
      // логика добавления товара
    };

    return (
      <div className={styles.container}>
        <div className={styles.headerContainer}>
          <h4>Все позиции</h4>
          <div className={styles.buttonsContainer}>
            <Button variant="outlined" sx={refreshButtonStyle}>
              <RefreshIcon />
            </Button>
            <ContainedButton
              text="Добавить"
              onClick={handleAddProduct}
              icon={<PlusOutlinedIcon />}
            />
          </div>
        </div>
        <ProductsTable search={search} skip={skip} />
      </div>
    );
  },
);
