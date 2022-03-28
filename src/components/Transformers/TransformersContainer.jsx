import styles from "./TransformersContainer.module.css";
import Card from "../UI/Card";
import Transformer from "./Transformer";
import { useContext } from "react";
import UnitsContext from "../../store/units-context";

const TransformersContainer = function () {
  const unitsCtx = useContext(UnitsContext);

  const searchResult = unitsCtx.units.map((unit) => {
    if (unitsCtx.filter !== "none") {
      if (unit.faction !== unitsCtx.filter) return null;
    }
    if (
      unit.model.toLowerCase().includes(unitsCtx.searchTerm.toLowerCase()) ||
      unit.type.toLowerCase().includes(unitsCtx.searchTerm.toLowerCase())
    )
      return (
        <Card key={unit.id}>
          <Transformer unit={unit} />
        </Card>
      );
  });

  return <div className={styles["cards-container"]}>{searchResult}</div>;
};

export default TransformersContainer;
