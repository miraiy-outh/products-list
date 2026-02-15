import { ContainedButton } from "../../../components/buttons/ContainedButton";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { TextInput } from "../../../components/inputs/TextInput/TextInput";
import { useState } from "react";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../components/hooks/storeHooks";
import { productsApi } from "../../../api/productsApi";
import type { TProduct } from "../../../types";
import { selectProductsQueryParams } from "../../../slices/productsSlice";

type TProps = {
  open: boolean;
  onClose: () => void;
};

export const AddProductModal = ({ open, onClose }: TProps) => {
  const dispatch = useAppDispatch();
  const queryParams = useAppSelector(selectProductsQueryParams);
  const [titleError, setTitleError] = useState(false);
  const [priceError, setPriceError] = useState(false);
  const [brandError, setBrandError] = useState(false);
  const [skuError, setSkuError] = useState(false);
  const [title, setTitle] = useState<string | undefined>("");
  const [price, setPrice] = useState<string | undefined>("");
  const [brand, setBrand] = useState<string | undefined>("");
  const [sku, setSku] = useState<string | undefined>("");

  const clearFields = () => {
    setTitle("");
    setPrice("");
    setBrand("");
    setSku("");
    setTitleError(false);
    setPriceError(false);
    setBrandError(false);
    setSkuError(false);
  };

  const handleConfirmProduct = () => {
    setTitleError(!title?.trim());
    setPriceError(!price?.trim());
    setBrandError(!brand?.trim());
    setSkuError(!sku?.trim());

    if (!title?.trim() || !price?.trim() || !brand?.trim() || !sku?.trim())
      return;

    const newProduct: TProduct = {
      id: Date.now(),
      title: title!,
      price: Number(price),
      sku: sku!,
      brand: brand!,
      category: "",
      images: [],
      rating: 0,
      tags: [],
    };

    dispatch(
      productsApi.util.updateQueryData("getProducts", queryParams, (draft) => {
        draft.products.unshift(newProduct);
        draft.total += 1;
      }),
    );
    clearFields();
    onClose();
  };
  return (
    <>
      <Dialog
        open={open}
        onClose={() => {
          onClose();
          clearFields();
        }}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          Добавить товар{" "}
          <IconButton
            onClick={onClose}
            size="medium"
            sx={{
              color: "text.secondary",
            }}
          >
            <CloseIcon fontSize="medium" />
          </IconButton>
        </DialogTitle>

        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 2 }}
        >
          <TextInput
            label="Наименование"
            id={"title"}
            value={title}
            setValue={setTitle}
            error={titleError}
            setError={setTitleError}
          />
          <TextInput
            label="Цена"
            id={"price"}
            value={price}
            setValue={setPrice}
            pattern={/^\d*\.?\d*$/}
            error={priceError}
            setError={setPriceError}
          />
          <TextInput
            label="Вендор"
            id={"brand"}
            value={brand}
            setValue={setBrand}
            error={brandError}
            setError={setBrandError}
          />
          <TextInput
            label="Артикул"
            id={"sku"}
            value={sku}
            setValue={setSku}
            pattern={/^[A-Z0-9-]*$/}
            error={skuError}
            setError={setSkuError}
          />
        </DialogContent>

        <DialogActions
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            padding: "0px 24px 20px",
          }}
        >
          <Button
            onClick={() => {
              clearFields();
              onClose();
            }}
          >
            Отмена
          </Button>
          <ContainedButton text={"Добавить"} onClick={handleConfirmProduct} />
        </DialogActions>
      </Dialog>
    </>
  );
};
