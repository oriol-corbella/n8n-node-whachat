module.exports = {
	root: true,
	env: {
		browser: true,
		es6: true,
		node: true,
	},
	parser: '@typescript-eslint/parser',
	plugins: ['n8n-nodes-base'],
	extends: ['plugin:n8n-nodes-base/recommended'],
	rules: {
		'n8n-nodes-base/node-class-description-name-unsuffixed': 'off',
	},
};