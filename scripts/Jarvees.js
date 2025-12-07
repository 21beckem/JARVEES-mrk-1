import { GoogleGenAI } from '../cdn/genai.js';

class AI_CONFIG_TEMPLATE {
    model = 'gemini-2.0-flash-lite';
    config = {
        temperature: 0,
        thinkingConfig: { thinkingBudget: 0 },
        tools: [],
        systemInstruction: [{ text: `
Things to know but never say:
- Try to keep responses to less than 30 words.
- Use british language and spelling. Never use slang.

Things to know about yourself:
- Your name is Jarvees.
- Call me sir every now and then.
- You are an AI assistant created and trained by Mr. Becker.
` }]
    };
    contents = [];
    constructor() {
        this.config.tools.push({
            functionDeclarations: []
        });
    }
    importExtension(extension) {
        this.config.tools[0].functionDeclarations.push(...(extension.functions));
        return this;
    }
    setSession(contents) {
        this.contents = contents;
    }
    async parseResponse(stepper) {
        let responseTxt = '';
        try {
            for await (const chunk of stepper) {
                if (chunk.functionCalls) {
                    let thisFunction = this.config.tools[0].functionDeclarations
                        .find(f => f.name === chunk.functionCalls[0].name)
                    if (!thisFunction) continue;
                    let funcResponse = await thisFunction.function(chunk.functionCalls[0].args);
                    responseTxt += (funcResponse && typeof funcResponse === 'string') ? funcResponse : 'Of course sir.';
                }
                else
                    responseTxt += chunk.text;
                responseTxt += ' ';
            }
        }
        catch (error) {
            responseTxt = `I'm sorry, but I'm facing an error. I'll send the details to Mr. Becker for further investigation.`;
        }
        return responseTxt.trim();
    }
}
const Config = new AI_CONFIG_TEMPLATE();


// import extensions
import smart_home_device from '../extensions/smart_home/index.js';
Config.importExtension(smart_home_device);

import browser_agent from '../extensions/browser_agent/index.js';
Config.importExtension(browser_agent);










class JARVEES_TEMPLATE {
    // initialize
    constructor() {
        this.session = [];
        this.sessionTimeout = null;
    }
    authenticate() {
        this.ai = new GoogleGenAI({
            apiKey: process.env.GOOGLE_API_KEY
        });
    }

    // session
    beginSession(startWithHisHello=true) {
        this.session = [];
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
            role: 'model',
            parts: [{ text: text }]
        });
        // console.log('Jarvees says:', text);

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
            parts: [{ text: prompt }]
        });
        Config.setSession(this.session);
        const response = await this.ai.models.generateContentStream( Config );
        let output = await Config.parseResponse(response);
        if (output)
            return this.#sayToUser(output.trim());
        else
            this.killSessionIn(0);
    }
}

const Jarvees = new JARVEES_TEMPLATE();

export default Jarvees;