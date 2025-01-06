import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeConnectionType,
} from 'n8n-workflow';

export class CustomNode implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Custom Node',
		name: 'customNode',
		group: ['transform'],
		version: 1,
		description: 'Basic Custom Node',
		defaults: {
			name: 'Custom Node',
		},
		inputs: [[NodeConnectionType.Main]],
		outputs: [[NodeConnectionType.Main]],
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

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		// Get message parameter
		const message = this.getNodeParameter('message', 0) as string;

		// Process the data
		for (let i = 0; i < items.length; i++) {
			const newItem: INodeExecutionData = {
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