var fs = require("fs"),
	registry = require("./registry.json").packages,
	configs = [],
	path = require("path"),
	chalk = require("chalk"),
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
"""""""""""""""""""""""""""""""""""""""""""""""""""`;

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

	log(msg, type) {
		let before = chalk(" ");

		switch (type) {
			case "error":
				console.log(chalk.bgRed.white(before)+" "+msg);
			break;

			case "warn":
				console.log(chalk.bgYellow(before)+" "+msg);
			break;

			case "info":
				console.log(chalk.bgBlueBright(before)+" "+msg);
			break;

			case "wait":
				console.log(chalk.bgGreen(before)+" "+msg);
			break;

			case "request":
				console.log(chalk.bgMagenta(before)+" "+msg);
			break;

			default:
				console.log(chalk.bgWhite(before)+" "+msg);
		}
	},

	preload() {
		this.compress("./prizm.js");
		this.log("Prizm CORE "+chalk.blueBright("cached"), "info");

		Object.keys(registry).forEach(pkg => {
			this.compress("./packages/"+pkg+".js");
		});

		this.log((Object.keys(this.cache).length -1)+" packages "+chalk.blueBright("cached"), "info");
		this.log(chalk.green("Ready")+" to process...", "wait");
	},

	compress(url) {
		if (Object.keys(this.cache).includes(url)) {
			return this.cache[url];
		}
		
		if (!fs.existsSync(url)) {
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
			this.cache[url] = result.code;
			return result.code;
		}
	},

	sortPackages(list) {
		if (list.length <= 0) {
			return list;
		}

		let out = [list[0]];

		list.forEach(pkg => {
			out.forEach((el, index) => {
				let deps = registry[el].dependencies || [];

				if (deps.includes(pkg) || index == out.length -1) {
					out.splice(index, 0, pkg);
				}
			});;
		});

		out = this.remove_duplicates(out);

		return out;
	},

	handle(req, res) {
		let start_time = new Date().getTime();

		if (req.params.alias == "dev") {
			res.writeHead(200, {"content-type": "text/javascript;charset=utf8", "Access-Control-Allow-Origin": "*"});
			res.end(fs.readFileSync("./dev.js", "utf-8"));
			return false;
		} else if (req.params.alias == "stats") {
			stats(req.params.packages, res);
			return false;
		}

		req.params.alias = req.params.alias ? req.params.alias.replace(/ /g, "") : undefined;

		let minify = "// PRIZM core */ \n"+PRIZM_ENGINE.compress("./prizm.js"),
			ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress,
			alias = req.params.alias ? ["$", "_", "p", "z"].includes(req.params.alias) ? req.params.alias : false : false,
			packages = req.params.packages ? req.params.packages.split("|") : [""],
			all = Object.keys(registry),
			allRegistered = true,
			configToAdd = {
				alias: alias,
				pkgs: packages
			},

			list = [];
	
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
				let found = false;

				packages.forEach(pkg => {
					pkg = pkg.replace(/ /g, "");
					if (registry[pkg].dependencies) {
						registry[pkg].dependencies.forEach(el => {
							if (!packages.includes(el)) {
								list.push(el);
							}
						});
					}
	
					list.push(pkg);
				});

				// Check if dependencies have all their dependencies... DEPENDEN-CEPTION !

				let added_dependency = true;

				while (added_dependency) {
					added_dependency = false;

					list.forEach((pkg, index) => { // check dependencies for each packages
						let deps = registry[pkg].dependencies || [];
	
						deps.forEach(dep => { // check if all dependencies have been correctly added
							if (!list.includes(dep)) { // if not, it'll been added.
								list.splice(index, 0, dep); // add the forgotten dependency to the array

								// Something happens ! let's loop again through the "list" array to check if the newly added package needs another to work !
								added_dependency = true;
							}
						});
					});
				}

				// Sort the different packages to make sure no one is using a package that is below it, and so prevent stupid errors like: SMTH is not defined... ^^
				list = PRIZM_ENGINE.sortPackages(list);

				// then we add each packages to the final minify string.
				list.forEach(pkg => {
					let	depFor = list.filter(el => registry[el].dependencies && registry[el].dependencies.includes(pkg)),
						dep = [!packages.includes(pkg) ? " (required by "+(depFor.length == 1 ? depFor : depFor.length)+" package"+(depFor.length > 1 ? "s" : "")+")" : ""],
						code = PRIZM_ENGINE.compress('./packages/'+pkg+".js");

					minify += '\n\n// '+pkg+' package'+dep+'\n'+code;
				});
	
				if (alias) {
					minify += "\n\n// PRIZM metadata\n"+(packages.length > 0 ? "Prizm.packages=['"+packages.join("','")+"'];" : "")+"Prizm.alias="+(alias ? "'"+alias+"'" : false)+";window['"+alias+"'] = Prizm;";
	
					// calculate execution time in milliseconds
					let time = new Date().getTime() - start_time;

					// Don't forget to add the copyright/metadata to the top of the code !
					minify = cp+"\n\n  > core"+(alias ? "("+alias+")" : "")+(packages.length != 0 ? " | "+packages.join(" | ") : packages.join(" | "))
						   +"\n\n  ? https://prizm.herokuapp.com/docs"
						   +"\n\n  } https://github.com/theotime-me/pzm"+(req.originalUrl.includes(" ") ? "\n\n  ! Pretty URL: "+req.originalUrl.replace(/ /g, "") : "")
						   +"\n\n  ! "+(Buffer.byteLength(minify, 'utf8') / 1000)+"kB / minify / sent on "+new Date().toISOString()+" in "+time+"ms\n\n\n"+minify;	

					// HTTP(s) headers
					res.writeHead(200, {"content-type": "text/javascript;charset=utf8", "Access-Control-Allow-Origin": "*"});
					res.end(minify); // And we send to the client !

					PRIZM_ENGINE.log(chalk.magenta("Sending")+" Prizm to "+chalk.underline(ip)+" with "+packages.length+" package"+(packages.length > 1 ? "s" : "")+" and "+(list.length - packages.length)+" dependencie"+(list.length - packages.length > 1 ? "s" : "")+". "+chalk.dim("Done in ")+time+"ms"+chalk.dim("."), "request");
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

let port = process.env.PORT || 80;

app.listen(port, () => {
	PRIZM_ENGINE.log(chalk.green("Listening ")+":"+port+chalk.dim(" for HTTP request..."), "wait");
});