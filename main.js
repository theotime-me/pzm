var registry,
	remarkable = new Remarkable();

var loading = {
	data: {
		prizm: 13.3,
		jquery: 88,
		mootools: 127,
		dojo: 167
	},

	sum: 0,
	average: 0,
	times: 0,
	max: 0,

	init() {
		let t = this;
		Object.keys(loading.data).forEach(key => {
			if (key != "prizm") {
				t.sum += t.data[key];
			}
		});
		
		this.average = this.sum/(Object.values(this.data).length-1);
		this.times = this.average / packages.size();
		this.times = Math.floor(loading.times * 10)/10+"";

		if (engine.page == "home") {
			let each = 1;
			Object.keys(loading.data).forEach(el => {
				let i = 1,
					x = setInterval(function() {
						if (i >= Math.floor(el == "prizm" ? packages.size() : loading.data[el])) {
							clearInterval(x);
						}

						let nb = parseInt($("#hero .graphics .table ."+el+" p").html().replace("KB", ""))+each;
						$("#hero .graphics .table ."+el+" div").css("width", nb / (Math.max.apply(this, Object.values(loading.data))) * 60+"%");
			
						$("#hero .graphics .table ."+el+" p").html(nb+"KB");
						i += each;
					}, 5);
			});

			if (loading.times.includes(".")) {
				$("#hero .waou span").html(loading.times.split(".")[0]+"<span>."+loading.times.split(".")[1]+"</span>");
			} else {
				$("#hero .waou span").html(loading.times);
			}

		}
	}
};

let docsIcons = {
	core: '<svg class="core" viewBox="0 0 78 90" fill="none" ><path d="M5.02886 25.3868L39 5.7735L72.9711 25.3868V64.6133L39 84.2265L5.02886 64.6133V25.3868Z" stroke="black" stroke-width="10"/><line x1="2.97101" y1="66.285" x2="72.971" y2="24.285" stroke="black" stroke-width="4"/><line x1="39" y1="9" x2="39" y2="84" stroke="black" stroke-width="4"/><line x1="2.21411" y1="23.8146" x2="74.2141" y2="63.8146" stroke="black" stroke-width="5"/><path d="M74.4697 24.0354L74.4697 65.5354L39.4697 46.0354L74.4697 24.0354Z" fill="black" stroke="black"/><path d="M74.4401 63.3109L38.5 84.0609L37.8875 44L74.4401 63.3109Z" fill="black" stroke="black"/></svg>',
	packages: '<svg class="packages" viewBox="0 0 83 39"><path class="external" d="M6.00001 11.364L6.00001 3.86397L23.2721 20.864L19.0294 25.1066L6.00001 11.364Z"/><path d="M6 37.864L6 29.864L19.0294 16.6213L23.2721 20.864L6 37.864Z"/><path d="M24 3.86397L31.7574 3.8934L48.7279 20.864L42 21.864L24 3.86397Z"/><path d="M30 9.86397L24 3.86397L66 3.86397L66 9.86397L30 9.86397Z"/><path d="M29 31.864L23 37.864L66 37.864L66 31.864L29 31.864Z"/><rect x="31.7574" y="37.8345" width="6" height="24" transform="rotate(-135 31.7574 37.8345)"/><path d="M31.7574 37.8345L27 33.864L44.4853 16.6213L48.7279 20.864L31.7574 37.8345Z"/><path d="M62 8.10661L66 3.86397L83 20.864L79 24.864L62 8.10661"/><path d="M66 37.864L61.4558 33.5919L78.4264 16.6213L83 20.864L66 37.864Z"/><rect y="3.86397" width="6" height="34"/></svg>',

	install: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z',
	remove: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11H7v-2h10v2z"
};

let attempted

