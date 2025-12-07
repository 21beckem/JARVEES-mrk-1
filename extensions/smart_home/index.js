import Extension from '../Extension.js';
import * as ha from './ha.js';

const deviceIds = ['bedroom_lamp', 'projector'];

const my_extension = new Extension([
    {
        type: 'function',
        function: {
            name: 'set_smart_home_device_state',
            description: 'controls smart home devices. entity_id is the name of the device to turn on or off. state is true if the the item should be turned on, and false if it though be turned off.',
            parameters: {
                type: 'object',
                required: ['entity_id', 'state'],
                properties: {
                    entity_id: {
                        type: 'string',
                        enum: deviceIds,
                    },
                    state: {
                        type: 'boolean',
                    }
                }
            }
        },
        method: async (args) => {
            const { entity_id, state } = args;
            return `I am setting ${entity_id} to ${state}.`;
            await ha.setState(entity_id, state);
        }
    },
    {
        type: 'function',
        function: {
            name: 'get_smart_home_device_state',
            description: 'gets the status of smart home devices. entity_id is the name of the device to turn on or off.',
            parameters: {
                type: 'object',
                required: ['entity_id'],
                properties: {
                    entity_id: {
                        type: 'string',
                        enum: deviceIds,
                    }
                }
            }
        },
        method: async (args) => {
            const { entity_id } = args;
            return 'The device is on.';
            await ha.getState(entity_id);
        }
    }
]);
export default my_extension;