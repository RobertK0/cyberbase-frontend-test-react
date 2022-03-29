import React from "react";

const UnitsContext = React.createContext({
  units: [],
  addUnit: (unit) => {},
  removeUnit: (id) => {},
  editUnit: () => {},
  changeStatus: (newStatus, id) => {},
  applyFilter: (filter) => {},
  filter: undefined,
  applySearch: (term) => {},
  searchTerm: undefined,
  modalIsShown: undefined,
  choices: undefined,
});

export default UnitsContext;
