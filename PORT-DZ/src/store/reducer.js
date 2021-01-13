import {
  UPLOAD_SHIPS,
  ADD_SHIP,
  ADD_CARGO_CRUISE,
  ADD_PASSENGER_CRUISE,
  EDIT_CRUISE,
  MOVE_CRUISE,
  REMOVE_CRUISE,
} from './actions';

const initialState = {
  ships: []
}

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case UPLOAD_SHIPS:
      return {
        ...state,
        ships: payload
      };

    case ADD_SHIP:
      return {
        ...state,
        ships: [
          ...state.ships,
          {
            shipName: payload.shipName,
            shipType: payload.shipType,
            cruises: []
          }
        ]
      };

    case ADD_CARGO_CRUISE:
      return {
        ...state,
        ships: state.ships.map((ship, index) => {
          if (index === payload.shipId) {
            return {
              ...ship,
              cruises: [
                ...ship.cruises, 
                payload.cruiseDestination + " (Cargo: " + payload.cruiseCargo + ")"
              ]
            };
          }
          return { ...ship };
        })
      };

    case ADD_PASSENGER_CRUISE:
      return {
        ...state,
        ships: state.ships.map(
          (ship, index) => index !== payload.shipId
            ? { ...ship }
            : { ...ship, cruises: [...ship.cruises, payload.cruiseDestination] }
          )
      };
      
    case EDIT_CRUISE:
      return {
        ...state,
        ships: state.ships.map(
          (ship, index) => index !== payload.shipId
            ? { ...ship }
            : { 
                ...ship, 
                cruises: ship.cruises.map(
                  (cruise, cruiseIndex) => cruiseIndex === payload.cruiseId
                    ? payload.newDestination
                    : cruise
                ) 
              }
        ) 
      };

    case MOVE_CRUISE: 
      if (payload.shipToId < 0 || payload.shipToId > state.ships.length-1) {
        window.alert("Попытка передачи рейса несуществующему кораблю!")
        return state;
      }
      
      const typeFrom = state.ships[payload.shipFromId].shipType;
      const typeTo = state.ships[payload.shipToId].shipType;
      if (typeTo !== typeFrom) {
        window.alert("Типы кораблей не совпадают!");
        return state;
      }
      if (payload.shipToId === payload.shipFromId) return state;

      const movedCruise = state.ships[payload.shipFromId].cruises[payload.cruiseId];
      const stayCruises = state.ships[payload.shipFromId].cruises.filter(
        cruise => cruise !== movedCruise
      );

      return {
        ...state,
        ships: state.ships.map((ship, index) => {
          if (typeTo === typeFrom) {
            if (index === payload.shipToId) {
              return {
                ...ship,
                cruises: [ ...ship.cruises, movedCruise ]
              };
            }

            if (index === payload.shipFromId) {
              return {
                ...ship,
                cruises: stayCruises
              };
            }

            return { ...ship };
          }

          return { ...ship };
        })
      };

    case REMOVE_CRUISE:
      const removedCruise = state.ships[payload.shipId].cruises[payload.cruiseId];
      const removeUpdateCruises = state.ships[payload.shipId].cruises.filter(
        cruise => cruise !== removedCruise
      );
      return {
        ...state,
        ships: state.ships.map((ship, index) => {
          if (index === payload.shipId) {
            return {
              ...ship,
              cruises : removeUpdateCruises
            };
          }

          return { ...ship };
        })
      };

    default:
      return state;
  }
}