const load = {
	home() {
		loading.init();
		packages.displayUrl();
		packages.size();
	},

	docs() {
		packages.size();

		let pkg = $.get("pkg"),
			core = $.get("core");

		if ([pkg, core].includes("start") || (pkg && Object.keys(registry).includes(pkg)) || (core && Object.keys(coreRegistry).includes(core))) {
			let disPkg = pkg ? true : false,
				data = disPkg ? registry[pkg] : coreRegistry[core],
				isStart = [pkg, core].includes("start");

			console.log(data);

			if (disPkg) {
				$("#readme .header .button").css("display", "block").attr("onclick", "install.show('"+pkg+"')");

				if (packages.get().includes(pkg)) {
					$("#readme .header .button").addClass("remove").html("REMOVE");
				} else {
					$("#readme .header .button").removeClass("remove").html("INSTALL");
				}

				$("#panel .start a").attr("onclick", "engine.load('/docs/?pkg=start')");
				$("#panel .header").html(docsIcons.packages+"<p>PACKAGES</p>");
			} else {
				$("#readme .header .button").css("display", "none");

				$("#panel .start a").attr("onclick", "engine.load('/docs/?core=start')");
				$("#panel .header").html(docsIcons.core+"<p>PRIZM's CORE</p>");
			}

			$("#panel .content").html("");
			Object.keys(disPkg ? registry : coreRegistry).sort().forEach(el => {
				$("#panel .content").append('<a class="'+el+'" href="/docs/?'+(disPkg ? "pkg" : "core")+'='+el+'">'+el+'</a>');
			});

			engine.init();

			$("#panel a").removeClass("selected");
			if (!isStart) {
				$("#panel .content ."+(pkg || core)).addClass("selected");
				$("#readme .header > code").show();
			} else {
				$("#panel .start a").addClass("selected");
				$("#readme .header > code").hide();
			}

			$("#readme .header h4").html(!isStart ? pkg || core : "Get started");
			$("#readme .header .desc").html(!isStart ? data.desc : "Welcome to the main page of the Prizm's "+(disPkg ? "packages" : "core")+" Documentation !");
			$("#readme").removeClass("load");

			$("#readme .hr p").html("LOADING");
			$("#readme .content").html("");

			if (!isStart) {
				let examples = "";

				data.examples.forEach((example, index) => {
					let ex = example;
	
					let params = ex.split("(")[1].split(")")[0].replace(/ /g, "").split(","),
						params_out = {};
	
					params.forEach(param => {
						let key = param.split(":")[0],
							val = param.split(":")[1];
	
						params_out[key] = val.split("|");
					});
	
					if (index > 0) {
						examples += " <span class='hljs-comment'>OR</span> ";
					}
	
					examples += alias.get()+(disPkg ? "." : '("el").')+'<span class="hljs-function">'+ex.replace("(", '</span>(');
				});
	
				$("#readme .header code").html(examples);

				if (disPkg) {
					if (!$("#readme .github .name").first()) {
						$("#readme .github span").html('/packages/<span class="name"></span>.js');
					}

					$("#readme .github").show().attr("href", "https://github.com/theotime-me/pzm/blob/master/packages/"+pkg+".js");

					$("#readme .github .name").css({
						width: pkg.length*10+"px",
						opacity: "0"
					});

					setTimeout(() => {
						$("#readme .github .name").html(pkg).css("opacity", "1");
					}, 200);

					let kb = data.size;
					if (kb >= 1) {
						$("#readme .github .size-wrapper").html('- <span class="size">'+kb+'</span> KB');
					} else {
						$("#readme .github .size-wrapper").html('- <span class="size">'+(kb*1000)+'</span> Bytes');
					}

					if (data.dependencies) {
						$("#readme .deps").show(200);

						if (data.dependencies.length == 1) {
							$("#readme .deps h5").html(data.dependencies[0]).attr("onclick", "deps.show('"+pkg+"')");
						} else {
							$("#readme .deps h5").html(data.dependencies.length+" PKGS.");
						}
					} else {
						$("#readme .deps").hide(150);
					}

				} else {
					$("#readme .github").hide();
					$("#readme .deps").hide(150);
				}
			} else {
				$("#readme .deps").hide(150);
				$("#readme .github").attr("href", "https://github.com/theotime-me/pzm/blob/master/prizm.js");
				$("#readme .github span:not(.size-wrapper):not(.size)").html('/prizm.js');
				$("#readme .github .size-wrapper").html('- <span class="size">'+loading.data.prizm+'</span> KB');
			}

			$.ajax({
				url: "https://raw.githubusercontent.com/theotime-me/pzm/master/docs/"+(disPkg ? "packages" : "core")+"/"+(pkg || core)+".md",
				async: true,
				success(md) {
					setTimeout(function() {
						$("#readme").removeClass("hidden");

						$("#readme .hr p").html("README");
						$("#readme .content").html(remarkable.render(md));

						$("#readme .content a").each(function() {
							let a = this[0];
							$(this).attr("target", "blank");
							this[0].childNodes.forEach(el => {
								if (el.nodeName == "CODE") {
									$(a).addClass("code");
								}
							});
						});

						$("#readme .content :not(pre) > code").each(function() {
							if (this.parent()[0].nodeName == "A") {
								return false;
							}

							if (this.parent().html().startsWith("<code") && this.parent().html().endsWith("</code>")) {
								$(this).addClass("alone");
							}
						});

						engine.init();
					}, 200);
				},
				error(status) {
					setTimeout(function() {
						$("#readme").removeClass("hidden");
					}, 200);

					engine.init();

					if (status == 404) {
						$("#readme .hr p").html("NO README");						
						$("#readme .content").html("<p class='noreadme'>No documentation for the this "+(disPkg ? "package" : "method")+" ("+(pkg || core)+")</p>");						
					}
				}
			});

			$("#panel").addClass("visible");
			$("#nav").addClass("solid");

			$("#chooseDocs").addClass("hidden");

			$("#readme").css("display", "");

			setTimeout(() => {
				setTimeout(() => {
					$("#readme").removeClass("hidden");
				}, 2000);
				$("#chooseDocs").css("display", "none");
			}, 200);
		} else {
			$("#chooseDocs").css("display", "");

			$("#readme").addClass("hidden");
			setTimeout(function() {
				$("#chooseDocs").removeClass("hidden");
				$("#readme").css("display", "none");
			}, 200);
			
			$("#panel").removeClass("visible");
			$("#nav").removeClass("solid");
		}

		engine.init();
	}
};

