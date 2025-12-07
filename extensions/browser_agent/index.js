import Extension from '../Extension.js';

// cd extensions\browser_agent\browseruse && .venv\Scripts\activate && uv run server.py
async function promptAgent(prompt) {
    let res = await fetch('http://localhost:5000/run_agent', {
        method: 'POST',
		headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
    });
    if (!res.ok) console.warn(`Browser Agent error. Is the server running?`, res.status);
    res = await res.text();
    console.log('Agent response:', res);
    return res;
};

const my_extension = new Extension([
    {
        type: 'function',
        function: {
            name: 'launch_browser_agent',
            description: 'an agent that can control your browser and complete tasks for you. prompt is the message for the task that needs to be completed. prompt must be a detailed list of what the agent needs to open, click on, copy, paste, and/or type.',
            parameters: {
                type: 'object',
                required: ['prompt'],
                properties: {
                    prompt: {
                        type: 'string',
                    }
                }
            }
        },
        method: (args) => {
            const { prompt } = args;
            promptAgent(prompt);
            return `Of course sir. I'll notify you with the results.`;
        }
    }
]);
export default my_extension;