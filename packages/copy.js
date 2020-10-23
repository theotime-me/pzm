/* PREVENT */ if (typeof Prizm === "undefined") alert(`====== Prizm's core is missing ======\nYou have to install Prizm to continue\n>>>>>> https://bit.ly/prizm-js <<<<<<`);

Prizm.copy = function(data, cb) {
	let blob = data;

	if (["string", "number"].includes(typeof data)) {
		blob = new Blob([data], { type: "text/plain" });
		write();
	} else if (data instanceof Blob) {
		if (blob.type.startsWith("image")) {
			Prizm.shift(blob, "png", png => {
				blob = png;
				write();
			});
		}
	}

	function write() {
		setTimeout(() => {
			navigator.clipboard.write([new ClipboardItem({
				[blob.type]: blob
			})]).then(function() {
				if (cb) cb(true);
			}, function(err) {
				if (cb) cb(false, err);
			});
		}, 75);
	}
}

Prizm("#img").on("change", ev => {
	let files = Prizm("#img")[0].files;

	Prizm.copy(files[0], (status, err) => {
		console.log(status, err)
	});
});