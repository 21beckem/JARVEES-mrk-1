import * as utils from './scripts/utils.js';
import * as ha from './scripts/ha.js';
import Jarvees from './scripts/Jarvees.js';

utils.verifiyENV();
Jarvees.authenticate();


(async () => {

Jarvees.beginSession();
await Jarvees.sayToHim('turn on the bedroom light, please.');

await ha.getAllEntityIDs();

console.log('state:', await ha.getState('media_player.family_room_tv') );

console.log('state:', await ha.setState('media_player.family_room_tv', 'off') );


})();