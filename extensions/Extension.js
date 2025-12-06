export default class Extension {
    constructor(functions) {
        if (!Array.isArray(functions))
            functions = [functions];
        this.functions = functions;
    }
}