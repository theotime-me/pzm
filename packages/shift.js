/* PREVENT */ if (typeof Prizm === "undefined") alert(`====== Prizm's core is missing ======\nYou have to install Prizm to continue\n>>>>>> https://bit.ly/prizm-js <<<<<<`);

Prizm.shift = function(blob, output, callback) {

let engines = {

		// THANKS https://github.com/arjun-g/blob-image-convert/blob/master/blob-image-convert.js
        images(blob, type) {
            let canvas = createTempCanvas(),
            	ctx = canvas.getContext('2d'),
				image = new Image();

			image.src = URL.createObjectURL(blob);

            image.onload = function(){
                canvas.width = image.width
                canvas.height = image.height
                ctx.drawImage(image, 0, 0)
                let result = dataURItoBlob(canvas.toDataURL(type))
                if (callback) callback(result)
			}
			
			function createTempCanvas(){
				let canvas = document.createElement('CANVAS')
				canvas.style.display = 'none'
				return canvas;
			}

			function dataURItoBlob(dataURI) {
				var byteString = atob(dataURI.split(',')[1]);
				var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
				var ab = new ArrayBuffer(byteString.length);
				var ia = new Uint8Array(ab);
				for (var i = 0; i < byteString.length; i++) {
					ia[i] = byteString.charCodeAt(i);
				}
				var blob = new Blob([ab], {type: mimeString});
				return blob;
			}
        }
};

switch (output) {
	case "png": return engines.images(blob, "image/png");
	case "jpg": return engines.images(blob, "image/jpg");
	case "jpeg": return engines.images(blob, "image/jpeg");
	case "webp": return engines.images(blob, "image/webp");
}

}