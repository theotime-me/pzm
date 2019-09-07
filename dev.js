const pzm = {
	scripts: [],

	loadPrizm(pkgs, alias) {
		if (typeof Prizm !== "undefined") {
			return false;
		}

		let xhr = new XMLHttpRequest();

			xhr.onload = function() {
				if (xhr.readyState === 4) {
					if (xhr.status === 200) {
						eval(xhr.response);
						window.Prizm = window[alias];

						pzm.loadScripts();
					}
				}
			};

			xhr.open("GET", "https://pzm.herokuapp.com/"+alias+"/"+pkgs, true);
			xhr.send();
	},

	loadScripts() {
		this.scripts.forEach(script => {
			let a = document.createElement("script");
				a.src = script;
	
			document.body.appendChild(a);
		});
	},

	setCookie(cname, cvalue, exdays) {
		var d = new Date();
		d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
		var expires = "expires="+d.toUTCString();
		document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
	},

	getCookie(cname) {
		var name = cname + "=";
		var ca = document.cookie.split(';');
		for(var i = 0; i < ca.length; i++) {
		  var c = ca[i];
		  while (c.charAt(0) == ' ') {
			c = c.substring(1);
		  }
		  if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		  }
		}
		return "";
	},

	init() {
		let a = document.createElement("iframe");
			a.src = "https://prizm.netlify.com/console/";
			a.width = "300px";
			a.height = "187.5px";
			a.className = "bottom right";
			a.id = "pzm-console";
			a.sandbox = "allow-same-origin allow-scripts allow-top-navigation allow-pointer-lock";

		document.body.appendChild(a);

		let styles = document.createElement("style");
			styles.innerHTML = `#pzm-console {background-color: #333; transition: .2s ease;-moz-transition: .2s ease;position: fixed;box-shadow: 0px 5px 10px rgba(0, 0, 0, .4);border: none;outline-style:none;overflow: visible;}#pzm-console.left { left: 20px; }#pzm-console.right { right: 20px; }#pzm-console.top { top: 20px; }#pzm-console.bottom { bottom: 20px; }`;

			document.body.appendChild(styles);
	},	

	sync(pkgs, alias) {
		this.setCookie("pkgs", (pkgs || ""), 999);
		this.setCookie("alias", (alias || "$"), 999);
	},

	move(dir) {
		if (!["left", "top", "right", "bottom"].includes(dir)) {
			return false;
		}

		let opposite;

		switch (dir) {
			case "left": opposite = "right"; break;
			case "top": opposite = "bottom"; break;
			case "bottom": opposite = "top"; break;
			case "right": opposite = "left"; break;
		}

		document.getElementById("pzm-console").classList.remove(opposite);
		document.getElementById("pzm-console").classList.add(dir);
	}
};

window.onmessage = function(ev) {
	switch (ev.data.type) {
		case "setCookie":
			pzm.sync(ev.data.pkgs, ev.data.alias);
		break;

		case "move":
			pzm.move(ev.data.dir);
		break;

		case "start":
			pzm.loadPrizm(ev.data.pkgs, ev.data.alias);
		break;		
	}
};

pzm.init();