$("#panel .header").on("click", () => {
	$("#readme").addClass("hidden");
	$("#chooseDocs").css("display", "");
	$("#panel").removeClass("visible");

	setTimeout(() => {
		$("#chooseDocs").removeClass("hidden");
		$("#readme").css("display", "none");
	}, 400);
});

function arrays_equal(a,b) { return !!a && !!b && !(a<b || b<a); }

const config = {
	show(cfg) {
		cfg = cfg || this.current;

		this.current = cfg;
		$("#config, #config > div").css("display", "");
		$("#config p .alias").html(cfg.alias);
		$("#config p .pkgs").html(cfg.pkgs.length+" pkgs");
		$("#config .packages").html("");
		$("#nav .config").attr("onclick", "config.show()").hide(400);

		cfg.pkgs.forEach(el => {
			if (Object.keys(registry).includes(el)) {
				$("#config .packages").append('<a onclick="install.show(\''+el+'\')">'+el+'</a>');
			}
		});

		if (arrays_equal(cfg.pkgs, packages.get()) && alias.get() == cfg.alias) {
			$("#config .switch").removeAttr("onclick").html("Your configuration is identical").addClass("disabled");
		} else {
			$("#config .switch").attr("onclick", "config.switchConfirm()").removeClass("disabled");
		}

		setTimeout(function() {
			$("#config").removeClass("hidden");
			setTimeout(function() {
				$("#config > div").removeClass("hidden");
			}, 100);
		}, 50);
	},

	hide() {
		if (this.current) {
			$("#nav .config").show(400);
		}

		$("#config, #config > div").addClass("hidden");			

		setTimeout(function() {
			$("#config .switch").attr("onclick", "config.switchConfirm()").removeClass("confirm").html("Switch <span>to this configuration </span>now !");
			$("#config, #config > div").css("display", "none");
		}, 200);
	},

	switchConfirm() {
		$("#config .switch").attr("onclick", "config.switch()").html("<span>Do you want really</span> replace your configuration ?").addClass("confirm");
	},

	switch() {
		$("#config .switch").attr("onclick", "config.switchConfirm()");
		alias.set(this.current.alias);
		this.hide();

		$.setCookie("pkgs", "", 999);

		this.current.pkgs.forEach(el => {
			packages.install(el);
		});
	}
};

