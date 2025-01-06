import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeConnectionType,
} from 'n8n-workflow';
import { OptionsWithUri } from 'request-promise-native';

export class WhaChat implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'WhaChat',
		name: 'whaChat',
		icon: 'file:whatsapp.svg',
		group: ['transform'],
		version: 1,
		description: 'WhaChat API Integration',
		defaults: {
			name: 'WhaChat',
		},
		inputs: [[NodeConnectionType.Main]],
		outputs: [[NodeConnectionType.Main]],
		credentials: [
			{
				name: 'whaChatApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				options: [
					// Contact Operations
					{
						name: 'Add Contact',
						value: 'addContact',
						description: 'Add a new contact',
					},
					{
						name: 'Delete Contact',
						value: 'deleteContact',
						description: 'Delete a contact',
					},
					{
						name: 'Edit Contact',
						value: 'editContact',
						description: 'Edit an existing contact',
					},
					{
						name: 'Get Contact List',
						value: 'getContactList',
						description: 'Get list of all contacts',
					},
					// Contact Group Operations
					{
						name: 'Add Contact Group',
						value: 'addContactGroup',
						description: 'Add a new contact group',
					},
					{
						name: 'Delete Contact Group',
						value: 'deleteContactGroup',
						description: 'Delete a contact group',
					},
					{
						name: 'Edit Contact Group',
						value: 'editContactGroup',
						description: 'Edit a contact group',
					},
					{
						name: 'Get Contact Group List',
						value: 'getContactGroupList',
						description: 'Get list of all contact groups',
					},
					// Automated Reply Operations
					{
						name: 'Add Automated Reply',
						value: 'addAutomatedReply',
						description: 'Add a new automated reply',
					},
					{
						name: 'Delete Automated Reply',
						value: 'deleteAutomatedReply',
						description: 'Delete an automated reply',
					},
					{
						name: 'Edit Automated Reply',
						value: 'editAutomatedReply',
						description: 'Edit an automated reply',
					},
					{
						name: 'Get Automated Replies',
						value: 'getAutomatedReplies',
						description: 'Get list of all automated replies',
					},
					// Message Operations
					{
						name: 'Send Message',
						value: 'sendMessage',
						description: 'Send a message',
					},
					{
						name: 'Send Media',
						value: 'sendMedia',
						description: 'Send media message',
					},
					{
						name: 'Send Template',
						value: 'sendTemplate',
						description: 'Send a template message',
					},
				],
				default: 'getContactList',
			},
			// UUID Parameter
			{
				displayName: 'UUID',
				name: 'uuid',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						operation: ['deleteContact', 'editContact', 'deleteContactGroup', 'editContactGroup', 'deleteAutomatedReply', 'editAutomatedReply'],
					},
				},
				default: '',
				description: 'UUID of the resource',
			},
			// Contact Parameters
			{
				displayName: 'Phone Number',
				name: 'phone',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						operation: ['addContact', 'editContact', 'sendMessage', 'sendMedia', 'sendTemplate'],
					},
				},
				default: '',
				description: 'Phone number of the contact',
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						operation: ['addContact', 'editContact', 'addContactGroup', 'editContactGroup'],
					},
				},
				default: '',
				description: 'Name of the contact or group',
			},
			// Message Parameters
			{
				displayName: 'Message',
				name: 'message',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						operation: ['sendMessage'],
					},
				},
				default: '',
				description: 'Message to send',
			},
			{
				displayName: 'Header',
				name: 'header',
				type: 'string',
				required: false,
				displayOptions: {
					show: {
						operation: ['sendMessage'],
					},
				},
				default: '',
				description: 'Message header',
			},
			{
				displayName: 'Footer',
				name: 'footer',
				type: 'string',
				required: false,
				displayOptions: {
					show: {
						operation: ['sendMessage'],
					},
				},
				default: '',
				description: 'Message footer',
			},
			{
				displayName: 'Buttons',
				name: 'buttons',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: true,
				},
				displayOptions: {
					show: {
						operation: ['sendMessage'],
					},
				},
				default: {},
				options: [
					{
						name: 'buttonsValues',
						displayName: 'Buttons',
						values: [
							{
								displayName: 'ID',
								name: 'id',
								type: 'string',
								default: '',
								description: 'Button ID',
							},
							{
								displayName: 'Title',
								name: 'title',
								type: 'string',
								default: '',
								description: 'Button title',
							},
						],
					},
				],
			},
			// Media Parameters
			{
				displayName: 'Media Type',
				name: 'media_type',
				type: 'options',
				required: true,
				displayOptions: {
					show: {
						operation: ['sendMedia'],
					},
				},
				options: [
					{
						name: 'Image',
						value: 'image',
					},
					{
						name: 'Video',
						value: 'video',
					},
					{
						name: 'Document',
						value: 'document',
					},
				],
				default: 'image',
				description: 'Type of media to send',
			},
			{
				displayName: 'Media URL',
				name: 'media_url',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						operation: ['sendMedia'],
					},
				},
				default: '',
				description: 'URL of the media to send',
			},
			{
				displayName: 'Caption',
				name: 'caption',
				type: 'string',
				required: false,
				displayOptions: {
					show: {
						operation: ['sendMedia'],
					},
				},
				default: '',
				description: 'Caption for image or video',
			},
			{
				displayName: 'File Name',
				name: 'file_name',
				type: 'string',
				required: false,
				displayOptions: {
					show: {
						operation: ['sendMedia'],
					},
				},
				default: '',
				description: 'Name of the file',
			},
			// Template Parameters
			{
				displayName: 'Template',
				name: 'template',
				type: 'json',
				required: true,
				displayOptions: {
					show: {
						operation: ['sendTemplate'],
					},
				},
				default: '',
				description: 'Template message configuration',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const credentials = await this.getCredentials('whaChatApi');
		const baseUrl = 'https://panel.wha.chat/api';
		
		const operation = this.getNodeParameter('operation', 0) as string;

		for (let i = 0; i < items.length; i++) {
			try {
				let response;
				const options: OptionsWithUri = {
					headers: {
						'Authorization': `Bearer ${credentials.apiKey}`,
						'Content-Type': 'application/json',
					},
					json: true,
				};

				switch (operation) {
					case 'getContactList':
						options.method = 'GET';
						options.uri = `${baseUrl}/contacts`;
						break;

					case 'addContact':
						options.method = 'POST';
						options.uri = `${baseUrl}/contacts`;
						options.body = {
							phone: this.getNodeParameter('phone', i) as string,
							name: this.getNodeParameter('name', i) as string,
						};
						break;

					case 'editContact':
						options.method = 'PUT';
						options.uri = `${baseUrl}/contacts/${this.getNodeParameter('uuid', i)}`;
						options.body = {
							phone: this.getNodeParameter('phone', i) as string,
							name: this.getNodeParameter('name', i) as string,
						};
						break;

					case 'deleteContact':
						options.method = 'DELETE';
						options.uri = `${baseUrl}/contacts/${this.getNodeParameter('uuid', i)}`;
						break;

					case 'getContactGroupList':
						options.method = 'GET';
						options.uri = `${baseUrl}/contact-groups`;
						break;

					case 'addContactGroup':
						options.method = 'POST';
						options.uri = `${baseUrl}/contact-groups`;
						options.body = {
							name: this.getNodeParameter('name', i) as string,
						};
						break;

					case 'editContactGroup':
						options.method = 'PUT';
						options.uri = `${baseUrl}/contact-groups/${this.getNodeParameter('uuid', i)}`;
						options.body = {
							name: this.getNodeParameter('name', i) as string,
						};
						break;

					case 'deleteContactGroup':
						options.method = 'DELETE';
						options.uri = `${baseUrl}/contact-groups/${this.getNodeParameter('uuid', i)}`;
						break;

					case 'getAutomatedReplies':
						options.method = 'GET';
						options.uri = `${baseUrl}/canned-replies`;
						break;

					case 'addAutomatedReply':
						options.method = 'POST';
						options.uri = `${baseUrl}/canned-replies`;
						break;

					case 'editAutomatedReply':
						options.method = 'PUT';
						options.uri = `${baseUrl}/canned-replies/${this.getNodeParameter('uuid', i)}`;
						break;

					case 'deleteAutomatedReply':
						options.method = 'DELETE';
						options.uri = `${baseUrl}/canned-replies/${this.getNodeParameter('uuid', i)}`;
						break;

					case 'sendMessage':
						options.method = 'POST';
						options.uri = `${baseUrl}/send`;
						options.body = {
							phone: this.getNodeParameter('phone', i) as string,
							message: this.getNodeParameter('message', i) as string,
							header: this.getNodeParameter('header', i) as string,
							footer: this.getNodeParameter('footer', i) as string,
						};
						const buttons = this.getNodeParameter('buttons.buttonsValues', i, []) as Array<{ id: string; title: string }>;
						if (buttons.length > 0) {
							options.body.buttons = buttons;
						}
						break;

					case 'sendMedia':
						options.method = 'POST';
						options.uri = `${baseUrl}/send/media`;
						options.body = {
							phone: this.getNodeParameter('phone', i) as string,
							media_type: this.getNodeParameter('media_type', i) as string,
							media_url: this.getNodeParameter('media_url', i) as string,
							caption: this.getNodeParameter('caption', i) as string,
							file_name: this.getNodeParameter('file_name', i) as string,
						};
						break;

					case 'sendTemplate':
						options.method = 'POST';
						options.uri = `${baseUrl}/send/template`;
						options.body = {
							phone: this.getNodeParameter('phone', i) as string,
							template: JSON.parse(this.getNodeParameter('template', i) as string),
						};
						break;

					default:
						throw new Error(`The operation "${operation}" is not supported!`);
				}

				response = await this.helpers.request(options);
				returnData.push({ json: response });
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({ json: { error: error.message } });
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}