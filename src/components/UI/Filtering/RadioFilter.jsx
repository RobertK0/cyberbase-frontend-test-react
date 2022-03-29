import styles from "./RadioFilter.module.css";
import icon from "../../../assets/factionIcons.svg";
import { useRef } from "react";
import { useContext } from "react";
import UnitsContext from "../../../store/units-context";

const RadioFilter = function (props) {
  const unitsCtx = useContext(UnitsContext);
  const filterRef = useRef();
  const filterHandler = function (event) {
    unitsCtx.applyFilter(event.target.value);
  };

  return (
    <fieldset
      ref={filterRef}
      onChange={filterHandler}
      className={styles.filter}
    >
      <label>
        <input type="radio" name="filter" value="Autobots" />
        <svg className={`${styles["filter-icon"]} ${styles.auto}`}>
          <use href={`${icon}#icon-autobots`}></use>
        </svg>
      </label>
      <label>
        <input type="radio" name="filter" value="none" />
        <h3 className={styles["filter-show-all"]}>Show all</h3>
      </label>
      <label>
        <input type="radio" name="filter" value="Decepticons" />
        <svg className={`${styles["filter-icon"]} ${styles.dece}`}>
          <use href={`${icon}#icon-decepticons`}></use>
        </svg>
      </label>
    </fieldset>
  );
};

export default RadioFilter;
