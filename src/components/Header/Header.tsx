import { SearchInput } from "../inputs/SearchInput";
import styles from "./styles.module.css";

type TProps = {
  search: string | undefined;
  setSearch: React.Dispatch<React.SetStateAction<string | undefined>>;
};

export const Header = ({ search, setSearch }: TProps) => {
  return (
    <div className={styles.container}>
      <h3>Товары</h3>
      <SearchInput value={search} setValue={setSearch} />
    </div>
  );
};
