import { Header } from "../../components/Header/Header";
import { useEffect, useState } from "react";
import useDebounce from "../../components/hooks/useDebounce";
import styles from "./styles.module.css";
import { ProductsBlock } from "./ProductsBlock/ProductsBlock";

export const ProductsPage = () => {
  const [search, setSearch] = useState<string>();
  const debouncedSearch = useDebounce(search, 1000);

  useEffect(() => {
    // отправка запроса на поиск
  }, [debouncedSearch]);
  return (
    <div className={styles.paperContainer}>
      <Header search={search} setSearch={setSearch} />
      <ProductsBlock />
    </div>
  );
};
