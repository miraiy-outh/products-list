import { Button } from "@mui/material";
import styles from "./styles.module.css";
import { RefreshIcon } from "../../../components/icons/RefreshIcon";
import { ContainedButton } from "../../../components/buttons/ContainedButton";
import { PlusOutlinedIcon } from "../../../components/icons/PlusOutlinedIcon ";
import { useState, type CSSProperties } from "react";
import { ProductsTable } from "./ProductsTable/ProductsTable";
import React from "react";
import { PaginationBlock } from "../PaginationBlock/PaginationBlock";
import { AddProductModal } from "../AddProductModal/AddProductModal";

const refreshButtonStyle: CSSProperties = {
  border: "1px solid #ECECEB",
  borderRadius: "8px",
  backgroundColor: "white",
  padding: "10px",
  width: "42px",
  height: "42px",
  minWidth: "auto",
};

export const ProductsBlock = React.memo(() => {
  const [openModal, setOpenModal] = useState(false);

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
            onClick={() => setOpenModal(true)}
            icon={<PlusOutlinedIcon />}
          />
        </div>
      </div>
      <ProductsTable />
      <PaginationBlock />
      <AddProductModal open={openModal} onClose={() => setOpenModal(false)} />
    </div>
  );
});
