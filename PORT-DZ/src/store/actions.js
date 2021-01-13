const UPLOAD_SHIPS = 'UPLOAD_SHIPS';
const ADD_SHIP = 'ADD_SHIP';
const ADD_CARGO_CRUISE = 'ADD_CARGO_CRUISE';
const ADD_PASSENGER_CRUISE = 'ADD_PASSENGER_CRUISE';
const EDIT_CRUISE = 'EDIT_CRUISE';
const MOVE_CRUISE = 'MOVE_CRUISE';
const REMOVE_CRUISE = 'REMOVE_CRUISE';

const uploadShipsAction = (ships) => ({
  type: UPLOAD_SHIPS,
  payload: ships
});

const addShipAction = (shipName, shipType) => ({
  type: ADD_SHIP,
  payload: {
    shipName,
    shipType
  }
});

const addCargoCruiseAction = ({ shipId, cruiseDestination, cruiseCargo }) => ({
  type: ADD_CARGO_CRUISE,
  payload: {
    shipId,
    cruiseDestination,
    cruiseCargo
  }
});

const addPassengerCruiseAction = ({ shipId, cruiseDestination }) => ({
  type: ADD_PASSENGER_CRUISE,
  payload: {
    shipId,
    cruiseDestination
  }
});

const editCruiseAction = ({ shipId, cruiseId, newDestination }) => ({
  type: EDIT_CRUISE,
  payload: {
    shipId,
    cruiseId,
    newDestination
  }
});

const moveCruiseAction = ({ shipFromId, typeFrom, shipToId, TypeTo, cruiseId }) => ({
  type: MOVE_CRUISE,
  payload : {
    shipFromId,
    shipToId,
    cruiseId
  }
});

const removeCruiseAction = ({ shipId, cruiseId }) => ({
  type: REMOVE_CRUISE,
  payload: {
    shipId,
    cruiseId
  }
});

export {
  UPLOAD_SHIPS,
  ADD_SHIP,
  ADD_CARGO_CRUISE,
  ADD_PASSENGER_CRUISE,
  EDIT_CRUISE,
  MOVE_CRUISE,
  REMOVE_CRUISE,
  uploadShipsAction,
  addShipAction,
  addCargoCruiseAction,
  addPassengerCruiseAction,
  editCruiseAction,
  moveCruiseAction,
  removeCruiseAction
};