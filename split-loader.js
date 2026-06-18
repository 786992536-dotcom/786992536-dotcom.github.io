(function () {
	'use strict';

	async function loadParts(label, parts, onProgress, fallbackTotal) {
		const buffers = [];
		let loaded = 0;
		const total = fallbackTotal || 0;
		for (let i = 0; i < parts.length; i += 1) {
			const part = parts[i];
			if (onProgress) {
				onProgress(loaded, total, label + ' ' + (i + 1) + '/' + parts.length);
			}
			let response;
			try {
				response = await fetch(part, { credentials: 'same-origin' });
			} catch (err) {
				throw new Error('Failed to fetch ' + part + ': ' + (err && err.message ? err.message : err));
			}
			if (!response.ok) {
				throw new Error('Failed to load ' + part + ': HTTP ' + response.status);
			}
			const buffer = await response.arrayBuffer();
			buffers.push(buffer);
			loaded += buffer.byteLength;
			if (onProgress) {
				onProgress(loaded, total, label + ' ' + (i + 1) + '/' + parts.length);
			}
		}
		return buffers;
	}

	window.loadThunderRiftWasm = async function loadThunderRiftWasm(onProgress) {
		const buffers = await loadParts('Engine', [
	"index.wasm.cca8bc7c462d348a.part.aa",
	"index.wasm.cca8bc7c462d348a.part.ab",
	"index.wasm.cca8bc7c462d348a.part.ac",
	"index.wasm.cca8bc7c462d348a.part.ad",
	"index.wasm.cca8bc7c462d348a.part.ae"
], onProgress, 37695054);
		window.THUNDER_RIFT_WASM_BINARY = await new Blob(buffers, { type: 'application/wasm' }).arrayBuffer();
	};

	window.loadThunderRiftPack = async function loadThunderRiftPack(onProgress) {
		const buffers = await loadParts('Game data', [
	"index.pck.eac54945a50b306d.part.aa",
	"index.pck.eac54945a50b306d.part.ab",
	"index.pck.eac54945a50b306d.part.ac",
	"index.pck.eac54945a50b306d.part.ad",
	"index.pck.eac54945a50b306d.part.ae"
], onProgress, 38142972);
		return new Blob(buffers, { type: 'application/octet-stream' }).arrayBuffer();
	};
}());
