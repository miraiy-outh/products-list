import { SearchInput } from "../inputs/SearchInput";
import styles from "./styles.module.css";

export const Header = () => {
  return (
    <div className={styles.container}>
      <h3>Товары</h3>
      <SearchInput />
    </div>
  );
};
