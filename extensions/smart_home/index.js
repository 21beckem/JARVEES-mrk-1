import { Type } from '../../cdn/genai.js';
import Extension from '../Extension.js';
import * as ha from './ha.js';

const deviceIds = ['bedroom_lamp', 'projector'];

const my_extension = new Extension([
    {
        name: 'set_smart_home_device_state',
        description: 'controls smart home devices. entity_id is the name of the device to turn on or off. state is true if the the item should be turned on, and false if it though be turned off.',
        parameters: {
            type: Type.OBJECT,
            required: ['entity_id', 'state'],
            properties: {
                entity_id: {
                    type: Type.STRING,
                    enum: deviceIds,
                },
                state: {
                    type: Type.BOOLEAN,
                }
            }
        },
        function: async (args) => {
            const { entity_id, state } = args;
            await ha.setState(entity_id, state);
        }
    },
    {
        name: 'get_smart_home_device_state',
        description: 'gets the status of smart home devices. entity_id is the name of the device to turn on or off.',
        parameters: {
            type: Type.OBJECT,
            required: ['entity_id'],
            properties: {
                entity_id: {
                    type: Type.STRING,
                    enum: deviceIds,
                }
            }
        },
        function: async (args) => {
            const { entity_id, state } = args;
            return 'The device is on.';// await ha.getState(entity_id);
        }
    }
]);
export default my_extension;