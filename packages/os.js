/* PREVENT */if (typeof Prizm === "undefined") alert(`====== Prizm's core is missing ======\nYou have to install Prizm to continue\n>>>>>> https://bit.ly/prizm-js <<<<<<`);

Prizm.os = request => { // request: string
    let os,
        userAgent = navigator.userAgent || navigator.vendor || window.opera;

	if (navigator.appVersion.indexOf('Win')!=-1) os = 'windows';
	if (navigator.appVersion.indexOf('Mac')!=-1) os = 'macos';
	if (navigator.appVersion.indexOf('X11')!=-1) os = 'unix';
	if (navigator.appVersion.indexOf('Linux')!=-1) os = 'linux';

    if (/windows phone/i.test(userAgent)) os = "windows_phone";
    if (/android/i.test(userAgent)) os ="android";
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) os = "ios";

	if (request != undefined){
		return request.toLowerCase() == os.toLowerCase();
	} else {
		return os;
	}
};