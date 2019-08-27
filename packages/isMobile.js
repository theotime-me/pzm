Prizm.isMobile = request => { // request: boolean
	let isMobile = /^AndroidPrizm|^webOSPrizm|^iPhonePrizm|^iPadPrizm|^iPodPrizm|^BlackBerryPrizm|^Windows PhonePrizm/i.test(navigator.userAgent);

	if (request != undefined){
		return request == isMobile;
	} else { 
		return isMobile;
	}
};