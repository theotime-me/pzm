var fs = require("fs"),
	registry = require("./registry.json").packages,
	db = require("level")("stats"),
	pkgsStats = {},
	configs = [],
	app = require("express")(),
	Terser = require("terser"),
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

const Hashids = require('hashids/cjs');
const hashids = new Hashids();

app.get('/:alias/:packages/', handle);
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
		res.writeHead(200, {"content-type": "text/javascript;charset=utf8", "Access-Control-Allow-Origin": "*"});
		res.end(fs.readFileSync("./dev.js", "utf-8"));
		return false;
	} else if (req.params.alias == "stats") {
		stats(req.params.packages, res);
		return false;
	} else if (req.params.alias == "config") {
		if (Object.keys(configs).includes(hashids.decode(req.params.packages))) {
			res.writeHead(200, {"content-type": "application/json;charset=utf8", "Access-Control-Allow-Origin": "*"});
			res.end(JSON.stringify(configs[hashids.decode(req.params.packages)]));
		} else {
			res.writeHead(404, {"content-type": "application/json;charset=utf8", "Access-Control-Allow-Origin": "*"});
			res.end(JSON.stringify({error: 404, message: 'The "'+req.params.packages+'" configuration wasn\'t found. Remember that configs codes are not permanent...'}));
		}

		return false;
	}

	req.params.alias = req.params.alias ? req.params.alias.replace(/ /g, "") : undefined;

	let minify = cp,
		alias = req.params.alias ? ["$", "_", "p", "z"].includes(req.params.alias) ? req.params.alias : false : false,
		packages = req.params.packages ? req.params.packages.split("|") : [""],
		all = Object.keys(registry),
		allRegistered = true,
		configToAdd = {
			alias: alias,
			pkgs: packages
		};

		if (packages[packages.length -1] == "") {
			packages.pop();
		}

		packages = remove_duplicates(packages);

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
			let found = false,
				id = 0,
				config = "http://pzm.rf.gd/c/";

			for (let i = 0; i<configs.length; i++) {
				if (JSON.stringify(configs[i]) == JSON.stringify(configToAdd)) {
					found = i;
				}
			}

			if (found == false) {
				configs.push(configToAdd);
				id = configs.length-1;
			} else {
				id = found;
			}

			id = hashids.encode(id);

			config += id;

			minify += "  > core"+(alias ? "("+alias+")" : "")+(packages.length != 0 ? " | "+packages.join(" | ") : packages.join(" | "))+"\n\n    "+config+"\n\n  ? http://pzm.rf.gd/docs\n\n  } https://github.com/theotime-me/pzm"+(req.originalUrl.includes(" ") ? "\n\n  ! Pretty URL: "+req.originalUrl.replace(/ /g, "") : "")+"\n\n\n// PRIZM core */ \n"+compress("./prizm.js");

			packages.forEach(pkg => {
				(function() {
					let current = pkgsStats[pkg] || 0;
					pkgsStats[pkg] = current+1;
				})();
				pkg = pkg.replace(/ /g, "");
				if (registry[pkg].dependencies) {
					registry[pkg].dependencies.forEach(el => {
						if (!packages.includes(el)) {
							minify += "\n\n// "+el+" package (dep) \n"+compress("./packages/"+el+".js");
						}
					});
				}

				minify += "\n\n// "+pkg+" package | http://pkg.rf.gd/"+pkg+"\n"+compress("./packages/"+pkg+".js");
			});

			if (alias) {
				minify += "\n\n// PRIZM metadata\n"+(packages.length > 0 ? "Prizm.packages=['"+packages.join("','")+"'];" : "")+"Prizm.alias="+(alias ? "'"+alias+"'" : false)+";Prizm.config='"+config+"';window['"+alias+"'] = Prizm;";

				res.writeHead(200, {"content-type": "text/javascript;charset=utf8", "Access-Control-Allow-Origin": "*"});
				res.end(minify);
			} else {
				alias = req.params.alias;
				if (!alias) {
					return res.redirect("/$/"+packages.filter(item => item !== pkg).join("|"));
				} else {
					res.render("notfound.ejs");
				}
			}
		}
}

function compress(url) {
	let code = fs.readFileSync(url, "utf8"),
		result = Terser.minify(code);

	if (result.error) {
		throw result.error;
	} else {
		return result.code;
	}
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