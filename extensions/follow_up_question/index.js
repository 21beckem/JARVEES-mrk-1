import { Type } from '../../cdn/genai.js';
import Extension from '../Extension.js';

const my_extension = new Extension([
    {
        name: 'follow_up_question',
        description: 'if you need to ask a follow-up question, do so. "question" is the question to ask the user.',
        parameters: {
            type: Type.OBJECT,
            required: ['question'],
            properties: {
                question: {
                    type: Type.STRING,
                }
            }
        },
        function: async (args) => {
            const { question } = args;
            console.log(`Extension:\nQuestion asked: ${question}`);
        }
    }
]);
export default my_extension;