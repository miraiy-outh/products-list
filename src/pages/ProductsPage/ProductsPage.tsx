import { Header } from "../../components/Header/Header";
import { useEffect, useState } from "react";
import useDebounce from "../../components/hooks/useDebounce";
import styles from "./styles.module.css";
import { ProductsBlock } from "./ProductsBlock/ProductsBlock";
import { LIMIT } from "./ProductsBlock/contants";

export const ProductsPage = () => {
  const [search, setSearch] = useState<string>("");
  const [pageNumber, setPageNumber] = useState<number>(1);
  const debouncedSearch = useDebounce(search, 1000) as string;

  useEffect(() => {
    setPageNumber(1);
  }, [debouncedSearch]);
  return (
    <div className={styles.paperContainer}>
      <Header search={search} setSearch={setSearch} />
      <ProductsBlock search={debouncedSearch} skip={(pageNumber - 1) * LIMIT} />
    </div>
  );
};
