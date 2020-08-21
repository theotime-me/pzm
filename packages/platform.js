if (typeof Prizm === "undefined") alert(`====== Prizm's core is missing ======\nYou have to install Prizm to continue\n>>>>>> https://bit.ly/prizm-js <<<<<<`);

Prizm.getStyle('https://raw.githubusercontent.com/theotime-me/pzm/master/packages/platform.css');
//Prizm.getStyle('./platform.css');

Prizm.platform = {
    registry: false,
	promise_finished: false,
	
	baseURI: "https://raw.githubusercontent.com/theotime-me/pzm/master/",

    load() {
        Prizm.platform.promise_finished = new Promise((resolve, reject) => {
            Prizm.ajax({
				url: Prizm.platform.baseURI+"registry.json",
				async: true,
                success(obj, type) { // when registry.json is received
                    Prizm.platform.registry = JSON.parse(obj);
					
					resolve(Prizm.platform.registry);
					
					Prizm.platform.replaceElements();
				}, error() {
					reject();
				}
            });
        });
	},

    ready(fn) {
        if (!Prizm.platform.registry) {
            Prizm.platform.promise_finished.then(() => fn(Prizm.platform.registry));
        } else {
            fn(Prizm.platform.registry);
        }
	},
	
	clean(str) {
		str = str.replace(/ /g, "");

		return str;
	},

	error_registry_not_loaded() {
		Prizm.log("Registry not loaded; please wrap the lines using the Prizm Platform with the Prizm.platform.ready(fn) function.", "error");
	},

    package: {
        get(name) {
			if (!Prizm.platform.registry) {
				Prizm.platform.error_registry_not_loaded();
				return false;
			};

			name = Prizm.platform.clean(name);

			if (Object.keys(Prizm.platform.registry.packages).includes(name)) {
				return Prizm.platform.registry.packages[name];
			} else {
				return false;
			}
        },

        stringify(name, noDiv) {
			if (!Prizm.platform.registry) {
				Prizm.platform.error_registry_not_loaded();
				return false;
			};
			name = Prizm.platform.clean(name);

			if (Object.keys(Prizm.platform.registry.packages).includes(name)) {
				let package = this.get(name),
					out = `${!noDiv ?'<div prizm-package="'+name+'">' : ""}
						<div class="text">
							<img class="icon" src="https://prizm-website.herokuapp.com/icons/package/blue-deepblue.svg" alt="">
							<h4>${name}</h4>
							<p>${package.desc}</p>
						</div>
						
						<img class="background" src="" alt="">
						${!noDiv ? '</div>' : ""}`;
					
				return out;
			}
        }
	},
	
	replaceElements() {
		Prizm("[prizm-package]").each(el => {
			if (el.hasClass("prizm-processed")) return false;

			if (el.attr("prizm-package")) {
				el.append(Prizm.platform.package.stringify(el.attr("prizm-package"), true));
			}

			el.addClass("prizm-processed");
		});
	}
};

setInterval(Prizm.platform.replaceElements, 2500);

Prizm.platform.load();