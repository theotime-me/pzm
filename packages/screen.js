Prizm.screen = length => { // length: string (width || height)
	if (length == 'width'){
		return window.innerWidth;
	} else if (length == 'height'){
		return window.innerHeight;
	} else {
		return window.innerWidth+"*"+window.innerHeight;
	}
};