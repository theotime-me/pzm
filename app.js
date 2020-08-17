var fs = require("fs"),
	registry = require("./registry.json").packages,
	db = require("level")("stats"),
	pkgsStats = {},
	configs = [],
	path = require("path"),
	chalk = require("chalk"),
	ProgressBar = require("progress"),
	app = require("express")(),
	serve = require("serve-static"),
	Terser = require("terser"),
	cp = `
/*  _____      _
   |  __ \\    (_)
   | |__) | __ _ _____ __ ___
   |  ___/ '__| |_  / '_ \` _ \\
   | |   | |  | |/ /| | | | | |
   |_|   |_|  |_/___|_| |_| |_|
___________________________________________________
--- Prizm Framework © CC-BY-SA-ND ${new Date().getFullYear()} theotime.me ---
"""""""""""""""""""""""""""""""""""""""""""""""""""\n\n`;

const Hashids = require('hashids/cjs');
const hashids = new Hashids();

var PRIZM_ENGINE = {
	cache: {},

	remove_duplicates(arr) {
		var obj = {};
		var ret_arr = [];
		for (var i = 0; i < arr.length; i++) {
			obj[arr[i]] = true;
		}
		for (var key in obj) {
			ret_arr.push(key);
		}
		return ret_arr;
	},



	preload() {
		this.preload_bar = new ProgressBar(chalk.bgWhite.black("COMPRESSING")+' :name | [:bar] :percent :etas remaining...', {
			complete: '█',
			incomplete: ' ',
			width: 25,
			total: Object.keys(registry).length+1
		});

		this.compress("./prizm.js");

		Object.keys(registry).forEach(pkg => {
			this.compress("./packages/"+pkg+".js");
		});
	},

	compress(url) {
		if (Object.keys(this.cache).includes(url)) {
			return this.cache[url];
		}
		
		if (!fs.existsSync(url)) {
			this.preload_bar.tick(1, {
				name: url.replace(/\/|\.js|packages|\./g, "").replace("prizm", "CORE")+" NOT FOUND"
			});

			return false;
		}
	
		let code = fs.readFileSync(url, "utf8"),
			lines = code.split("\n");
	
		if (lines[0].startsWith("/* PREVENT */")) {
			lines.shift();
		}
	
			code = lines.join("\n");
		let	result = Terser.minify(code);
	
		if (result.error) {
			throw result.error;
		} else {
			this.preload_bar.tick(1, {
				name: url.replace(/\/|\.js|packages|\./g, "").replace("prizm", "CORE")
			});

			this.cache[url] = result.code;
			return result.code;
		}
	},

	handle(req, res) {
		if (req.params.alias == "dev") {
			res.writeHead(200, {"content-type": "text/javascript;charset=utf8", "Access-Control-Allow-Origin": "*"});
			res.end(fs.readFileSync("./dev.js", "utf-8"));
			return false;
		} else if (req.params.alias == "stats") {
			stats(req.params.packages, res);
			return false;
		} else if (req.params.alias == "config") {
			if (configs[hashids.decode(req.params.packages)] != undefined) {
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
	
			packages = PRIZM_ENGINE.remove_duplicates(packages);
	
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

				minify += "  > core"+(alias ? "("+alias+")" : "")+(packages.length != 0 ? " | "+packages.join(" | ") : packages.join(" | "))+"\n\n    "+config+"\n\n  ? http://pzm.rf.gd/docs\n\n  } https://github.com/theotime-me/pzm"+(req.originalUrl.includes(" ") ? "\n\n  ! Pretty URL: "+req.originalUrl.replace(/ /g, "") : "")+"\n\n\n// PRIZM core */ \n"+PRIZM_ENGINE.compress("./prizm.js");
	
				packages.forEach(pkg => {
					(function() {
						let current = pkgsStats[pkg] || 0;
						pkgsStats[pkg] = current+1;
					})();
					pkg = pkg.replace(/ /g, "");
					if (registry[pkg].dependencies) {
						registry[pkg].dependencies.forEach(el => {
							if (!packages.includes(el)) {
								minify += "\n\n// "+el+" package (dep) \n"+this.compress("./packages/"+el+".js");
							}
						});
					}
	
					minify += "\n\n// "+pkg+" package | http://pkg.rf.gd/"+pkg+"\n"+this.compress("./packages/"+pkg+".js");
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
};

PRIZM_ENGINE.preload();

app.get('/code/:alias/:packages/', PRIZM_ENGINE.handle);
app.get('/code/:alias/', PRIZM_ENGINE.handle);
app.get('/code/', PRIZM_ENGINE.handle);
app.get('/docs/:type/:fn/', (req, res, next) => {
	res.render("docs.ejs", {type: req.params.type, fn: req.params.fn});
}).get('/docs/:type/', (req, res, next) => {
	res.render("docs.ejs", {type: req.params.type, fn: "start"});
}).get('/docs/', (req, res, next) => {
	res.render("docs.ejs", {type: false, fn: false});
});

app.use(serve(path.join(__dirname, 'public')));

// 404 handle
app.use(function(req, res, next) {
	res.render("notfound.ejs");
});

app.listen(process.env.PORT || 80);