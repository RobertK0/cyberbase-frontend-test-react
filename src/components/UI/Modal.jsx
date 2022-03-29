import { Fragment } from "react";
import styles from "./Modal.module.css";
import ReactDOM from "react-dom";

const Overlay = function (props) {
  return <div className={styles.overlay} onClick={props.onClose}></div>;
};

const ModalWindow = function (props) {
  return (
    <div className={styles["modal-window"]}>
      <div>{props.children}</div>
    </div>
  );
};

const portalEl = document.getElementById("overlays");

const Modal = function (props) {
  return (
    <Fragment>
      {ReactDOM.createPortal(<Overlay onClose={props.onClose} />, portalEl)}
      {ReactDOM.createPortal(
        <ModalWindow>{props.children}</ModalWindow>,
        portalEl
      )}
    </Fragment>
  );
};

export default Modal;
