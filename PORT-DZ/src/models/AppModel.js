const addShip = async (ship) => {
    const response = await fetch(`http://localhost:9999/ships`, {
        method: 'POST',
        body: JSON.stringify(ship),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const { info } = await response.json();
    return info;
}

const addCargoCruise = async ({ shipId, cruiseDestination, cruiseCargo }) => {
    const response = await fetch(`http://localhost:9999/ships/${shipId}/cargoCruises`, {
        method: 'POST',
        body: JSON.stringify({ cruiseDestination, cruiseCargo }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const { info } = await response.json();
    return info;
}

const addPassengerCruise = async ({ shipId, cruiseDestination, cruiseCargo }) => {
    const response = await fetch(`http://localhost:9999/ships/${shipId}/passengerCruises`, {
        method: 'POST',
        body: JSON.stringify({ cruiseDestination }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const { info } = await response.json();
    return info;
}

const editCargoCruise = async ({ shipId, cruiseId, cruiseDestination, cruiseCargo }) => {
    const response = await fetch(`http://localhost:9999/ships/${shipId}/cargoCruises/${cruiseId}`, {
        method: 'PATCH',
        body: JSON.stringify({ cruiseDestination, cruiseCargo }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const { info } = await response.json();
    return info;
}

const editPassengerCruise = async ({ shipId, cruiseId, cruiseDestination }) => {
    const response = await fetch(`http://localhost:9999/ships/${shipId}/passengerCruises/${cruiseId}`, {
        method: 'PATCH',
        body: JSON.stringify({ cruiseDestination }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const { info } = await response.json();
    return info;
}

const removeCargoCruise = async ({ shipId, cruiseId }) => {
    const response = await fetch(`http://localhost:9999/ships/${shipId}/cargoCruises/${cruiseId}`, {
        method: 'DELETE',
    });

    const { info } = await response.json();
    return info;
}

const removePassengerCruise = async ({ shipId, cruiseId }) => {
    const response = await fetch(`http://localhost:9999/ships/${shipId}/passengerCruises/${cruiseId}`, {
        method: 'DELETE',
    });

    const { info } = await response.json();
    return info;
}

const moveCruise = async ({ cruiseId, shipFromId, shipToId }) => {
    const response = await fetch(`http://localhost:9999/ships/${shipFromId}`, {
        method: 'PATCH',
        body: JSON.stringify({ cruiseId, shipFromId, shipToId }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.status !== 200) {
        const { error } = await response.json();
        return Promise.reject(error);
    }

    const { info } = await response.json();
    return info;
}

const getShips = async () => {
    const response = await fetch(`http://localhost:9999/ships`);
    const ships = await response.json();
    return ships;
};

export {
    addShip,
    addCargoCruise,
    editCargoCruise,
    moveCruise,
    removeCargoCruise,
    addPassengerCruise,
    editPassengerCruise,
    removePassengerCruise,
    getShips
};