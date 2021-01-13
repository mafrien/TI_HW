import React, { memo } from 'react';
import { connect } from 'react-redux';
import {
    editCruiseAction, 
    moveCruiseAction,
    removeCruiseAction
} from '../../store/actions';
import {
    editCargoCruise as editCargoCruiseServer,
    removeCargoCruise as removeCargoCruiseServer,
    moveCruise as moveCruiseServer,
    editPassengerCruise as editPassengerCruiseServer,
    removePassengerCruise as removePassengerCruiseServer,
} from '../../models/AppModel';

const Cruise =({
    cruiseDestination,
    cruiseId,
    shipId,
    shipType,
    editCruiseDispatch,
    moveCruiseDispatch,
    removeCruiseDispatch
}) => {
    const editCruise = async () => {
      if (shipType === 'passenger') {
        let newCruiseDestination = prompt('Введите новое место назначения');
        if (!newCruiseDestination) return;

        newCruiseDestination = newCruiseDestination.trim();
        if (!newCruiseDestination || newCruiseDestination === cruiseDestination) return;

        const info = await editPassengerCruiseServer(
          {
            shipId,
            cruiseId,
            cruiseDestination: newCruiseDestination, 
          });
        console.log(info);

        editCruiseDispatch({ shipId, cruiseId, newDestination: newCruiseDestination });
      }

      if (shipType === 'cargo') {
        let newCruiseDestination = prompt('Введите новое место назначения');
        let newCruiseCargo = prompt('Введите новый груз');
        
        if (!newCruiseDestination || !newCruiseCargo) return;

        newCruiseDestination = newCruiseDestination.trim();
        newCruiseCargo = newCruiseCargo.trim();
        if (!newCruiseDestination || !newCruiseCargo) return;
        if (newCruiseDestination === cruiseDestination) return;
        
        const info = await editCargoCruiseServer(
          {
             shipId,
             cruiseId,
             cruiseDestination: newCruiseDestination, 
             cruiseCargo: newCruiseCargo
            });
        console.log(info);
        
        editCruiseDispatch({ shipId, cruiseId, newDestination: newCruiseDestination + " (Cargo: " + newCruiseCargo + ")" });
      }
    };

    const removeCruise = async () => {
        // eslint-disable-next-line no-restricted-globals
        if (confirm(`Рейс '${cruiseDestination}' будет удален. Продолжить?`)) {
          if (shipType === 'cargo') {
            const info = await removeCargoCruiseServer({ shipId, cruiseId });
            console.log(info); 
            
            removeCruiseDispatch({ shipId, cruiseId });
          }

          if (shipType === 'passenger') {
            const info = await removePassengerCruiseServer({ shipId, cruiseId });
            console.log(info); 
            
            removeCruiseDispatch({ shipId, cruiseId });
          }
        }
    };

    const moveCruise = async () => {
      let newShipId = prompt('Введите номер корабля, которому хотите переназначить рейс');
      if (!newShipId) return;

      newShipId = newShipId.trim();
      if (!newShipId) return;
      
      newShipId = Number(newShipId) - 1;
      try {
        const info = await moveCruiseServer({
          cruiseId,
          shipFromId: shipId,
          shipToId: newShipId
        });
        console.log(info);
        moveCruiseDispatch({ shipFromId: shipId, shipToId: newShipId, cruiseId });
      } catch(error) {
        window.alert(error);
        console.log(error);
      }
    };

    return(
        <div className="tm-tasklist-task">
          <div className="tm-tasklist-task-text">
            {cruiseDestination}
          </div>
          <div className="tm-tasklist-task-controls">
            <div className="tm-tasklist-task-controls-row">
              <div 
                className="tm-tasklist-task-controls-icon left-arrow-icon"
                onClick={moveCruise}  
              ></div>
              <div 
                class="tm-tasklist-task-controls-icon right-arrow-icon"
                onClick={moveCruise}
              ></div>
            </div>
            <div className="tm-tasklist-task-controls-row">
              <div 
                className="tm-tasklist-task-controls-icon edit-icon"
                onClick={editCruise}
              ></div>
              <div 
                className="tm-tasklist-task-controls-icon delete-icon"
                onClick={removeCruise}
              ></div>
            </div>
          </div>
        </div>
    );
};

const mapDispatchToProps = dispatch => ({
    // editCargoCruiseDispatch: ({ shipId, cruiseId, newDestination, newCargo}) => 
    //     dispatch(editCargoCruiseAction({ shipId, cruiseId, newDestination, newCargo })),
    
    editCruiseDispatch: ({ shipId, cruiseId, newDestination }) => 
        dispatch(editCruiseAction({ shipId, cruiseId, newDestination })),
    
    moveCruiseDispatch: ({ shipFromId, shipToId, cruiseId }) => 
      dispatch(moveCruiseAction({ shipFromId, shipToId, cruiseId })),
    
    removeCruiseDispatch: ({ shipId, cruiseId }) =>
        dispatch(removeCruiseAction({ shipId, cruiseId }))
});

export default connect(null, mapDispatchToProps)(memo(Cruise));