$.ajax({
	url: "https://raw.githubusercontent.com/theotime-me/pzm/master/registry.json",
	async: true,
	success(str) {
		registry = JSON.parse(str).packages;
		coreRegistry = JSON.parse(str).core;

		if (Object.keys(load).includes(engine.page)) {
			load[engine.page]();
		}

		packages.size();
	
		engine.init();

		if (typeof $.get("pkg") === "string" && engine.page == "home") {
			install.show($.get("pkg").replace(/\//g, ""));
		}

		$("#nav .input p span").html(Object.keys(registry).length);
		$("#nav .input input").attr("placeholder", "Find a package");

		if ($.get("q")) {
			$("#nav .input input").val($.get("q"));
			search.input($.get("q"));
		}

		if ($.get("c")) {
			let configCode = $.get("c").replace(/\//g, "");

			$.ajax({
				url: "https://pzm.herokuapp.com/config/"+configCode,
				async: true,
				success(obj) {
					config.show(obj);
				},

				error(err) {
					if (err == 404) {
						return false;
					}
				}
			});
		}
	}
});

engine.init();

const deps = {
	show(pkg) {
		let deps = registry[pkg].dependencies;

		$("#deps > div > p span").html(pkg);
		$("#deps .list").html("");

		deps.forEach(el => {
			let size = registry[el].size;

			if (size >= 1) {
				size = size+" KB";
			} else {
				size = size*1000+" Bytes";
			}

			$("#deps .list").append('<div class="'+el+'"><span onclick="install.show(\''+el+'\')">'+el+'</span><p>'+size+'</p><svg class="packages" viewBox="0 0 83 39"><path d="M6.00001 11.364L6.00001 3.86397L23.2721 20.864L19.0294 25.1066L6.00001 11.364Z"/><path d="M6 37.864L6 29.864L19.0294 16.6213L23.2721 20.864L6 37.864Z"/><path d="M24 3.86397L31.7574 3.8934L48.7279 20.864L42 21.864L24 3.86397Z"/><path d="M30 9.86397L24 3.86397L66 3.86397L66 9.86397L30 9.86397Z"/><path d="M29 31.864L23 37.864L66 37.864L66 31.864L29 31.864Z"/><rect x="31.7574" y="37.8345" width="6" height="24" transform="rotate(-135 31.7574 37.8345)"/><path d="M31.7574 37.8345L27 33.864L44.4853 16.6213L48.7279 20.864L31.7574 37.8345Z"/><path d="M62 8.10661L66 3.86397L83 20.864L79 24.864L62 8.10661"/><path d="M66 37.864L61.4558 33.5919L78.4264 16.6213L83 20.864L66 37.864Z"/><rect y="3.86397" width="6" height="34"/></svg></div>');
		});

		$("#deps, #deps > div").css("display", "");

		setTimeout(function() {
			$("#deps").removeClass("hidden");
			setTimeout(function() {
				$("#deps > div").removeClass("hidden");
			}, 100);
		}, 50);
	},

	hide() {
		$("#deps, #deps > div").addClass("hidden");			

		setTimeout(function() {
			$("#deps, #deps > div").css("display", "none");
		}, 200);
	}
};

const packages = {
	get() {
		return $.getCookie("pkgs") != "" ? $.getCookie("pkgs").split("|") : [];
	},

	getDeps() {
		let pkgs = this.get(),
			deps = [];

		pkgs.forEach(pkg => {
			let pkgDeps = registry[pkg].dependencies;
			if (pkgDeps) {
				pkgDeps.forEach(dep =>  {
					if (!deps.includes(dep)) {
						deps.push(dep);
					}
				});
			}
		});

		return deps;
	},

	show() {
		let pkgs = this.get(),
			deps = [];

		$("#packages .list").html("");

		pkgs.forEach(el => {
			$("#packages .list").append('<div class="'+el+'"><span onclick="install.show(\''+el+'\')">'+el+'</span><svg onclick="packages.remove(\''+el+'\')" viewBox="0 0 24 24"><path d="M7 11v2h10v-2H7zm5-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg></div>');
			if (registry[el].dependencies) {
				registry[el].dependencies.forEach(dep => {
					if (!deps.includes(dep) && !pkgs.includes(dep)) {
						deps.push(dep);
					}
				});
			}
		});

		deps.forEach(el => {
			let kb = registry[el].size,
				size;
			if (kb >= 1) {
				size = kb+" KB";
			} else {
				size = kb*1000+" Bytes";
			}

			$("#packages .list").append('<div class="dep '+el+'"><span onclick="install.show(\''+el+'\')">'+el+'</span><b>'+size+'</b></div>');
		});

		if (pkgs.length > 3) {
			$("#packages .list").addClass("more");
		} else {
			$("#packages .list").removeClass("more");
		}

		if (pkgs.length == 0) {
			$("#packages .list").html("<a class='none'>No packages installed</a>");
		}

		$("#packages").removeAttr("style");
		$("#nav > .packages").css("border-right", "2px solid transparent");

		setTimeout(function() {
			$("#packages").removeClass("hidden");
		}, 50);
	},

	hide() {
		$("#nav > .packages").css("border-right", "2px solid var(--titles)");
		$("#packages").addClass("hidden");

		setTimeout(function() {
			$("#packages").css("display", "none");
		}, 200);
	},

	remove(pkg) {
		pkg = pkg || install.showed;
		this.show();

		setTimeout(function() {
			$.setCookie("pkgs", removeArr(packages.get(), pkg).join("|"), 999);
			packages.displayUrl();
			packages.size();

			if (packages.get().length > 3) {
				$("#packages .list").addClass("more");
			} else {
				$("#packages .list").removeClass("more");
			}

			if ($("#nav .results div").is("."+pkg)) {
				$(".cta", $("#nav .results div").filter("."+pkg)[0]).removeClass("remove").addClass("install").attr("onclick", "packages.install('"+pkg+"')");
				$(".cta path", $("#nav .results div").filter("."+pkg)[0]).attr("d", docsIcons.install);
			}

			if ($("#readme .header h4")[0] && $("#readme .header h4").html() == pkg) {
				$(".button", $("#readme .header")).html("INSTALL").removeClass("remove").addClass("install");
			}

			$("#packages .list ."+pkg+":not(.dep)").addClass("will-install");

			setTimeout(function() {
				$("#packages .list ."+pkg+":not(.dep)").addClass("hide");
				setTimeout(function() {
					if (packages.getDeps().includes(pkg)) {
						let kb = registry[pkg].size, size;
	
						if (kb >= 1) {
							size = kb+" KB";
						} else {
							size = kb*1000+" Bytes";
						}

						setTimeout(function() {
							$("#packages .list").append('<div class="dep will-install '+pkg+'"><span onclick="install.show(\''+pkg+'\')">'+pkg+'</span><b>'+size+'</b></div>');
							setTimeout(function() {
								$("#packages .list .dep."+pkg).removeClass("will-install");
							}, 50);
						}, 50);
					}

					$("#packages .list ."+pkg+":not(.dep)").remove();
				}, 200);
			}, 200);

			if (registry[pkg].dependencies) {
				registry[pkg].dependencies.forEach(el => {
					if (!packages.getDeps().includes(el)) {
						$("#packages .list .dep."+el).addClass("will-install");

						setTimeout(function() {
							$("#packages .list .dep."+el).addClass("hide");
							setTimeout(function() {
								$("#packages .list .dep."+el).remove();
							}, 200);
						}, 100);
					}
				});
			}

			setTimeout(function() {
				if (packages.get().length == 0) {
					$("#packages .list").append("<a class='none hide'>No packages installed</a>");
					setTimeout(function() {
						$("#packages .list a.none").removeClass("hide");
					}, 300);
				}	
			}, 100);

			setTimeout(function() {
				$("#packages .list ."+pkg).addClass("hide");

				setTimeout(function() {
					$("#packages .list ."+pkg).remove();
				}, 200);
			}, 200);
		}, 50);

		$("#packages p").html("DEL "+pkg);

		setTimeout(function() {
			$("#packages p").addClass("hidden");
			setTimeout(function() {
				$("#packages p").html("PACKAGES");
				$("#packages p").removeClass("hidden");
			}, 200);
		}, 1000);

		install.hide();
	},

	install(pkg) {
		pkg = pkg || install.showed;

		if (pkg == "") return false;

		let pkgs = this.get(),
			oldDeps = this.getDeps(),
			pkgDeps = registry[pkg].dependencies,
			list = $("#packages .list").first();

		if (pkgs.includes(pkg)) {
			return false;
		}

		if ($("#nav .results div").is("."+pkg)) {
			$(".cta", $("#nav .results div").filter("."+pkg)[0]).addClass("remove").attr("onclick", "packages.remove('"+pkg+"')");
			$(".cta path", $("#nav .results div").filter("."+pkg)[0]).attr("d", docsIcons.remove);
		}

		if ($("#readme .header h4")[0] && $("#readme .header h4").html() == pkg) {
			$(".button", $("#readme .header")).html("REMOVE").addClass("remove");
		}

		if (!pkgs.includes(pkg)) {
			pkgs.push(pkg);
		}

		this.show();
		$.setCookie("pkgs", pkgs.join("|"), 999);
		this.displayUrl();

		if (packages.get().length > 3) {
			$(list).addClass("more");
		} else {
			$(list).removeClass("more");
		}

		$(".none", list).addClass("hide");
		setTimeout(function() {
			$(".none", list).remove();
		}, 200);

		$(list).append(`<div class="will-install ${pkg}"><span onclick="install.show('${pkg}')">${pkg}</span><svg onclick="packages.remove('${pkg}')" viewBox="0 0 24 24"><path d="M7 11v2h10v-2H7zm5-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg></div>`);

		if (pkgDeps) {
			pkgDeps.forEach(dep => {
				if (packages.get().includes(dep)) {
					return false;
				}

				let kb = registry[dep].size, size;
	
				if (kb >= 1) {
					size = kb+" KB";
				} else {
					size = kb*1000+" Bytes";
				}

				if (!oldDeps.includes(dep)) {
					$(list).append('<div class="dep will-install '+dep+'"><span onclick="install.show(\''+dep+'\')">'+dep+'</span><b>'+size+'</b></div>');
				}
			});
		}

		if (packages.getDeps().includes(pkg)) {
			$("#packages .list .dep."+pkg).remove();
		}

		install.hide();
		list.scrollTop = list.scrollHeight;

		$("#packages p").html("ADD "+pkg);

		setTimeout(function() {
			$("#packages .list .will-install").removeClass("will-install");
		}, 200);

		setTimeout(function() {
			$("#packages p").addClass("hidden");
			setTimeout(function() {
				$("#packages p").html("PACKAGES");
				$("#packages p").removeClass("hidden");
			}, 200);
		}, 1000);

		packages.size();
	},

	displayUrl() {
		$("#url .pkg").html("");

		for (let i = 0; i<this.get().length; i++) {
			if (i != 0) {
				$("#url .pkg").append('<span class="slash">|</span>');
			}

			$("#url .pkg").append('<b onclick="install.show(\''+this.get()[i]+'\')">'+this.get()[i]+'</b>');
		}

		$("#url .alias").html($.getCookie("alias") || "$");
	},

	makeUrl() {
		let url = "https://pzm.herokuapp.com/";

		url += alias.get()+"/";

		for (let i = 0; i<this.get().length; i++) {
			if (i != 0) {
				url += "|";
			}

			url += this.get()[i];
		}

		return url;
	},

	size() {
		let pkgs = this.get(),
			deps = this.getDeps(),
			size = 0;

		pkgs = pkgs.concat(deps);

		pkgs.forEach(pkg => {
			size += registry[pkg].size;
		});

		size += loading.data.prizm;

		size = Math.floor(size*10) / 10;

		$("#nav .size span").html(size);

		return size;
	}
};

packages.displayUrl();

const install = {
	showed: "",
	isOpen: false,

	show(pkg) {
		pkg = pkg || this.showed;

		if (registry && !registry.hasOwnProperty(pkg)) {
			$("#install").addClass("error");
			$("#install .github").removeAttr("href");
			$("#install .github .path").html("inexisting");
			$("#install .github .size").html("0");
			this.showed = "";
		} else {
			$("#install").removeClass("error");
			$("#install .github").attr("href", "https://github.com/theotime-me/pzm/blob/master/packages/"+pkg+".js");
			$("#install .github .path").html("/<span class=\"name\"></span>.js");
			$("#install .github .name").html(pkg).css("width", pkg.length*10+"px");

			let kb = registry[pkg].size;
			if (kb >= 1) {
				$("#install .github .size-wrapper").html('- <span class="size">'+kb+'</span> KB');
			} else {
				$("#install .github .size-wrapper").html('- <span class="size">'+(kb*1000)+'</span> Bytes');
			}
			this.showed = pkg;
		}

		if (packages.get().includes(pkg)) {
			$("#install a.button").addClass("remove").html("REMOVE");
		} else {
			$("#install a.button").removeClass("remove").html("INSTALL");
		}

		this.isOpen = true;
		$("#install h4").html(pkg);
		$("#install h5").html("");

		if (registry) { // Registry loaded
			if (registry.hasOwnProperty(pkg)) { // Package exists
				$("#install p").html(registry[pkg].desc+'<span class="space"></span><a class="docs" href="/docs/?pkg='+pkg+'">Read docs</a>');

				registry[pkg].keywords.forEach(el => {
					$("#install h5").append("<a>"+el+"</a>");
				});

				$("#install h5 a").click(function() {
					search.input($(this).html());
				});
			} else {
				$("#install p").html("Not registered");
			}
		} else { // Registery not yet loaded
			$("#install p").html("Loading ...");
		}

		$("#install, #install div").removeAttr("style");

		setTimeout(function() {
			$("#install").removeClass("hidden");

			setTimeout(function() {
				$("#install div").removeClass("hidden");
			}, 100);

			engine.init();
		}, 50);
	},

	hide() {
		this.isOpen = false;
		$("#install").addClass("hidden");

		setTimeout(function() {
			$("#install div").addClass("hidden");
		}, 50);

		setTimeout(function() {
			$("#install, #install div").css("display", "none");
		}, 200);
	}
};

$("#install").on("click", function() {
	if (!$("div", this).is(":hover")) {
		install.hide();
	}
});

$("#install .button").on("click", function() {
	if ($(this).hasClass("remove")) {
		packages.remove();
	} else {
		packages.install();
	}
});

const alias = {
	get() {
		return $.getCookie("alias") || "$";
	},

	show() {
		$("#alias, #alias > div").removeAttr("style");

		setTimeout(function() {
			$("#alias").removeClass("hidden");

			setTimeout(function() {
				$("#alias > div").removeClass("hidden");
			}, 100);
		}, 50);
	},

	hide() {
		if ($.get("show") == "alias-error") {
			document.location.href = packages.makeUrl();
		}

		$("#alias > div").addClass("hidden");

		setTimeout(function() {
			$("#alias").addClass("hidden");
		}, 100);

		setTimeout(function() {
			$("#alias, #alias > div").css("display", "none");
		}, 200);
	},

	set(alias) {
		alias = alias || $.getCookie("alias") || false;

		if (alias == false) {
			return false;
		}

		$("#alias h1").removeClass("selected");
		$('#alias h1[data-alias="'+alias+'"]').addClass("selected");
		$("#alias code .aka").html(alias);
		$("#url .alias").html(alias);

		$.setCookie("alias", alias, 999);
	}
};

if ($.get("show") == "alias-error") {
	alias.show();
}

const search = {
	keyword(key) {

	},

	input(str) {
		install.hide();
		packages.hide();
		deps.hide();
		config.hide();

		let currentlyDisplayed = [];

		$("#nav .results .big").each(el => {
			currentlyDisplayed.push(el[0].className.replace("big ", ""));
		});

		if (["", " "].includes(str)) {
			$("#nav .input p").html("<span>"+Object.keys(registry).length+"</span> registered packages");
			$("#nav .results").hide();
			this.hide();
			$("#nav .input").removeClass("visible");

			return false;
		}

		let words = str.split(" "),
			founded = Object.keys(registry);

		words.forEach(word => {
			if (word != "") {
				word = word.endsWith("s") && !Object.keys(registry).includes(word) ? word.substring(0, str.length - 1) : word;
				word = word.toLowerCase();

				for (let pkg in registry) {
					let a = false,
						b = false;

					if (pkg.toLowerCase().startsWith(word) || pkg.toLowerCase().includes(word) || registry[pkg].desc.toLowerCase().includes(word)) {
						b = true;
					}


					registry[pkg].keywords.forEach(key => {
						if (key.toLowerCase().startsWith(word)) {
							a = true;
						}
					});

					if (!a && !b) {
						founded = removeArr(founded, pkg);
					}
				}
			}
		});

		this.display(founded, str, currentlyDisplayed);
	},

	display(pkgs, query, currentlyDisplayed) {
		$("#nav .input input").first().focus();
		$("#nav .results").css("display", "block");
		$("#nav .input").addClass("visible");

		setTimeout(function() {
			$("#nav .results").removeClass("hidden");
		}, 50);

		let displayed = [];

		if ($("#nav input").val() != query) {
			$("#nav input").val(query);
		}

		pkgs.forEach(pkg => {
			if (!currentlyDisplayed.includes(pkg) && !displayed.includes(pkg)) {
				$("#nav .results").append(`<div class="big ${pkg} hide"><div class='left'><svg class="packages" viewBox="0 0 83 39"><path d="M6.00001 11.364L6.00001 3.86397L23.2721 20.864L19.0294 25.1066L6.00001 11.364Z"/><path d="M6 37.864L6 29.864L19.0294 16.6213L23.2721 20.864L6 37.864Z"/><path d="M24 3.86397L31.7574 3.8934L48.7279 20.864L42 21.864L24 3.86397Z"/><path d="M30 9.86397L24 3.86397L66 3.86397L66 9.86397L30 9.86397Z"/><path d="M29 31.864L23 37.864L66 37.864L66 31.864L29 31.864Z"/><rect x="31.7574" y="37.8345" width="6" height="24" transform="rotate(-135 31.7574 37.8345)"/><path d="M31.7574 37.8345L27 33.864L44.4853 16.6213L48.7279 20.864L31.7574 37.8345Z"/><path d="M62 8.10661L66 3.86397L83 20.864L79 24.864L62 8.10661"/><path d="M66 37.864L61.4558 33.5919L78.4264 16.6213L83 20.864L66 37.864Z"/><rect y="3.86397" width="6" height="34"/></svg>
					<h4 onclick="install.show('${pkg}')">${pkg}</h4></div>
					<p>${registry[pkg].desc}<span class="space"></span><a class="docs" href="/docs/?pkg=${pkg}">Read docs</a></p>
					<svg onclick="packages.${packages.get().includes(pkg) ? "remove" : "install"}('${pkg}')" class="cta ${packages.get().includes(pkg) ? "remove" : "install"}" viewBox="0 0 24 24"><path d="${packages.get().includes(pkg) ? docsIcons.remove : docsIcons.install}"/></svg>
				</div>`);

				setTimeout(function() {
					$("#nav .results div.big."+pkg).removeClass("hide");
				}, 50);

				displayed.push(pkg);
				currentlyDisplayed.push(pkg);
			}
		});

		currentlyDisplayed.forEach(el => {
			if (!pkgs.includes(el)) {
				$("#nav .results .big."+el).addClass("hide");

				setTimeout(function() {
					$("#nav .results .big."+el).remove();
				}, 200);
			}
		});

		setTimeout(function() {
			if (pkgs.length == 0) {
				$("#nav .results").html('<h1>Nothing found</h1>');
			} else {
				$("#nav .results h1").addClass("hide");
				setTimeout(function() {
					$("#nav .results h1").remove();
				}, 200);
			}
		}, 200);

		$("#nav .input p").html("<span></span> package"+(pkgs.length > 1 ? "s" : "")+" found");
		$("#nav .input p span").html(pkgs.length);

		engine.init();
	},

	hide() {
		$("#nav .results").addClass("hidden");
		$("#nav .input").removeClass("visible");

		setTimeout(function() {
			$("#nav .results").hide();
		}, 200);
	},

	show() {
		if ($("#nav .results").html() == "") {
			return false;
		}

		if (!$("#nav .input input").is(":focus")) {
			$("#nav .input input").first().focus();
		}

		$("#nav .results").css("display", "block");
		$("#nav .input").addClass("visible");

		setTimeout(function() {
			$("#nav .results").removeClass("hidden");
		}, 50);
	}
};

$("#nav .input input").on("blur", function() {
	if ($("#nav .input, #nav .results").is(":hover")) {
		return false;
	}

	search.hide();
});

$("#nav .input input").on("focus", function() {
	search.show();
});

// Effects
setInterval(function() {
	if (!install.isOpen && engine.page == "home") {
		$("#hero .impact .code").toggleClass("caret");
	}
}, 1200);

setInterval(function() {
	if (!install.isOpen && engine.page == "home") {
	$("#hero .impact .light").toggleClass("on");
	setTimeout(function() {
		$("#hero .impact .light").toggleClass("on");

		setTimeout(function() {
			$("#hero .impact .light").toggleClass("on");
			setTimeout(function() {
				$("#hero .impact .light").toggleClass("on");
			}, 50);
		}, 500);
	}, 100);
	}
}, 4500);

$("#nav .packages").on("click", function() {
	packages.show();
});

$("#alias h1").on("click", function() {
	alias.set($(this).attr("data-alias"));
});

alias.set();

$(window).on("click", function() {
	if (!$("#packages, #nav > .right .packages, #install, #nav .results div, #config .switch").is(":hover")) {
		packages.hide();
	}

	if (!$("#deps > div, .deps, #install").is(":hover")) {
		deps.hide();
	}

	if (!$("#alias > div, #url").is(":hover")) {
		alias.hide();
	}

	if (!$("#config > div, #install, #nav .config").is(":hover")) {
		config.hide();
	}

	if (!$("#nav .input, #nav .results, #install").is(":hover")) {
		search.hide();
	}
});

$(window).on("scroll", ev => {
	checkScroll();
});

function checkScroll() {
	let scroll = $("html").prop("scrollTop");
	if (scroll > 15) {
		$("#nav").addClass("solid");
	} else {
		if (["docs"].includes(engine.page)) {
			return false;
		}

		$("#nav").removeClass("solid");
		if (engine.page == "search") {
			$("#nav .input").removeAttr("style");
		}
	}
}

checkScroll();

if ($.get("f")) {
	$.ajax({
		url: "https://pzm.herokuapp.com/stats/"+$.get("f"),
		async: true
	});
} else {
	$.ajax({
		url: "https://pzm.herokuapp.com/stats/false",
		async: true
	});
}

$("#nav .input input").attr("placeholder", "Loading registry ...");