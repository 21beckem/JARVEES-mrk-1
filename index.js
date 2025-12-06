import * as utils from './scripts/utils.js';
import Jarvees from './scripts/Jarvees.js';
import server from './scripts/server.js';

utils.verifiyENV();

const port = process.env.JARVEES_PORT || 3000;
server.listen(port, () => {
    console.log(`Jarvees is listening on port ${port}`);
});


// (async () => {

// Jarvees.beginSession();
// await Jarvees.sayToHim('turn on the bedroom light, please.');

// await ha.getAllEntityIDs();

// console.log('state:', await ha.getState('media_player.family_room_tv') );

// console.log('state:', await ha.setState('media_player.family_room_tv', 'off') );


// })();