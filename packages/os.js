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