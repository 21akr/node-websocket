const ws = new WebSocket('ws://localhost:8080');
const messagesDiv = document.getElementById('messages');
const messageInput = document.getElementById('messageInput');

ws.addEventListener('message', function (event) {
	if (event.data instanceof Blob) {
		const reader = new FileReader();
		reader.onload = function () {
			const message = reader.result;
			messagesDiv.innerHTML += `<div><strong>Other:</strong> ${message}</div>`;
		};
		reader.readAsText(event.data);
	} else {
		const message = event.data;
		messagesDiv.innerHTML += `<div><strong>Other:</strong> ${message}</div>`;
	}
});

function sendMessage() {
	const message = messageInput.value;
	if (message.trim() !== '') {
		ws.send(message);
		messagesDiv.innerHTML += `<div><strong>You:</strong> ${message}</div>`;
		messageInput.value = '';
	}
}

messageInput.addEventListener('keypress', function (event) {
	if (event.key === 'Enter') {
		sendMessage();
	}
});
