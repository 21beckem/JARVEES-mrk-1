import * as utils from './scripts/utils.js';
import * as ha from './scripts/ha.js';

utils.verifiyENV();


(async () => {

await ha.getAllEntityIDs();

console.log('state:', await ha.getState('media_player.family_room_tv') );

console.log('state:', await ha.setState('media_player.family_room_tv', 'on') );


})();