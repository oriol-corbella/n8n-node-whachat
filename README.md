# n8n-nodes-wha-chat

This is an n8n community node for WhaChat API integration. It provides nodes to interact with WhaChat's messaging and contact management features.

## Features

- Contact Management (Add, Edit, Delete, List)
- Contact Groups (Add, Edit, Delete, List)
- Automated Replies (Add, Edit, Delete, List)
- Messaging
  - Send Text Messages with Buttons
  - Send Media (Images, Videos, Documents)
  - Send Template Messages

## Installation

Follow these steps to install this node:

```bash
# Install n8n
npm install n8n -g

# Install this node
npm install n8n-nodes-wha-chat
```

## Operations

### Contact Operations
- Add Contact
- Delete Contact
- Edit Contact
- Get Contact List

### Contact Group Operations
- Add Contact Group
- Delete Contact Group
- Edit Contact Group
- Get Contact Group List

### Automated Reply Operations
- Add Automated Reply
- Delete Automated Reply
- Edit Automated Reply
- Get Automated Replies

### Message Operations
- Send Message (with optional buttons)
- Send Media (image, video, document)
- Send Template Message

## Credentials

You need to set up WhaChat API credentials:
1. Get your API key from WhaChat panel
2. Use the API key in the node credentials

## License

[MIT](LICENSE)