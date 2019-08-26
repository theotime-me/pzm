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
--- Prizm Framework © MIT 2019 theotime.me ---
""""""""""""""""""""""""""""""""""""""""""""""

   v2.0 - Product

""""""""""""""""""""""""""""""""""""""""""""""*/\n\n`;

var server = http.createServer(function(req, res) {
    var page = url.parse(req.url).pathname;

	if (page === "/") {
		res.writeHead(200);
		res.end(fs.readFileSync("./prizm.js", "utf8"));
	} else {
		let packages = page.replace("/", "").split("|"),
			all = fs.readdirSync("./packages"),
			allRegistered = true,
			response = "";

		if (packages[packages.length -1] == "") {
			packages.pop();
		}

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
			let minify = cp;
			minify += "// PRIZM core \n"+compress("./prizm.js");

			packages.forEach(pkg => {
				minify += "// "+pkg+" package \n";

				minify += compress("./packages/"+pkg+".js");
			});

			res.writeHead(200, {"content-type":  "text/javascript;charset=utf8"});
			res.end(minify);
		}
	}
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

server.listen(80);