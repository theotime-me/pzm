/* PREVENT */if (typeof Prizm === "undefined") alert(`====== Prizm's core is missing ======\nYou have to install Prizm to continue\n>>>>>> https://bit.ly/prizm-js <<<<<<`);

Prizm.browser = (request) => { // request: string
	let browserName = undefined,
		UA = navigator.userAgent;
	
	if ((window.opr&&opr.addons) || window.opera || (navigator.userAgent.indexOf(' OPR/') >= 0 )) browserName = "opera";
	if (typeof InstallTrigger !== 'undefined') browserName="firefox";
	if (Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0) browserName="safari";
	if ((/*@cc_on!@*/false) || (document.documentMode)) browserName="ie";
	if (!(document.documentMode) && window.StyleMedia) browserName = "edge";
	if (window.chrome && UA.includes("Chrome")) browserName="chrome";

	if (request){
		return request.toLowerCase() == browserName.toLowerCase();
	} else {
		return browserName;
	}
};