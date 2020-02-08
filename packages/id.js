Prizm.id = function(params, cb) {
	let length, chars, preset, uppercase, lowercase;

	if (typeof params == "object") {
		length = params.length,
		chars = params.chars,
		preset = params.preset,
		uppercase = params.uppercase,
		lowercase = params.lowercase;
	} else if (typeof params == "function") {
		cb = params;
	}

	let presets = {
		hex: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"],
		numbers: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
		alphabet: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"],
		base62: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"],
		base64: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "-", "_"],
	}, presetChoosed, string = "";

	if (["string", "number"].includes(typeof preset)) {
		preset = preset.toString().toLowerCase();
	} else {
		preset = presets.base62;
	}

	if (["string", "number"].includes(typeof length)) {
		length = parseInt(length);
	} else {
		length = 32;
	}

	if (Object.keys(presets).includes(preset)) {
		presetChoosed = presets[preset];
	} else {
		switch (preset) {
			case "hexa": case "hexadecimal": presetChoosed = presets.hex; break;
			case "abc": case "alpha": presetChoosed = presets.alphabet; break;
			case "b62": presetChoosed = presets.base62; break;
			case "b64": case "youtube": presetChoosed = presets.base64; break;
			case "nb": case "number": case "nbs": case "123": presetChoosed = presets.numbers; break;
			default: presetChoosed = presets.base64;
		}
	}

	if (Array.isArray(chars)) presetChoosed = chars;

	for (let i = 0; i<length; i++) {
		let index = Math.floor(Math.random() * presetChoosed.length);

		string += presetChoosed[index];
	}

	if (uppercase || lowercase == false) {
		string = string.toUpperCase();
	} else if (lowercase || uppercase == false) {
		string = string.toLowerCase();
	}

	if (cb) cb(string);

	return string;
};