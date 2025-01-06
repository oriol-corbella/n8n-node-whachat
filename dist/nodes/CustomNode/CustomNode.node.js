"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomNode = void 0;
class CustomNode {
    constructor() {
        this.description = {
            displayName: 'Custom Node',
            name: 'customNode',
            group: ['transform'],
            version: 1,
            description: 'Basic Custom Node',
            defaults: {
                name: 'Custom Node',
            },
            inputs: [["main"]],
            outputs: [["main"]],
            properties: [
                {
                    displayName: 'Message',
                    name: 'message',
                    type: 'string',
                    default: '',
                    placeholder: 'Enter a message',
                    description: 'The message to be processed',
                },
            ],
        };
    }
    async execute() {
        const items = this.getInputData();
        const returnData = [];
        const message = this.getNodeParameter('message', 0);
        for (let i = 0; i < items.length; i++) {
            const newItem = {
                json: {
                    message,
                    processedAt: new Date().toISOString(),
                },
            };
            returnData.push(newItem);
        }
        return [returnData];
    }
}
exports.CustomNode = CustomNode;
//# sourceMappingURL=CustomNode.node.js.map