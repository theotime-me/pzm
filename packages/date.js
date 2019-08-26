Prizm.date = (request, addZero) => { // request: string, addZero: boolean
	let t = new Date();

	switch (request) {
		case "year": return t.getFullYear();
		case "date": return t.getDate();
		case "month": return addZero ? t.getMonth() +1 < 10 ? "0"+(t.getMonth() +1) : t.getMonth() +1 : t.getMonth() +1;
		case "utc": return t.toUTCString();
		case "iso": return t.toISOString();
		case "hours": return  addZero ? t.getHours() < 10 ? "0"+t.getHours() : t.getHours() : t.getHours();
		case "minutes": return  addZero ? t.getMinutes() < 10 ? "0"+t.getMinutes() : t.getMinutes() : t.getMinutes();
		case "seconds": return  addZero ? t.getSeconds() < 10 ? "0"+t.getSeconds() : t.getSeconds() : t.getSeconds();
		case "day": return  addZero ? t.getDay() < 10 ? "0"+t.getDay() : t.getDay() : t.getDay();
		case "milliseconds": return t.getMilliseconds();
		case "time": return t.getTime();
		default: return t.getTime();
	}
};