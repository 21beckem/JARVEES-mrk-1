import { GoogleGenAI } from '../cdn/genai.js';

class AI_CONFIG_TEMPLATE {
    model = 'gemini-2.5-flash-lite';
    config = {
        temperature: 0,
        thinkingConfig: { thinkingBudget: 0 },
        tools: [],
        systemInstruction: [{ text: `Your name is Jarvees. Call me sir.` }]
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
        for await (const chunk of stepper) {
            if (chunk.functionCalls)
                this.config.tools[0].functionDeclarations
                    .find(f => f.name === chunk.functionCalls[0].name)
                    ?.function(chunk.functionCalls[0].args);
            else
                responseTxt += chunk.text;
        }
        return responseTxt;
    }
}
const Config = new AI_CONFIG_TEMPLATE();


// import extensions
import smart_home_device from '../extensions/smart_home/index.js';
Config.importExtension(smart_home_device);

import follow_up_question from '../extensions/follow_up_question/index.js';
Config.importExtension(follow_up_question);












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
    beginSession() {
        this.session = [];
        this.sayToUser('Hello sir. How can I help you?');
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
    sayToUser(text, killNow=false) {
        this.session.push({
            role: 'model',
            parts: [{ text: text }]
        });
        console.log('Jarvees says:', text);

        if (killNow)
            return this.killSessionIn(0);
        
        // continue conversation if necessary
        if (text.endsWith('?')) { // if this is a follow up question
            this.killSessionIn(20);
        } else {
            // if no follow up questions, clear the session in a bit
            this.killSessionIn(5);
        }
    }
    async sayToHim(prompt) {
        this.dontKillSession();
        this.session.push({
            role: 'user',
            parts: [{ text: prompt }]
        });
        Config.setSession(this.session);
        const response = await this.ai.models.generateContentStream( Config );
        let output = await Config.parseResponse(response);
        if (output)
            this.sayToUser(output.trim());
        else
            this.killSessionIn(0);
    }
}

const Jarvees = new JARVEES_TEMPLATE();

export default Jarvees;