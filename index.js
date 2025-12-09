import * as utils from './scripts/utils.js';
import Genesis from './scripts/Genesis.js';
import server from './scripts/server.js';

utils.verifiyENV();

const port = process.env.GENESIS_PORT || 3000;
server.listen(port, () => {
    console.log(`Genesis is listening on port ${port}`);
});


// (async () => {

// Genesis.beginSession();
// await Genesis.sayToHim('turn on the bedroom light, please.');

// await ha.getAllEntityIDs();

// console.log('state:', await ha.getState('media_player.family_room_tv') );

// console.log('state:', await ha.setState('media_player.family_room_tv', 'off') );


// })();