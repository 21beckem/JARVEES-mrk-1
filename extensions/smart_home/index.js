import { Type } from '../../cdn/genai.js';
import Extension from '../Extension.js';

const my_extension = new Extension([
    {
        name: 'smart_home_device',
        description: 'controls smart home devices. device_name is the name of the device to turn on or off. state is true if the the item should be turned on, and false if it though be turned off.',
        parameters: {
            type: Type.OBJECT,
            required: ['device_name', 'state'],
            properties: {
                device_name: {
                    type: Type.STRING,
                    enum: ['bedroom_lamp', 'projector', 'projector'],
                },
                state: {
                    type: Type.BOOLEAN,
                }
            }
        },
        function: async (args) => {
            const { device_name, state } = args;
            console.log(`Extension:\nTurning ${device_name} ${state ? 'on' : 'off'}`);
        }
    }
]);
export default my_extension;