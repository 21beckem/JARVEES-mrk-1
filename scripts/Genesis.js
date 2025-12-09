import ollama from 'ollama';

class AI_CONFIG_TEMPLATE {
    model = 'gpt-oss:20b-cloud';
    stream = false;
    think = false;
    config = {
        temperature: 0,
        thinkingConfig: { thinkingBudget: 0 }
    };
    tools = [];
    messages = [];
    constructor() {}
    importExtension(extension) {
        this.tools.push(...(extension.functions));
        return this;
    }
    setSession(messages) {
        this.messages = messages;
    }
    async parseResponse(response) {
        let errorText = `I'm sorry, but I'm facing an error. I'll send the details to Mr. Becker for further investigation.`;
        try {
            if (!response.done) return errorText;
            if (!response.message) return errorText;

            if (response.message.tool_calls) {
                let thisFunction = this.tools.find(f => f.function.name === response.message.tool_calls[0].function.name);
                if (!thisFunction) return errorText + ' Function not found.';
                let funcResponse = await thisFunction.method(response.message.tool_calls[0].function.arguments);
                return (funcResponse && typeof funcResponse === 'string') ? funcResponse : 'Of course sir.';
            } else {
                return response.message.content;
            }
        }
        catch (error) {
            debugger;
            return errorText;
        }
    }
}
const Config = new AI_CONFIG_TEMPLATE();


// import extensions
import smart_home_device from '../extensions/smart_home/index.js';
Config.importExtension(smart_home_device);

import browser_agent from '../extensions/browser_agent/index.js';
Config.importExtension(browser_agent);










class GENESIS_TEMPLATE {
    // initialize
    constructor() {
        this.beginSession(false);
        this.sessionTimeout = null;
    }
    authenticate() {
        this.ai = {
            generate: async function(config) {
                let res = await ollama.chat(
                    JSON.parse(JSON.stringify(config))
                );
                return res;
            }
        }
    }

    // session
    beginSession(startWithHisHello=true) {
        this.session = [{
            role: 'system',
            content: `
DO NOT FORGET TO GIVE ME THE FUNCTION NAME WHEN CALLING A TOOL!

Things to know but never say:
- Try to keep responses to less than 30 words.
- Use british language and spelling. Never use slang.

Things to know about yourself:
- Your name is Genesis.
- Call me sir every now and then.
- You are an AI assistant created and trained by Mr. Becker.
`
        }];
        if (startWithHisHello)
            this.#sayToUser('Hello sir. How can I help you?');
    }
    dontKillSession() {
        clearTimeout(this.sessionTimeout);
    }
    killSessionIn(seconds) {
        this.sessionTimeout = setTimeout(() => {
            this.session = [];
            console.log('session ended');
        }, seconds * 1000);
    }

    // conversation
    #sayToUser(text, killNow=false) {
        this.session.push({
            role: 'assistant',
            content: text
        });
        // console.log('Genesis says:', text);

        if (killNow)
            return this.killSessionIn(0);
        
        // continue conversation if necessary
        if (text.endsWith('?')) { // if this is a follow up question
            this.killSessionIn(20);
        } else {
            // if no follow up questions, clear the session in a bit
            this.killSessionIn(5);
        }
        return text;
    }
    async sayToHim(prompt) {
        // if the session is empty, start a new one
        if (this.session.length === 0)
            this.beginSession(false); // don't start with his hello message since we're already saying something

        this.dontKillSession();
        this.session.push({
            role: 'user',
            content: prompt
        });
        Config.setSession(this.session);
        const response = await this.ai.generate( Config );
        let output = await Config.parseResponse(response);
        if (output)
            return this.#sayToUser(output.trim());
        else
            this.killSessionIn(0);
    }
}

const Genesis = new GENESIS_TEMPLATE();

export default Genesis;