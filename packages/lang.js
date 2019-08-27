Prizm.lang = request => { // request: string
	let lang = navigator.language || navigator.userLanguage;
		lang = lang.toLowerCase();
		
	if (request != undefined){
		return request.toLowerCase() == lang;
	} else {
		return lang;
	}
};