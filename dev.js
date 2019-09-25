const pzm = {
	scripts: [],
	data: {
		html: '<div id="pzm-window" class="hidden" style="display:none"> <div class="header"> <svg class="icon" viewBox="0 0 45 46"><path d="M19 5L22 1L44.6274 23L41.0919 26.5355L19 5Z"/><rect x="8" y="24" width="2" height="24" transform="rotate(-90 8 24)"/><path d="M5 17L5 15L26 15L28 17L5 17Z"/><path d="M3 10L3 8L19 8L21 10L3 10Z"/><rect y="5" width="4" height="22" transform="rotate(-90 0 5)"/><path d="M5 31L5 29L28 29L26 31L5 31Z"/><path d="M3 38L3 36L21 36L19 38L3 38Z"/><rect y="45" width="4" height="22" transform="rotate(-90 0 45)"/><path d="M22 45L19 41L41.0919 19.4645L44.6274 23L22 45Z"/></svg> <svg class="type" viewBox="0 0 84 32"><rect width="3" height="32"/><rect y="3" width="3" height="20" transform="rotate(-90 0 3)"/><rect x="23" y="3" width="3" height="12" transform="rotate(-90 23 3)"/><rect x="44" y="3" width="3" height="15" transform="rotate(-90 44 3)"/><path d="M46 13L44 11L59 6L59 9L46 13Z"/><rect x="17" width="3" height="20"/><rect x="23" width="3" height="20"/><rect x="56" width="3" height="9"/><rect x="44" y="11" width="3" height="9"/><rect x="38" width="3" height="20"/><rect x="62" width="3" height="20"/><rect x="81" width="3" height="20"/><path d="M81 8.55713e-09L81 4L76.375 8.625L74.375 6.625L81 8.55713e-09Z"/><rect x="20" y="17" width="3" height="20" transform="rotate(90 20 17)"/><rect x="65" y="17" width="3" height="15" transform="rotate(90 65 17)"/><path d="M75 10L73.1066 12.2279L64.5 3.5L65 3.51791e-07L75 10Z"/></svg> <p class="line"> <span class="core">core(<b>$</b>)</span> <span class="pkgs"><b></b> package</span> <span class="size"><b></b> KB</span> </p> <svg class="close" onclick="pzm.hide()" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg> </div> <div class="alias"> <h4>ALIAS</h4> <h1 class="current">$</h1> <h5 class="others"> <a class="on" data-alias="p">p</a> <a class="tw" data-alias="z">z</a> <a class="th" data-alias="_">_</a> </h5> </div> <a target="blank" href="https://prizm.netlify.com/?show=get-link" class="button"> GET URL <span>of your build</span> </a> <div class="pkgs"> <h4>PACKAGES</h4> <div class="list"></div> </div> </div>',
		css: `@font-face{font-family:'Montserrat';font-style:normal;font-weight:400;font-display:swap;src:local('Montserrat Regular'),local(Montserrat-Regular),url(https://fonts.gstatic.com/s/montserrat/v14/JTUSjIg1_i6t8kCHKm459Wlhyw.woff2) format("woff2");unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}@font-face{font-family:'Lexend Deca';font-style:normal;font-weight:400;font-display:swap;src:local('Lexend Deca Regular'),local(LexendDeca-Regular),url(https://fonts.gstatic.com/s/lexenddeca/v1/K2F1fZFYk-dHSE0UPPuwQ5qnJy8.woff2) format("woff2");unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}@font-face{font-family:'Roboto Mono';font-style:normal;font-weight:400;font-display:swap;src:local('Roboto Mono'),local(RobotoMono-Regular),url(https://fonts.gstatic.com/s/robotomono/v7/L0x5DF4xlVMF-BfR8bXMIjhLq38.woff2) format("woff2");unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}#pzm-button{cursor:pointer;position:fixed;bottom:20px;right:20px;width:50px;height:50px;display:flex;align-items:center;justify-content:center;border-radius:5px;box-shadow:0 5px 10px rgba(0,0,0,.5);transition:.2s ease;-webkit-transition:.2s ease;-moz-transition:.2s ease;-ms-transition:.2s ease;-o-transition:.2s ease}#pzm-button:hover{box-shadow:0 5px 15px rgba(0,0,0,.6)}#pzm-button:hover svg{fill:#005741}#pzm-window-background{position:fixed;width:100%;height:100%;left:0;top:0;display:flex;align-items:center;justify-content:center;background-color:rgba(0,0,0,.5);z-index:998;transition:.2s ease;-webkit-transition:.2s ease;-moz-transition:.2s ease;-ms-transition:.2s ease;-o-transition:.2s ease}#pzm-window-background.hidden{opacity:0}#pzm-window{font-family:"Montserrat",sans-serif;width:800px;height:500px;background-color:#fff;box-shadow:0 5px 10px rgba(0,0,0,.5);border-radius:5px;z-index:999;-webkit-border-radius:5px;-moz-border-radius:5px;-ms-border-radius:5px;-o-border-radius:5px;transition:.15s ease;-webkit-transition:.15s ease;-moz-transition:.15s ease;-ms-transition:.15s ease;-o-transition:.15s ease}#pzm-window.hidden{margin-top:-100px;opacity:.5}#pzm-window .header{padding:30px 40px;height:40px}#pzm-window .header .icon{height:30px;margin-right:20px;float:left}#pzm-window .header .type{height:40px;margin-right:40px;float:left}#pzm-window .header p{font-family:"Roboto Mono",sans-serif;transform:translateY(-13px);-webkit-transform:translateY(-13px);-moz-transform:translateY(-13px);-ms-transform:translateY(-13px);-o-transform:translateY(-13px);float:left}#pzm-window .header p span{margin-right:10px;padding-right:20px;border-right:2px solid rgba(0,0,0,.2)}#pzm-window .header p span:last-child{border:none}#pzm-window .header p b{font-family:"Lexend Deca",sans-serif;font-weight:400}#pzm-window .header .close{width:32px;padding:5px;border-radius:5px;float:right;-webkit-border-radius:5px;-moz-border-radius:5px;-ms-border-radius:5px;-o-border-radius:5px;transform:translateY(-5px);cursor:pointer;-webkit-transform:translateY(-5px);-moz-transform:translateY(-5px);-ms-transform:translateY(-5px);-o-transform:translateY(-5px)}#pzm-window .header .close:hover{background-color:rgba(0,0,0,.15)}#pzm-window .alias{padding-left:40px;padding-right:40px;height:170px;width:200px;border-right:2px solid rgba(0,0,0,.5)}#pzm-window .alias h4{font-family:"Lexend Deca",sans-serif;font-weight:400;font-size:20px;color:#222}#pzm-window .alias h1{text-align:center;background-color:#48bf91;margin-right:20px;padding:10px;border-radius:10px;-webkit-border-radius:10px;-moz-border-radius:10px;-ms-border-radius:10px;-o-border-radius:10px}#pzm-window .alias h5{font-size:20px;margin-right:20px;text-align:center}#pzm-window .alias h5 a{padding-left:24px;margin-left:20px;width:15px;border-left:2px solid rgba(0,0,0,.6);display:inline-block}#pzm-window .alias h5 a:first-child{margin:0;padding:0;border:none}#pzm-window .button{font-family:"Roboto Mono",sans-serif;text-align:center;text-decoration:none;color:#003a2b;background-color:#48bf91;width:280px;padding:20px 0;display:block;margin-top:143px;border-radius:0 0 0 5px;float:left;-webkit-border-radius:0 0 0 5px;-moz-border-radius:0 0 0 5px;-ms-border-radius:0 0 0 5px;-o-border-radius:0 0 0 5px;cursor:pointer;transition:.1s ease;-webkit-transition:.1s ease;-moz-transition:.1s ease;-ms-transition:.1s ease;-o-transition:.1s ease}#pzm-window .button:hover{color:#003a2b;background-color:#33916d}#pzm-window .button span{opacity:.7;font-size:15px}#pzm-window .pkgs:not(span){width:300px;margin-top:-200px;margin-left:20px;float:left}#pzm-window .pkgs h4{font-family:"Lexend Deca",sans-serif;font-size:20px;margin-left:20px;font-weight:400;color:#222}#pzm-window .pkgs .list{margin-top:20px;height:326px;width:290px;padding-right:10px;padding-left:20px;overflow-y:scroll;box-sizing:border-box;transition:.2s ease;-webkit-transition:.2s ease;-moz-transition:.2s ease;-ms-transition:.2s ease;-o-transition:.2s ease;scrollbar-width:thin;scrollbar-color:#a7a7a7 #fff}#pzm-window .pkgs .list::-webkit-scrollbar-thumb{background-color:#a7a7a7}#pzm-window .pkgs .list::-webkit-scrollbar{width:6px;background-color:#fff}#pzm-window .pkgs .list h1{font-family:"Lexend Deca",sans-serif;font-size:20px;font-weight:400;color:#333}#pzm-window .pkgs .list h1 a{text-decoration:none;color:#00916e;border-bottom:3px solid #00916e;transition:.2s ease;-webkit-transition:.2s ease;-moz-transition:.2s ease;-ms-transition:.2s ease;-o-transition:.2s ease}#pzm-window .pkgs .list h1 a:hover{color:#005741;border-bottom:3px solid #005741}#pzm-window .pkgs .list.more{box-shadow:inset 0 -10px 10px -8px rgba(0,0,0,.25)}#pzm-window .pkgs .list svg{height:24px}#pzm-window .pkgs .list div{width:100%;overflow:hidden;padding:10px 0;height:55px;box-sizing:border-box;border:2px solid rgba(0,0,0,.2);border-radius:10px;-webkit-border-radius:10px;-moz-border-radius:10px;-ms-border-radius:10px;-o-border-radius:10px;margin-bottom:10px;transition:.15s ease;-webkit-transition:.15s ease;-moz-transition:.15s ease;-ms-transition:.15s ease;-o-transition:.15s ease;max-height:200px;transform:translateX(0px);-webkit-transform:translateX(0px);-moz-transform:translateX(0px);-ms-transform:translateX(0px);-o-transform:translateX(0px)}#pzm-window .pkgs .list div:last-child{margin-bottom:20px}#pzm-window .pkgs .list div a{color:#000;text-decoration:none;font-weight:600;font-size:20px;margin-left:24px;float:left;transform:translateY(3px);-webkit-transform:translateY(3px);-moz-transform:translateY(3px);-ms-transform:translateY(3px);-o-transform:translateY(3px);cursor:pointer}#pzm-window .pkgs .list div .none{opacity:0;transition:.4s ease;-webkit-transition:.4s ease;-moz-transition:.4s ease;-ms-transition:.4s ease;-o-transition:.4s ease}#pzm-window .pkgs .list div a:hover{border-bottom:3px solid #00916e;color:#00916e}#pzm-window .pkgs div h4{font-family:"Lexend Deca",sans-serif;font-size:20px;text-transform:uppercase;margin-bottom:10px}#pzm-window .pkgs div > p span{font-family:"Lexend Deca",sans-serif}#pzm-window .pkgs div > p svg{display:inline-block;width:24px;margin-right:2px;margin-left:5px}#pzm-window .pkgs .list div svg{margin-right:24px;float:right;transform:translateY(4px);-webkit-transform:translateY(4px);-moz-transform:translateY(4px);-ms-transform:translateY(4px);-o-transform:translateY(4px);cursor:pointer;height:15px;margin-top:4px}#pzm-window .pkgs .list p{font-family:"Lexend Deca",sans-serif;opacity:.7;margin-left:10px;margin-top:6px;display:inline-block}`
	},

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
		let a = document.createElement("a");
			a.id = "pzm-button";
			a.onclick = pzm.show;
			a.innerHTML = '<svg style="width: 24px;" class="icon" viewBox="0 0 45 46"><path d="M19 5L22 1L44.6274 23L41.0919 26.5355L19 5Z"/><rect x="8" y="24" width="2" height="24" transform="rotate(-90 8 24)"/><path d="M5 17L5 15L26 15L28 17L5 17Z"/><path d="M3 10L3 8L19 8L21 10L3 10Z"/><rect y="5" width="4" height="22" transform="rotate(-90 0 5)"/><path d="M5 31L5 29L28 29L26 31L5 31Z"/><path d="M3 38L3 36L21 36L19 38L3 38Z"/><rect y="45" width="4" height="22" transform="rotate(-90 0 45)"/><path d="M22 45L19 41L41.0919 19.4645L44.6274 23L22 45Z"/></svg>';

		document.body.appendChild(a);

		let css = document.createElement("style");
			css.innerHTML = pzm.data.css;

		document.body.appendChild(css);

		let b = document.createElement("iframe");
			b.src = 'https://prizm.netlify.com/interface/';
			b.width = "0px";
			b.height = "0px";
			b.sandbox = 'allow-same-origin allow-scripts allow-top-navigation allow-pointer-lock';

			document.head.appendChild(b);

		let c = document.createElement("div");
			c.id = "pzm-window-background";
			c.style.display = "none";
			c.className = "hidden";
			c.innerHTML = pzm.data.html;

			document.body.appendChild(c);
	},

	showed: false,

	show() {
		let win = document.getElementById("pzm-window"),
			bg = document.getElementById("pzm-window-background");

		win.removeAttribute("style");
		bg.removeAttribute("style");

		this.showed = true;
		pzm.setCookie("pzm-visible", true, 999);

		setTimeout(function() {
			bg.classList.remove("hidden");
			win.classList.remove("hidden");
		}, 50);
	},

	hide() {
		let win = document.getElementById("pzm-window"),
			bg = document.getElementById("pzm-window-background");

		bg.classList.add("hidden");
		win.classList.add("hidden");

		this.showed = false;
		pzm.setCookie("pzm-visible", false, 999);

		setTimeout(function() {
			bg.style.display = "none";
			win.style.display = "none";
		}, 200);
	},

	displayAlias() {
		let a = pzm.alias;

		document.querySelector("#pzm-window .alias h1").innerHTML = a;

		switch(a) {
			case "_":
				document.querySelector("#pzm-window .alias h5 .on").innerHTML = "$";
				document.querySelector("#pzm-window .alias h5 .tw").innerHTML = "p";
				document.querySelector("#pzm-window .alias h5 .th").innerHTML = "z";
			break;

			case "p":
				document.querySelector("#pzm-window .alias h5 .on").innerHTML = "$";
				document.querySelector("#pzm-window .alias h5 .tw").innerHTML = "_";
				document.querySelector("#pzm-window .alias h5 .th").innerHTML = "z";
			break;

			case "z":
				document.querySelector("#pzm-window .alias h5 .on").innerHTML = "$";
				document.querySelector("#pzm-window .alias h5 .tw").innerHTML = "_";
				document.querySelector("#pzm-window .alias h5 .th").innerHTML = "p";
			break;
		}
	},

	display() {
		let list = document.querySelector("#pzm-window .list");
			list.innerHTML = "";

		((pzm.pkgs || "").split("|")[0] == "" ? [] : this.pkgs.split("|")).forEach(el => {
			let size = pzm.registry[el].size,
				unit = "KB";

			if (size < 1) {
				unit = "Bytes";
				size *= 1000;
			}

			list.innerHTML += '<div class="'+el+'"><a href="https://prizm.netlify.com/?pkg='+el+'" target="blank">'+el+'</a><p>'+size+' '+unit+'</p><svg class="packages" viewBox="0 0 83 39"><path d="M6.00001 11.364L6.00001 3.86397L23.2721 20.864L19.0294 25.1066L6.00001 11.364Z"></path><path d="M6 37.864L6 29.864L19.0294 16.6213L23.2721 20.864L6 37.864Z"></path><path d="M24 3.86397L31.7574 3.8934L48.7279 20.864L42 21.864L24 3.86397Z"></path><path d="M30 9.86397L24 3.86397L66 3.86397L66 9.86397L30 9.86397Z"></path><path d="M29 31.864L23 37.864L66 37.864L66 31.864L29 31.864Z"></path><rect x="31.7574" y="37.8345" width="6" height="24" transform="rotate(-135 31.7574 37.8345)"></rect><path d="M31.7574 37.8345L27 33.864L44.4853 16.6213L48.7279 20.864L31.7574 37.8345Z"></path><path d="M62 8.10661L66 3.86397L83 20.864L79 24.864L62 8.10661"></path><path d="M66 37.864L61.4558 33.5919L78.4264 16.6213L83 20.864L66 37.864Z"></path><rect y="3.86397" width="6" height="34"></rect></svg></div>';
		});

		let pkgs = (pzm.pkgs || "").split("|")[0] == "" ? [] : this.pkgs.split("|"),
			deps = [],
			size = 0;

		pkgs.forEach(el => {
			if (pzm.registry[el].dependencies) {
				pzm.registry[el].dependencies.forEach(dep => {
					if (!deps.includes(dep)) {
						deps.push(dep);
					}
				});
			}
		});

		deps.forEach(el => {
			if (!pkgs.includes(el)) {
				pkgs.push(el);
			}
		});

		pkgs.forEach(pkg => {
			size += pzm.registry[pkg].size;
		});

		size += 13.3;

		size = Math.floor(size*10) / 10;

		document.querySelector("#pzm-window .header .pkgs").innerHTML = '<b>14</b> package'+(pzm.pkgs ? pzm.pkgs.split("|").length > 1 ? "s" : "": "");

		document.querySelector("#pzm-window .header .size b").innerHTML = size;
		document.querySelector("#pzm-window .header .core b").innerHTML = pzm.alias;
		pzm.displayAlias();
		document.querySelector("#pzm-window .header .pkgs b").innerHTML = pkgs.length;

		if (pkgs.length == 0) {
			document.querySelector("#pzm-window .pkgs .list").innerHTML = "<h1>No package yet,<br>you could try to <a target='blank' href='https://prizm.netlify.com/search/'>install one</a>.</h1>";
		} else if (pkgs.length > 4) {
			document.querySelector("#pzm-window .pkgs .list").classList.add("more");
		}

		if (pzm.getCookie("pzm-visible") == "true") {
			pzm.show();
		}
	}
};

