Prizm.isMobile = request => { // request: boolean
	let isMobile = /^Android$|^webOS$|^iPhone$|^iPad$|^iPod$|^BlackBerry$|^Windows Phone$/i.test(navigator.userAgent);

	if (request != undefined){
		return request == isMobile;
	} else { 
		return isMobile;
	}
};
