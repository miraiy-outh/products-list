import { Button } from "@mui/material";
import styles from "./styles.module.css";
import { RefreshIcon } from "../../../components/icons/RefreshIcon";
import { ContainedButton } from "../../../components/buttons/ContainedButton";
import { PlusOutlinedIcon } from "../../../components/icons/PlusOutlinedIcon ";
import { useEffect, useState, type CSSProperties } from "react";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../components/hooks/storeHooks";
import {
  getAllProducts,
  selectProducts,
} from "../../../services/productsSlice";

const refreshButtonStyle: CSSProperties = {
  border: "1px solid #ECECEB",
  borderRadius: "8px",
  backgroundColor: "white",
  padding: "10px",
  width: "42px",
  height: "42px",
  minWidth: "auto",
};

const LIMIT = 5;

export const ProductsTable = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const handleAddProduct = () => {
    // логика добавления товара
  };
  console.log(products);
  useEffect(() => {
    dispatch(getAllProducts({ limit: LIMIT, skip: (pageNumber - 1) * LIMIT }));
  }, [dispatch, pageNumber]);

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
    </div>
  );
};
