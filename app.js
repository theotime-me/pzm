var http = require('http'),
	fs = require("fs"),
	url = require("url"),
	registry = require("./registry.json").packages,
	db = require("level")("stats"),
	pkgsStats = {},
	app = require("express")(),
	cp = `
/*  _____      _
   |  __ \\    (_)
   | |__) | __ _ _____ __ ___
   |  ___/ '__| |_  / '_ \` _ \\
   | |   | |  | |/ /| | | | | |
   |_|   |_|  |_/___|_| |_| |_|
__________________________________________________
--- Prizm Framework © CC BY SA ${new Date().getFullYear()} theotime.me ---
""""""""""""""""""""""""""""""""""""""""""""""""""\n\n`;

app.get('/:alias/:packages', handle);
app.get('/:alias/', handle);
app.get('/', handle);

// 404 handle
app.use(function(req, res, next) {
	res.render("notfound.ejs");
});

function remove_duplicates(arr) {
	var obj = {};
	var ret_arr = [];
	for (var i = 0; i < arr.length; i++) {
		obj[arr[i]] = true;
	}
	for (var key in obj) {
		ret_arr.push(key);
	}
	return ret_arr;
}

function handle(req, res) {
	if (req.params.alias == "dev") {
		res.redirect('https://cdn.jsdelivr.net/gh/theotime-me/pzm/dev.min.js');
	} else if (req.params.alias == "stats") {
		stats(req.params.packages, res);
		return false;
	} else if (req.params.alias == "dm$.js") {
		req.params.alias = "$";
		req.params.packages = "ajax|get";
	}

	req.params.alias = req.params.alias ? req.params.alias.replace(/ /g, "") : undefined;

	let minify = cp,
		alias = req.params.alias ? ["$", "_", "p", "z"].includes(req.params.alias) ? req.params.alias : false : false,
		packages = req.params.packages ? req.params.packages.split("|") : [""],
		all = Object.keys(registry),
		allRegistered = true;

		if (packages[packages.length -1] == "") {
			packages.pop();
		}

		packages = remove_duplicates(packages);

		minify += "  > core"+(alias ? "("+alias+")" : "")+(packages.length != 0 ? " | "+packages.join(" | ") : packages.join(" | "))+"\n\n  ? http://pzm.rf.gd/docs\n\n  } https://github.com/theotime-me/pzm"+(req.originalUrl.includes(" ") ? "\n\n  ! Pretty URL: "+req.originalUrl.replace(/ /g, "") : "")+"\n\n\n// PRIZM core */ \n"+compress("./prizm.js")+(packages.length > 0 ? "Prizm.packages=['"+packages.join("','")+"'];" : "")+"Prizm.alias="+(alias ? "'"+alias+"'" : false)+";";

		packages.forEach(pkg => {
			pkg = pkg.replace(/ /g, "");
			if (!all.includes(pkg)) {
				
				href = "/"+req.params.alias+"/"+packages.filter(item => item !== pkg).join("|");

				res.render("package.ejs", {href: href, pkg: pkg.length > 15 ? pkg.substring(0, 12)+"..." : pkg});
				allRegistered = false;
			}
		});

		// Write
		if (allRegistered) {
			packages.forEach(pkg => {
				(function() {
					let current = pkgsStats[pkg] || 0;
					pkgsStats[pkg] = current+1;
				})();
				pkg = pkg.replace(/ /g, "");
				if (registry[pkg].dependencies) {
					registry[pkg].dependencies.forEach(el => {
						if (!packages.includes(el)) {
							minify += "\n\n// "+el+" package \n"+compress("./packages/"+el+".js");
						}
					});
				}

				minify += "\n\n// "+pkg+" package | http://pkg.rf.gd/"+pkg+"\n"+compress("./packages/"+pkg+".js");
			});

			if (alias) {
				minify += "\n\n// PRIZM alias\nwindow['"+alias+"'] = Prizm;";

				res.writeHead(200, {"content-type": "text/javascript;charset=utf8", "Access-Control-Allow-Origin": "*"});
				res.end(minify);
			} else {
				alias = req.params.alias;

				if (!alias) {
					return res.redirect("/$/"+packages.filter(item => item !== pkg).join("|"));
				} else {
					res.render("notfound.ejs", {alias: alias.length > 15 ? alias.substring(0, 12)+"..." : alias});
				}
			}
		}
}

function compress(url) {
	let code = fs.readFileSync(url, "utf8"),
		lines = code.split("\n"),
		output = "";

	lines.forEach(el => {
		output += el.replace("//"+el.split("//")[1], "").replace(/	/g, " ").replace(/ +(?= )/g, "");
	});

	return output.replace(/(\/\*.*?\*\/)|(\/\*[\w\W\n\s]+?\*\/)/g, '');
}

let services = ["github", "ouoio", "sckpm", "fb", "yt", "pkg", "bitly", "isgd", "console", "thme", "tw", "ig", "dis"];

function stats(type, res) {
	type = type == undefined ? undefined : type.replace(/ |\./g, "").toLowerCase();

	if (type == undefined) {
		let a = {
			from: {},
			all: {},
			packages: pkgsStats
		},

		end = [];

		res.writeHead(200, {"content-type": "application/json;charset=utf8", "Access-Control-Allow-Origin": "*"});

		db.get("all", function(err, val) {
			if (err && err.notFound) db.put("all", 0);

			a.all = parseInt(val);

			end.push("all");

			if (end.includes("from")) {
				res.end(JSON.stringify(a));
			}
		});

		services.forEach(el => {
			db.get(el, function(err, val) {
				if (err && err.notFound) {
					if (el == services[services.length -1]) {
						res.end(JSON.stringify(a));
					}

					return false;
				}

				a.from[el] = parseInt(val);

				if (el == services[services.length -1]) {
					end.push("from");

					if (end.includes("all")) {
						res.end(JSON.stringify(a));
					}
				}
			});
		});


		return false;
	} else if (!services.includes(type)) {
		db.get("all", function(err, val) {
			if (err && err.notFound) db.put("all", 0);

			let current = (parseInt(val) || 0);

			db.put("all", current+1);
		});

		res.writeHead(403, {"content-type": "application/json;charset=utf8", "Access-Control-Allow-Origin": "*"});
		res.end("{\"error\": 403,\"message\": \"unregistred service ("+type+")\"}");
		return false;
	}
	
	db.get(type, function(err, val) {
		if (err && err.notFound) db.put(type, 0);

		let current = (parseInt(val) || 0);

		db.put(type, current+1, function() {
			res.writeHead(200, {"content-type": "application/json;charset=utf8", "Access-Control-Allow-Origin": "*"});
			res.end("{\"type\": \""+type+"\",\"value\":"+(current+1)+"}");
		});
	});

	db.get("all", function(err, val) {
		if (err && err.notFound) db.put("all", 0);

		let current = (parseInt(val) || 0);

		db.put("all", current+1);
	});
}

app.listen(process.env.PORT || 3000);