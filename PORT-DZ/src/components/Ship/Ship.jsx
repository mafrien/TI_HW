import React, { memo } from 'react';
import { connect } from 'react-redux';
import {
    addCargoCruiseAction,
    addPassengerCruiseAction
} from '../../store/actions';
import Cruise from '../Cruise/Cruise'
import { 
    addCargoCruise as addCargoCruiseServer,
    addPassengerCruise as addPassengerCruiseServer 
} from '../../models/AppModel';

const Ship = ({
    shipName,
    shipType,
    shipId,
    cruises,
    addCargoCruiseDispatch,
    addPassengerCruiseDispatch
}) => {
    const addCruise = async () => {
        if (shipType === "cargo") {
            let newCruiseDestination = prompt('Введите пункт назначения.');
            let newCruiseCargo = prompt('Введите перевозимый товар.');
            if (!newCruiseDestination || !newCruiseCargo) return;

            newCruiseDestination = newCruiseDestination.trim();
            newCruiseCargo = newCruiseCargo.trim();
            if (!newCruiseDestination || !newCruiseCargo) return;

            const info = await addCargoCruiseServer(
                { 
                    shipId, 
                    cruiseDestination: newCruiseDestination, 
                    cruiseCargo: newCruiseCargo 
                });
            console.log(info);
            addCargoCruiseDispatch(
                { 
                    shipId, 
                    cruiseDestination: newCruiseDestination, 
                    cruiseCargo: newCruiseCargo
                });
        }
        
        if (shipType === "passenger") {
            let newCruiseDestination = prompt('Введите пункт назначения.');            
            if (!newCruiseDestination) return;

            newCruiseDestination = newCruiseDestination.trim();
            if (!newCruiseDestination) return;
            
            const info = await addPassengerCruiseServer(
                { 
                    shipId, 
                    cruiseDestination: newCruiseDestination
                });
            console.log(info);
            
            addPassengerCruiseDispatch({ shipId, cruiseDestination: newCruiseDestination });
        }
    };

    return (
        <div className="tm-tasklist">
            <header className="tm-tasklist-header">
                {shipId+1}. {shipName}
            </header>
            <div className="tm-tasklist-tasks">
                {cruises.map((cruise, index) => (
                    <Cruise
                        cruiseDestination={cruise}
                        cruiseId={index}
                        shipId={shipId}
                        shipType={shipType}
                        key={`ship-${shipId}_cruise-${index}`}
                    />
                ))}
            </div>
            <footer 
                className="tm-tasklist-add-task"
                onClick={addCruise}
            >
                Добавить рейс
            </footer>
        </div>
    );
};

const mapDispatchToProps = dispatch => ({
    addCargoCruiseDispatch: ({ shipId, cruiseDestination, cruiseCargo }) => 
        dispatch(addCargoCruiseAction({ shipId, cruiseDestination, cruiseCargo })),

    addPassengerCruiseDispatch: ({ shipId, cruiseDestination }) =>
        dispatch(addPassengerCruiseAction({ shipId, cruiseDestination }))
});

export default connect(null, mapDispatchToProps)(memo(Ship));
