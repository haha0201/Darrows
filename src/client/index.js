

ws = new WebSocket(location.origin.replace(/^http/, 'ws'));
ws.binaryType = 'arraybuffer'

window.backgroundMusic = new Audio();
backgroundMusic.loop = true;
backgroundMusic.src = './sounds/bg.mp3';

ws.onopen = () => {

	ws.onmessage = (msg) => {
		if (window.stutter) return;

		const obj = msgpack.decode(new Uint8Array(msg.data));

		if (obj.type === 'stats' && autoRespawn) {
			return send({ type: 'spawn' })
		}
		processMessage(obj)

		byteCount += msg.data.byteLength;
	};

	ws.onclose = () => {
		if (!window.kicked) {
			alert('Disconnected.')
		}
	};

	ref.playButton.addEventListener('click', () => {
		ref.menuDiv.classList.add('hidden');
		ref.gameDiv.classList.remove('hidden');
		startGame()
		backgroundMusic.play()
	})
}