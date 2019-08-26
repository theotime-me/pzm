var http = require('http'),
	fs = require("fs"),
	url = require("url"),
	cp = `
/*  _____      _
   |  __ \\    (_)
   | |__) | __ _ _____ __ ___
   |  ___/ '__| |_  / '_ \` _ \\
   | |   | |  | |/ /| | | | | |
   |_|   |_|  |_/___|_| |_| |_|
______________________________________________
--- Prizm Framework © MIT ${new Date().getFullYear()} theotime.me ---
""""""""""""""""""""""""""""""""""""""""""""""\n\n`;

var server = http.createServer(function(req, res) {
    var page = url.parse(req.url).pathname;
	let minify = cp,
		settings = page.replace("/", "").split("/"),
		packages = settings.length > 1 ? settings[1].split("|") : [""],
		alias;

		if (typeof settings[0] === "string" && ["_", "$", "p"].includes(settings[0])) {
			alias = settings[0];
		}

		if (packages[packages.length -1] == "") {
			packages.pop();
		}

	minify += "  > core"+(alias ? "("+alias+")" : "")+(packages.length != 0 ? " | "+packages.join(" | ") : packages.join(" | "))+"\n\n";
	minify += "  ? https://prizm.netlify.com/?pkg=<package>\n\n";
	minify += "  } https://github.com/theotime-me/pzm\n\n\n";
	minify += "// PRIZM core */ \n"+compress("./prizm.js");

		let	all = fs.readdirSync("./packages"),
			allRegistered = true;

		packages.forEach(pkg => {
			if (!all.includes(pkg+".js")) {
				res.writeHead(404);
res.end(`
<body style="display: flex; justify-content: center; align-items: center; height: 80%; font-family: 'Roboto', sans-serif;">
	<div style="background-color: #3fdb90; height: 160px; width: 350px; display: flex; align-items: center; justify-content: center;">
		The package <b style="margin-left: 5px; margin-right: 5px; padding: 5px 10px; background-color: #5da493;"> ${pkg} </b> isn't registered.
	</div>
</body>
`);
				allRegistered = false;
			}
		});

		// Write
		if (allRegistered) {
			packages.forEach(pkg => {
				minify += "// "+pkg+" package \n";

				minify += compress("./packages/"+pkg+".js");
			});
		}

		if (alias) {
			minify += "// PRIZM alias\nwindow['"+alias+"'] = Prizm;";
		}

		res.writeHead(200, {"content-type":  "text/javascript;charset=utf8"});
		res.end(minify);
});

function compress(url) {
	let code = fs.readFileSync(url, "utf8"),
		lines = code.split("\n"),
		output = "";

	lines.forEach(el => {
		output += el.replace("//"+el.split("//")[1], "").replace(/	/g, " ").replace(/ +(?= )/g, "");
	});

	return output.replace(/(\/\*.*?\*\/)|(\/\*[\w\W\n\s]+?\*\/)/g, '')+"\n\n";
}

server.listen(process.env.PORT || 3000);