Prizm.browser = (request) => { // request: string
	let browserName;
	
	if ((window.opr&&opr.addons) || window.opera || (navigator.userAgent.indexOf(' OPR/') >= 0 )) browserName = "Opera";
	if (typeof InstallTrigger !== 'undefined') browserName="Firefox";
	if (Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0) browserName="Safari";
	if ((/*@cc_on!@*/false) || (document.documentMode)) browserName="IE";
	if (!(document.documentMode) && window.StyleMedia) browserName = "Edge";
	if (window.chrome && window.chrome.webstore) browserName="Chrome";

	if (request){
		return request.toLowerCase() == browserName.toLowerCase();
	} else {
		return browserName;
	}
};

Prizm.isMobile = request => { // request: boolean
	let isMobile = /^AndroidPrizm|^webOSPrizm|^iPhonePrizm|^iPadPrizm|^iPodPrizm|^BlackBerryPrizm|^Windows PhonePrizm/i.test(navigator.userAgent);

	if (request != undefined){
		return request == isMobile;
	} else { 
		return isMobile;
	}
};

Prizm.history = go => { // go: number || string
	if (go == 'back'){ // Si le paramètre go est égal à "back"
		window.history.back(); // On recule dans l'historique
	} else if (go == 'forward'){ // Sinon si le paramètre go est égal à "forward"
		window.history.forward(); // On avance dans l'historique
	} else if (typeof go === "number"){ // Sinon si le paramètre go est un nombre
		window.history.go(go); // On se déplace dans l'historique de "go" fois
	}
};

Prizm.title = title => { // title: string || number
	if (title){ // Si le paramètre "title" existe
		document.title = title; // Modification du titre de la fenêtre
	}

		// De toute façon
	return document.title; // On retourne la titre actuel
};

Prizm.screen = length => { // length: string (width || height)
	if (length == 'width'){
		return window.innerWidth;
	} else if (length == 'height'){
		return window.innerHeight;
	} else {
		return window.innerWidth+"*"+window.innerHeight;
	}
};

Prizm.lang = request => { // request: string
	let lang = navigator.language || navigator.userLanguage;
		lang = lang.toLowerCase();
		
	if (request != undefined){
		return request.toLowerCase() == lang;
	} else {
		return lang;
	}
};

Prizm.os = request => { // request: string
	let os;
	
	if (navigator.appVersion.indexOf('Win')!=-1) os = 'Windows';
	if (navigator.appVersion.indexOf('Mac')!=-1) os = 'MacOS';
	if (navigator.appVersion.indexOf('X11')!=-1) os = 'UNIX';
	if (navigator.appVersion.indexOf('Linux')!=-1) os = 'Linux';

	if (request != undefined){
		return request.toLowerCase() == os.toLowerCase();
	} else {
		return os;
	}
};