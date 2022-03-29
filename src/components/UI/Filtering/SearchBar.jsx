import { useContext } from "react";
import { useRef } from "react";
import UnitsContext from "../../../store/units-context";
import styles from "./SearchBar.module.css";

const SearchBar = function () {
  const inputRef = useRef();
  const unitsCtx = useContext(UnitsContext);

  const searchHandler = function () {
    unitsCtx.applySearch(inputRef.current.value);
  };

  return (
    <input
      ref={inputRef}
      className={styles["search-bar"]}
      type="text"
      placeholder="Start typing to search..."
      onChange={searchHandler}
    />
  );
};

export default SearchBar;
