const engine = {
	page: ["/", ""].includes(location.pathname.split("?")[0].replace(/\/|index.html/g, "")) ? "home" : location.pathname.replace(/\/|index.html/g, "").split("?")[0],

	init() {
		$("#nav, #wrapper").attr("data-page", this.page);

		$("a[href]:not([href^='http']").each(function () {
			$(this).attr("onclick", "event.preventDefault(); engine.load(this.getAttribute('href'));");
		});

		$("code:not(.plaintext)").each(function() {
			hljs.highlightBlock(this[0]);
		});
	},

	load(url, cb) {
		let path = url.split("?")[0],
			query = url.split("?")[1];

		if (path.replace(/\/|index.html/g, "") == "docs" && engine.page.replace(/\/|index.html/g, "") == "docs") {
			window.history.pushState({pageTitle: path}, "", path+(query ? "?"+query : ""));
			if (Object.keys(load).includes(engine.page)) {
				load[engine.page]();
			}

			install.hide();
			packages.hide();
			search.hide();
			return false;
		}

		if ((["../", "/index.html", ""].includes(path) ? "home" : path.replace(/\//g, "")) == engine.page) {
			return false;
		}

		$("#wrapper").css({
			transform: "translateX("+(path != "../" ? "-" : "")+"300px)",
			opacity: "0"
		});

		$.ajax({
			url: ["../", "/"].includes(path) ? "/index.html" : path,
			async: true,
			success(data) {
				packages.hide();
				install.hide();

				data = data.split('<div id="wrapper">')[1].split("</div>");
				data.pop();
				data = data.join("</div>");

				engine.page = ["../", "/"].includes(path) ? "home" : path;

				if (engine.page.includes("/")) {
					engine.page = engine.page.replace(/\//g, "");
				}

				if (engine.page == "home") {
					window.history.pushState({url: data, pageTitle: "home" }, "", "/");
				} else {
					window.history.pushState({url: data, pageTitle: path }, "", path+(query ? "?"+query : ""));
				}

				setTimeout(function() {
					$("#wrapper").html(data);
					if (cb) cb();
	
					$.scrollTop();
					$("#nav").removeClass("solid");
					search.hide();

					if (Object.keys(load).includes(engine.page)) {
						load[engine.page]();
					}

					engine.init();
					config.hide();

					if (engine.page == "home") {
						$("#wrapper").css("transform", "translateX(-600px)");
					} else {
						$("#wrapper").css("transform", "translateX(600px)");
					}

					setTimeout(function() {
						$("#wrapper").removeAttr("style");
						$("code:not(.plaintext)").each(function() {
							hljs.highlightBlock(this[0]);
						});
					}, 200);
				}, 100);
			},
			error() {
				console.log("nofile");
				$("#wrapper").removeAttr("style");
			}
		});
	}
};

window.onpopstate = function(e){
	e.preventDefault();

	engine.load(e.target.location.pathname);
	
	return false;
};