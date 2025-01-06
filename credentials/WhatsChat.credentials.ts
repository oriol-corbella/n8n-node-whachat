import {
	ICredentialType,
	NodePropertyTypes,
} from 'n8n-workflow';

export class WhaChat implements ICredentialType {
	name = 'whaChatApi';
	displayName = 'WhaChat API';
	properties = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string' as NodePropertyTypes,
			default: '',
		},
	];
}