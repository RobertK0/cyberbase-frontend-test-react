import SearchBar from "../UI/Filtering/SearchBar";
import Button from "../UI/Button";
import styles from "./Header.module.css";
import RadioFilter from "../UI/Filtering/RadioFilter";
import Modal from "../UI/Modal";
import UnitsContext from "../../store/units-context";
import { useContext } from "react";

const Header = function () {
  const unitsCtx = useContext(UnitsContext);

  return (
    <div className={styles.header}>
      <Button className={styles["recruit-btn"]} onClick={unitsCtx.toggleModal}>
        {"Recruit"}
      </Button>
      <RadioFilter />
      <SearchBar />
      {unitsCtx.modalIsShown && (
        <Modal onClose={unitsCtx.toggleModal}>
          {unitsCtx.choices.map((option) => (
            <Button
              className={styles["btn-choice"]}
              key={option}
              value={option}
              onClick={unitsCtx.addUnit}
            >
              {option}
            </Button>
          ))}
        </Modal>
      )}
    </div>
  );
};

export default Header;
