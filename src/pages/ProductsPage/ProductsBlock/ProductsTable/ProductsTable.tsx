import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";
import type { TProduct } from "../../../../services/types";
import { clearObject } from "../../../../utils/clearObject";
import type { TGetProductsPayload } from "../../../../api/productsTypes";
import { useGetProductsQuery } from "../../../../api/productsApi";
import TableSortLabel from "@mui/material/TableSortLabel";
import { LIMIT, tableLabels } from "../contants";
import styles from "./styles.module.css";
import { cutSubprice } from "../../../../utils/cutSubprice";
import { TableCheckbox } from "../../../../components/inputs/TableCheckbox";
import { EditButton } from "../EditButton";
import { ShowMoreButton } from "../ShowMoreButton/ShowMoreButton";
import { Loader } from "../../../../components/Loader/Loader";

const styleTableCellHeader = {
  maxWidth: "304.5px",
  padding: 0,
  fontFamily: `"Cairo", Arial, sans-serif`,
  fontSize: "16px",
  color: "#B2B3B9",
  fontWeight: 600,
};
const styleTableRow = {
  cursor: "pointer",
  height: "71px",
  "&:first-of-type": {
    borderTop: "1px solid #E2E2E2",
  },
  "&:last-of-type": {
    borderBottom: "none",
  },
  "&:not(:first-of-type):not(:last-of-type)": {
    borderTop: "2px solid #E2E2E2",
    borderBottom: "2px solid #E2E2E2",
  },
};
const styleSortLabel = {
  display: "flex",
  marginLeft: "18px",
};

export const ProductsTable = ({
  search = "",
  skip,
}: {
  search?: string;
  skip: number;
}) => {
  const [sortBy, setSortBy] = useState<string | undefined>(undefined);
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const savedSortBy = localStorage.getItem("sortBy");
  const savedOrder = localStorage.getItem("order");
  let sortByFromStorage: string | undefined;
  let orderFromStorage: "asc" | "desc" = "asc";

  try {
    if (savedSortBy) {
      sortByFromStorage = JSON.parse(savedSortBy);
    }
    if (savedOrder) {
      const parsed = JSON.parse(savedOrder);
      if (parsed === "asc" || parsed === "desc") {
        orderFromStorage = parsed;
      }
    }
  } catch (e) {
    console.error(e);
  }

  useEffect(() => {
    if (sortByFromStorage) {
      setSortBy(sortByFromStorage);
    }
    if (orderFromStorage) {
      setOrder(orderFromStorage);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("sortBy", JSON.stringify(sortBy));
  }, [sortBy]);

  useEffect(() => {
    localStorage.setItem("order", JSON.stringify(order));
  }, [order]);

  const requestData = clearObject<TGetProductsPayload>({
    search,
    limit: LIMIT,
    skip,
    sortBy,
    order,
  });

  const { data, isFetching } = useGetProductsQuery(requestData, {
    refetchOnMountOrArgChange: true,
  });
  const products: TProduct[] =
    data?.products.map((product) => {
      return {
        id: product.id,
        title: product.title,
        category: product.category,
        images: product.images,
        price: product.price,
        rating: product.rating,
        stock: product.stock,
        tags: product.tags,
        brand: product.brand,
        sku: product.sku,
        minimumOrderQuantity: product.minimumOrderQuantity,
      };
    }) || [];

  const total = data?.total;

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setOrder((prev) => (prev === "asc" ? "desc" : "asc"));
      return;
    }
    setSortBy(field);
    setOrder("asc");
  };

  const toggleSelect = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const handleSelectAll = () => {
    setSelectedIds(data?.products.map((p) => p.id) ?? []);
  };

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{ overflow: "visible", boxShadow: "none" }}
      >
        <Table aria-label="products table">
          <TableHead sx={{ height: "71px" }}>
            <TableRow>
              <TableCell sx={{ width: "22px", padding: "18px" }}>
                <TableCheckbox
                  onChange={handleSelectAll}
                  checked={
                    selectedIds.length === products.length &&
                    products.length !== 0
                  }
                />
              </TableCell>
              {tableLabels.map((label) => {
                const isTitle = label.name === "title";
                const isSort = sortBy === label.name;
                return (
                  <TableCell
                    key={label.name}
                    sx={{
                      ...styleTableCellHeader,
                      width: isTitle ? "274px" : "auto",
                    }}
                    align={isTitle ? "left" : "center"}
                  >
                    <TableSortLabel
                      active={isSort}
                      direction={isSort ? order : "asc"}
                      onClick={() => handleSort(label.name)}
                      sx={{
                        ...styleSortLabel,
                        justifyContent: isTitle ? "flex-start" : "center",
                      }}
                    >
                      {label.title}
                    </TableSortLabel>
                  </TableCell>
                );
              })}
              <TableCell sx={{ padding: 0 }} align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isFetching ? (
              <TableRow>
                <TableCell colSpan={tableLabels.length + 2} align="center">
                  <Loader />
                </TableCell>
              </TableRow>
            ) : products.length === 0 ? (
              <TableRow>
                <TableCell colSpan={tableLabels.length + 2} align="center">
                  Ничего не найдено
                </TableCell>
              </TableRow>
            ) : (
              products.map((product) => (
                <TableRow
                  key={product.id}
                  hover
                  onClick={() => toggleSelect(product.id)}
                  role="checkbox"
                  sx={{
                    ...styleTableRow,
                    borderLeft: selectedIds.includes(product.id)
                      ? "3px solid var(--accent2)"
                      : "3px solid white",
                    transition: "border-left 0.2s",
                  }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{
                      width: "22px",
                      padding: "18px",
                    }}
                  >
                    <TableCheckbox checked={selectedIds.includes(product.id)} />
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ maxWidth: "274px", padding: 0 }}
                  >
                    <div className={styles.titleInfoContainer}>
                      <div
                        className={styles.imageContainer}
                        style={{
                          backgroundColor: product.images?.[0]
                            ? "white"
                            : "#c4c4c4",
                        }}
                      >
                        <img
                          src={product.images?.[0]}
                          alt={product.title}
                          className={styles.image}
                        />
                      </div>
                      <div className={styles.titleContainer}>
                        <h6 className={styles.productTitle}>{product.title}</h6>
                        <p className={styles.label}>{product.category}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ maxWidth: "304.5px", padding: 0 }}
                  >
                    <p className={styles.brand}>{product.brand}</p>
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ maxWidth: "304.5px", padding: 0 }}
                  >
                    <p className={styles.cellText}>{product.sku}</p>
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ maxWidth: "304.5px", padding: 0 }}
                  >
                    <p className={styles.cellText}>
                      <span
                        className={
                          product.rating < 3 ? styles.lowRatingText : ""
                        }
                      >
                        {product.rating}
                      </span>
                      /5
                    </p>
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ maxWidth: "304.5px", padding: 0 }}
                  >
                    <p className={styles.cellText}>
                      {Math.floor(product.price)}
                      <span className={styles.subprice}>
                        {cutSubprice(product.price)}
                      </span>
                    </p>
                  </TableCell>
                  <TableCell sx={{ padding: 0 }}>
                    <div className={styles.buttonsContainer}>
                      <EditButton />
                      <ShowMoreButton />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
