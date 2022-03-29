import { useState, useEffect, useReducer } from "react";

import UnitsContext from "./units-context";

const defaultUnitsState =
  JSON.parse(localStorage.getItem("transformers")) || [];

let vehicleTypes, factions, faction, group, type, model, transformer;

const persistState = (state) => {
  localStorage.setItem("transformers", JSON.stringify(state));
};

const unitsReducer = (state, action) => {
  if (action.type === "ADD") {
    const newState = [...state, action.unit];
    persistState(newState);
    return newState;
  }
  if (action.type === "REMOVE") {
    const newState = state.filter((element) => element.id !== +action.id);
    persistState(newState);
    return newState;
  }
  if (action.type === "EDIT") {
    console.log(state);
    const unitIndex = state.findIndex((unit) => unit.id === action.id);
    const editedUnit = {
      ...state[unitIndex],
      ...(state[unitIndex].status = action.newStatus),
    };
    const updatedState = [...state];
    updatedState[unitIndex] = editedUnit;
    persistState(updatedState);
    return updatedState;
  }

  return defaultUnitsState;
};

const UnitsProvider = (props) => {
  const [unitsState, dispatchUnitsAction] = useReducer(
    unitsReducer,
    defaultUnitsState
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("none");
  const [modalIsShown, setModalIsShown] = useState(false);
  const [options, setOptions] = useState();

  useEffect(() => {
    const fetchGroups = async function () {
      const response = await fetch(
        "https://raw.githubusercontent.com/damirsehic/transformers-api/master/db.json"
      );
      ({ factions, vehicleTypes } = await response.json());
      setOptions(factions.map((element) => element.name));
    };
    fetchGroups();
  }, []);

  const addUnitHandler = (input) => {
    if (!faction) {
      faction = input;
      setOptions([...new Set(vehicleTypes.map((element) => element.group))]);
      return;
    }
    console.table(input, faction, group, type, model);
    if (!group) {
      group = input;
      setOptions([
        ...new Set(
          vehicleTypes
            .filter((element) => element.group === group)
            .map((element) => element.type)
        ),
      ]);
      return;
    }
    if (!type) {
      type = input;
      setOptions([
        ...new Set(
          vehicleTypes
            .filter((element) => element.type === type)
            .map((element) => element.model)
        ),
      ]);

      return;
    }
    if (!model) {
      model = input;
      transformer = {
        faction,
        group,
        type,
        model,
        weapons: [],
        id: Date.now(),
        status: "ok",
      };
      dispatchUnitsAction({ type: "ADD", unit: transformer });
      transformer = undefined;
      //repeating code below
      setModalIsShown((prevState) => {
        if (prevState) {
          setOptions(factions.map((element) => element.name));
          faction = group = type = model = undefined;
        }
        return !prevState;
      });
      //
      return;
    }
  };

  const removeUnitHandler = (id) => {
    dispatchUnitsAction({ type: "REMOVE", id: id });
  };

  const editUnitHandler = (id) => {};

  const applyFilterHandler = (filter) => {
    setFilter(filter);
  };

  const applySearchHandler = (term) => {
    setSearchTerm(term);
  };

  const toggleModalHandler = () => {
    setModalIsShown((prevState) => {
      if (prevState) {
        setOptions(factions.map((element) => element.name));
        faction = group = type = model = undefined;
      }
      return !prevState;
    });
  };

  const changeStatusHandler = (newStatus, id) => {
    dispatchUnitsAction({ type: "EDIT", newStatus: newStatus, id: id });
  };

  const unitsContext = {
    units: unitsState,
    addUnit: addUnitHandler,
    removeUnit: removeUnitHandler,
    editUnit: editUnitHandler,
    changeStatus: changeStatusHandler,
    filter,
    applyFilter: applyFilterHandler,
    searchTerm,
    applySearch: applySearchHandler,
    modalIsShown: modalIsShown,
    toggleModal: toggleModalHandler,
    choices: options,
  };

  return (
    <UnitsContext.Provider value={unitsContext}>
      {props.children}
    </UnitsContext.Provider>
  );
};

export default UnitsProvider;
