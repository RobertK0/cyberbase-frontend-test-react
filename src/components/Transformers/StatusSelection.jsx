import { useRef } from "react";
import { useContext } from "react";
import UnitsContext from "../../store/units-context";
import styles from "./StatusSelection.module.css";

const StatusSelection = function (props) {
  const unitsCtx = useContext(UnitsContext);
  const inputRef = useRef();

  const changeStatusHandler = function () {
    unitsCtx.changeStatus(inputRef.current.value, props.unit.id);
  };

  return (
    <select
      className={`${styles["status-selection"]} ${styles[props.unit.status]}`}
      onChange={changeStatusHandler}
      name="status"
      id="status"
      ref={inputRef}
      data-id={props.unit.id}
    >
      <option
        value="ok"
        selected={`${props.unit.status === "ok" ? "selected" : ""}`}
      >
        OK
      </option>
      <option
        value="injured"
        selected={`${props.unit.status === "injured" ? "selected" : ""}`}
      >
        Injured
      </option>
      <option
        value="mia"
        selected={`${props.unit.status === "mia" ? "selected" : ""}`}
      >
        MIA
      </option>
    </select>
  );
};

export default StatusSelection;
