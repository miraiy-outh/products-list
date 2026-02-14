import { MoreOutlinedIcon } from "../../../../components/icons/MoreOutlinedIcon";
import styles from "./styles.module.css";

export const ShowMoreButton = () => {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };
  return (
    <div onClick={(e) => handleClick(e)} className={styles.container}>
      <MoreOutlinedIcon />
    </div>
  );
};
