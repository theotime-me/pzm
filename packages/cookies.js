Prizm.setCookie = (name, value, days) => { // name: string, value: string, days: number
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
};

Prizm.getCookie = cname => { // cname: string
    let name = cname + "=",
		decodedCookie = decodeURIComponent(document.cookie),
		ca = decodedCookie.split(';');

	for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}

		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}

	return "";
};