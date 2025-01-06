"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhaChat = void 0;
class WhaChat {
    constructor() {
        this.name = 'whaChatApi';
        this.displayName = 'WhaChat API';
        this.properties = [
            {
                displayName: 'API Key',
                name: 'apiKey',
                type: 'string',
                default: '',
            },
        ];
    }
}
exports.WhaChat = WhaChat;
//# sourceMappingURL=WhaChat.credentials.js.map