import { Header } from "../../components/Header/Header";
import styles from "./styles.module.css";
import { ProductsBlock } from "./ProductsBlock/ProductsBlock";

export const ProductsPage = () => {
  return (
    <div className={styles.paperContainer}>
      <Header />
      <ProductsBlock />
    </div>
  );
};
