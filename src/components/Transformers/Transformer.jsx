import { Fragment, useContext } from "react";
import styles from "./Transformer.module.css";
import icon from "../../assets/factionIcons.svg";
import StatusSelection from "./StatusSelection";
import buttonIcons from "../../assets/buttonIcons.svg";
import Button from "../UI/Button";
import UnitsContext from "../../store/units-context";

const Transformer = function (props) {
  const unitsCtx = useContext(UnitsContext);

  const deleteHandler = function () {
    unitsCtx.removeUnit(props.unit.id);
  };

  const editHandler = function () {
    unitsCtx.editUnit(props.unit.id);
  };
  const addGearHandler = function () {};

  const faction = props.unit.faction;
  return (
    <Fragment>
      <Button onClick={editHandler} className={styles["btn-edit"]}>
        <svg className={styles.icon}>
          <use href={`${buttonIcons}#edit`}></use>
        </svg>
      </Button>
      <Button onClick={deleteHandler} className={styles["btn-delete"]}>
        <svg className={styles.icon}>
          <use href={`${buttonIcons}#delete`}></use>
        </svg>
      </Button>
      <Button onClick={addGearHandler} className={styles["btn-add-gear"]}>
        <svg className={styles.icon}>
          <use href={`${buttonIcons}#plus`}></use>
        </svg>
      </Button>

      <svg
        className={`${styles["card-icon"]} ${
          faction === "Autobots" ? `${styles.auto}` : `${styles.dece}`
        }`}
      >
        <use href={`${icon}#icon-${faction.toLowerCase()}`}></use>
      </svg>
      <h2>{props.unit.faction}</h2>
      <h3>{`${props.unit.type} — ${props.unit.model}`}</h3>
      <StatusSelection unit={props.unit} />
      <div className={styles["gear-container"]}>
        <span className={styles.gear}>Equipped gear:</span>
        <li className={styles["gear-list"]}>{props.unit.weapons.join(", ")}</li>
      </div>
    </Fragment>
  );
};

export default Transformer;
