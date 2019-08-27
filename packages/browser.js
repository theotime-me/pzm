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