pzm.init();

document.querySelector("#pzm-window-background").onclick = function() {
	if (!document.querySelector("#pzm-window:hover")) {
		pzm.hide();
	}
};

window.onkeydown = function(e) {
	if (e.shiftKey && e.keyCode == 80) {
		pzm.showed ? pzm.hide() : pzm.show();
	}
};

window.onerror = function(msg, url, line, col, error) {
	let variable = msg;

	if (variable.includes(":")) {
		variable = variable.split(":")[1];
		
		if (variable.includes(" ")) {
			variable = variable.split(" ")[1];

			if (variable.includes(".")) {
				if (variable.split(".")[0] == pzm.alias) {
					variable = variable.split(".")[1];
				}
			}
		}
	}

	if (Object.keys(pzm.registry).includes(variable)) {
		console.log("The \""+variable+"\" package isn't installed. http://cpkg.rf.gd/"+variable);
	}
};

window.onmessage = function(ev) {
	if (ev.data.reload) {
		location.href = location.href;
	}

	pzm.pkgs = ev.data.pkgs;
	pzm.alias = ev.data.alias;
	pzm.loadPrizm(ev.data.pkgs, ev.data.alias);

	fetch("https://cdn.jsdelivr.net/gh/theotime-me/pzm/registry.json")
	.then(function (response) {
		return response.json();
	  })
	.then(function (response) {
		pzm.registry = response.packages;
		pzm.display();
	})
	.catch(function (err) {
		console.error(err);
	});
};