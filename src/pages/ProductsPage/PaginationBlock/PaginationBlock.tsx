import { Pagination } from "@mui/material";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../components/hooks/storeHooks";
import {
  selectCurrentPage,
  selectSkip,
  selectTotalCount,
  selectTotalPages,
  setSkip,
} from "../../../slices/productsSlice";
import { LIMIT } from "../ProductsBlock/contants";
import styles from "./styles.module.css";

const paginationStyle = {
  "& .MuiPaginationItem-root": {
    border: "1px solid #ECECEB",
    color: "#B2B3B9",
  },

  "& .Mui-selected": {
    background: "#797FEA",
    color: "#fff",
    border: "1px solid #797FEA",
  },

  "& .Mui-selected:hover": {
    background: "#797FEA",
    color: "#fff",
    border: "1px solid #797FEA",
  },

  "& .MuiPaginationItem-previousNext": {
    border: "none",
    color: "#B2B3B9",
  },

  "& .MuiSvgIcon-root": {
    fontFamily: `"Cairo", Arial, sans-serif`,
    fontSize: "14px",
    fontWeight: 400,
  },
};

export const PaginationBlock = () => {
  const dispatch = useAppDispatch();
  const totalCount = useAppSelector(selectTotalCount);
  const skip = useAppSelector(selectSkip);
  const currPage = useAppSelector(selectCurrentPage);
  const totalPages = useAppSelector(selectTotalPages);
  const endedSkip = skip + 20 > totalCount ? totalCount : skip + 20;

  const handleChangePage = (_: React.ChangeEvent<unknown>, page: number) => {
    dispatch(setSkip((page - 1) * LIMIT));
  };
  return (
    <div className={styles.container}>
      <p className={styles.text}>
        Показано{" "}
        <span className={styles.subtext}>{`${skip + 1}-${endedSkip}`}</span> из{" "}
        <span className={styles.subtext}>{totalCount}</span>
      </p>
      <Pagination
        variant="outlined"
        shape="rounded"
        count={totalPages}
        page={currPage}
        onChange={handleChangePage}
        sx={paginationStyle}
      />
    </div>
  );
};
