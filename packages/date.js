if (typeof Prizm === "undefined") alert(`====== Prizm's core is missing ======\nYou have to install Prizm to continue\n>>>>>> https://bit.ly/prizm-js <<<<<<`);

Prizm.date_deps = {
	dateOfNearestDay(startingDate, day) {
		let prevDay = new Date(startingDate),
			nextDay = new Date(startingDate);

			for (let j = 0; j<=6; j++) {
				prevDay.setDate(prevDay.getDate() - 1);

				if (prevDay.getDay() == day) break;
			}

			for (let i = 0; i<=6; i++) {
				nextDay.setDate(nextDay.getDate() + 1);

				if (nextDay.getDay() == day) break;
			}

		let prevDayDiff = startingDate.getTime() - prevDay.getTime(),
			nextDayDiff = nextDay.getTime() - startingDate.getTime();

		if (nextDayDiff < prevDayDiff) return Prizm.date(nextDay);
		else return Prizm.date(prevDay);
	},

	month_to_string(number) {
		if (typeof number !== "number" || number > 11) return false;

		switch (number) {
			case 0: return "january"; // No need of "break" because "return" already do its job
			case 1: return "february";
			case 2: return "march";
			case 3: return "april";
			case 4: return "may";
			case 5: return "june";
			case 6: return "july";
			case 7: return "august";
			case 8: return "september";
			case 9: return "october";
			case 10: return "november";
			case 11: return "december";
		}
	},

	day_to_string(number) {
		if (typeof number !== "number" || number > 11) return false;

		switch (number) {
			case 1: return "monday"; // No need of "break" because "return" already do its job
			case 2: return "tuesday";
			case 3: return "wednesday";
			case 4: return "thurday";
			case 5: return "friday";
			case 6: return "saturday";
			case 0: return "sunday";
		}
	}
};

Prizm.date = function(date) { // request: string, addZero: boolean
	date = typeof date === "undefined" ? new Date() : date;

	let out = {},
		now = new Date(),
		d = new Date();

	if (new Date(date) != "Invalid Date") return Prizm.date(new Date(date));

	// Clean the string if it's one
	if (typeof date === "string") {
		date = date.toLowerCase(); // put the str. in lowercase
		date = date.replace(/[^A-z0-9-]|_/g, ""); // remove useless characters
	}

	if (["now", "today", "next-week", "last-week"].includes(date)) {
		switch (date) {
			case "now": case "today": return Prizm.date(now);
			case "yesterday": return Prizm.date(now).yesterday(); // Beatles ! https://www.youtube.com/watch?v=NrgmdOz227I
			case "tomorrow": return Prizm.date(now).tomorrow();
		}
	}
	

	// If date is a string of a day of the week (ex: monday OR mon)
	if (["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"].includes(date) || ["mon", "tue", "wed", "thu", "fri", "sat", "sun"].includes(date)) {
		switch (date) {
			case "mon": case "monday": date = 1; break;
			case "tue": case "tuesday": date = 2; break;
			case "wed": case "wednesday": date = 3; break;
			case "fri": case "thursday": date = 4; break;
			case "mon": case "friday": date = 5; break;
			case "sat": case "saturday": date = 6; break;
			case "sun": case "sunday": date = 0; break;
		}

		return Prizm.date_deps.dateOfNearestDay(now, date);
	}

	if (typeof date === "string") {
		Object.keys(Prizm.date(now)).forEach(key => {
			if (key == date) {
	
				let args = Array.prototype.slice.call(arguments);
	
				args.shift();
				
				out = Prizm.date(now)[date].apply(this, args);
			}
		});
	}
	
	// If date is an instance of the default JS Date constructor
	if (date instanceof Date) {
		d = date;

		out.Date = d;
		out.month = () => Prizm.date_deps.month_to_string(d.getMonth());
		out.MONTH = () => d.getMonth();
		out.day = () => Prizm.date_deps.day_to_string(d.getDay());
		out.DAY = () => d.getDay();
		out.date = () => d.getDate();

		out.hour = out.hours = out.hr = out.hrs = () => d.getHours();
		out.minutes = out.min = out.mn = out.minute = () => d.getMinutes();
		out.seconds = out.s = out.sec = out.secs = () => d.getSeconds();
		out.milliseconds = out.ms = out.miliseconds = () => d.getMilliseconds();

		out.clock = (seconds) => out.hours()+":"+out.minutes() + (seconds ? ":"+out.seconds() : "");

		out.time = () => d.getTime();

		out.iso = () => Prizm.date(new Date(d.toISOString()));
		out.ISO = () => Prizm.date(new Date(d.toISOString()));
		out.utc = () => Prizm.date(new Date(d.toUTCString()));
		out.UTC = () => Prizm.date(new Date(d.toUTCString()));
		out.gmt = () => Prizm.date(new Date(d.toUTCString()));
		out.GMT = () => Prizm.date(new Date(d.toUTCString()));

		out.monday = () => Prizm.date("monday");
		out.tuesday = () => Prizm.date("tuesday");
		out.wednesday = () => Prizm.date("wednesday");
		out.thursday = () => Prizm.date("thursday");
		out.friday = () => Prizm.date("friday");
		out.saturday = () => Prizm.date("saturday");
		out.sunday = () => Prizm.date("sunday");

		out.yesterday = () => { // YESTERDAY! (The Beatles)
			d.setDate(d.getDate() -1);

			return Prizm.date(d);
		};

		out.tomorrow = () => {
			d.setDate(d.getDate() +1);

			return Prizm.date(d);
		};

		out.year = () => d.getFullYear();


	}


	return out;
};
