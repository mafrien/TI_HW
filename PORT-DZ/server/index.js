const { request, response } = require('express');
const express = require('express');
const app = express();
const { readData, writeData } = require('./utils');

const port = 9999;
const hostname = 'localhost';

let ships = [];

// CORS-requests
app.use((request, response, next) => {
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// Logging requests
app.use((request, response, next) => {
    console.log(
        (new Date()).toISOString(), 
        request.method,
        request.originalUrl
    );
    next();
});

// Representation of request.body
app.use(express.json());


app.options('/*', (request, response) => {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'application/json');
    response.send('OK');
});

// ---
app.get('/ships', async (request, response) => {
    ships = await readData();
    response.json(ships);
});

app.post('/ships', async (request, response) => {
    ships.push(request.body);
    await writeData(ships);

    response.setHeader('Content-Type', 'application/json');
    response.status(200).json({ 
        info: `Ship "${request.body.shipName}" was succsessfully added`
    });
});

app.post('/ships/:shipId/cargoCruises', async (request, response) => {
    const Dest = request.body.cruiseDestination;
    const Carg = request.body.cruiseCargo;
    const Destination = Dest + " (Cargo: " + Carg + ")";
    const shipId = Number(request.params.shipId);

    ships[shipId].cruises.push(Destination);
    await writeData(ships);

    response.setHeader('Content-Type', 'application/json');
    response.status(200).json({ 
        info: `Cruise "${Dest}" with cargo "${Carg}" 
        was succsessfully added to ship "${ships[shipId].shipName}"!`
    });
});

app.post('/ships/:shipId/passengerCruises', async (request, response) => {
    const Dest = request.body.cruiseDestination;
    const shipId = Number(request.params.shipId);

    ships[shipId].cruises.push(Dest);
    await writeData(ships);

    response.setHeader('Content-Type', 'application/json');
    response.status(200).json({ 
        info: `Cruise "${Dest}" was succsessfully added
        to ship "${ships[shipId].shipName}"!`
    });
});

app.patch('/ships/:shipId/cargoCruises/:cruiseId', async (request, response) => {
    const newDest = request.body.cruiseDestination;
    const newCarg = request.body.cruiseCargo;
    const newDestinationCargo = newDest + " (Cargo: " + newCarg + ")";

    const shipId = Number(request.params.shipId);
    const cruiseId = Number(request.params.cruiseId);

    ships[shipId].cruises[cruiseId] = newDestinationCargo;
    await writeData(ships);

    response.setHeader('Content-Type', 'application/json');
    response.status(200).json({ 
        info: `Cruise "${cruiseId}" was succsessfully changed!`});
});

app.patch('/ships/:shipId/passengerCruises/:cruiseId', async (request, response) => {
    const newDest = request.body;
    const shipId = Number(request.params.shipId);
    const cruiseId = Number(request.params.cruiseId);

    ships[shipId].cruises[cruiseId] = newDest;
    await writeData(ships);

    response.setHeader('Content-Type', 'application/json');
    response.status(200).json({ 
        info: `Cruise "${cruiseId}" was succsessfully changed!`});
});

app.delete('/ships/:shipId/cargoCruises/:cruiseId', async (request, response) => {
    const shipId = Number(request.params.shipId);
    const cruiseId = Number(request.params.cruiseId);

    const removedCruise = ships[shipId].cruises[cruiseId];
    ships[shipId].cruises = ships[shipId].cruises.filter(
        (cruise, index) => index !== cruiseId
    );
    await writeData(ships);

    response.setHeader('Content-Type', 'application/json');
    response.status(200).json({ 
        info: `Cruise "${removedCruise}" was succsessfully deleted!`});
});

app.delete('/ships/:shipId/passengerCruises/:cruiseId', async (request, response) => {
    const shipId = Number(request.params.shipId);
    const cruiseId = Number(request.params.cruiseId);

    const removedCruise = ships[shipId].cruises[cruiseId];
    ships[shipId].cruises = ships[shipId].cruises.filter(
        (cruise, index) => index !== cruiseId
    );
    await writeData(ships);

    response.setHeader('Content-Type', 'application/json');
    response.status(200).json({ 
        info: `Cruise "${removedCruise}" was succsessfully deleted!`});
});

app.patch('/ships/:shipId', async (request, response) => {
    const crId = request.body.cruiseId;
    const shFromId = request.body.shipFromId;
    const shToId = request.body.shipToId;
    
    if (shToId < 0 || shToId > ships.length-1) {
        response.setHeader('Content-Type', 'application/json');
        response.status(403).json({ 
            error: `Wrong destintion ship ID: ${shToId}`});
    }

    else if (ships[shToId].shipType !== ships[shFromId].shipType) {
        response.setHeader('Content-Type', 'application/json');
        response.status(403).json({ 
            error: `Types of ships dont match`});
    }

    else {
        const movedCruise = ships[shFromId].cruises[crId];
        ships[shFromId].cruises = ships[shFromId].cruises.filter(
            (cruise, index) => index !== crId
        );
        ships[shToId].cruises.push(movedCruise);
        await writeData(ships);

        response.setHeader('Content-Type', 'application/json');
        response.status(200).json({ 
            info: `Cruise was succsessfully moved!`});
    }
});



app.get('/', (request, response) => {
    response.send('Hello!');
});

// app.get('/bye', (request, response) => {
//     response.send('Goodbye!');
// });

// app.get('/bye/:name', (request, response) => {
//     response.send(`Bye ${request.params.name}!`);
// });

app.listen(port, hostname, (e) => {
    if (e) {
        console.log(e);
    }

    console.log(`Server is working on ${hostname}:${port}`);
});