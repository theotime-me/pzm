/* PREVENT */if (typeof Prizm === "undefined") alert(`====== Prizm's core is missing ======\nYou have to install Prizm to continue\n>>>>>> https://bit.ly/prizm-js <<<<<<`);

Prizm.getStyle("https://raw.githubusercontent.com/theotime-me/pzm/master/packages/hoverview.css");

if (typeof Prizm.data.cache === "undefined") Prizm.data.cache = {};

Prizm.data.hoverview_selector = "a";

Prizm.hoverview = function(selector) {
    Prizm.data.hoverview_selector = selector;

    selector = Prizm(selector);

    selector.each(el => {

        if (el[0].nodeName === "A") {
            let href = el[0].href,
                url = new URL(href),
				host = url.hostname,
				protocol = url.protocol,
				path = url.pathname,
				params = new URLSearchParams(url.search);

            if (host.startsWith("www.")) {
                host = host.substring(4);
			}
			
            if (Object.keys(Prizm.data.cache).includes(href)) return false;

            switch (host) {
				case "youtube.com":
					if (path.startsWith("/watch")) {
						let id = params.get("v");


						Prizm.ajax({
							url: "https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id="+id+"&key=AIzaSyACZhw3bgL6WMzEj36gNTb0f5gYV40KzN8",
							async: true,
							success(obj, type) {
								let video = obj.items[0].snippet;

								Prizm.data.cache[href] = {
									title: video.title,
									desc: video.description,
									type: "default",
									image: video.thumbnails.standard.url,
									favicon: "https://s.ytimg.com/yts/img/favicon-vfl8qSV2F.ico"
								};

								Prizm.hoverview_display(href);
							}
						});
					}
				break;

                case "google.com":
                    if (path.startsWith("/maps")) {
                        let data = false;

                        path.split("/").forEach(el => {
                            if (el.startsWith("@")) {
                                data = el;
                            }
                        });

                        if (!data) return false;

                            	data = data.substring(1).split(",");
                            let lat = data[0],
                                lng = data[1],
                                zoom = data[2].endsWith("z") ? parseInt(data[2].substring(0, data[2].length -1)) : 10;

                            Prizm.data.cache[href] = {
								title: "Google Maps",
								type: "large-picture",
                                image: "https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/static/"+lng+","+lat+","+(zoom-2)+"z,0,5/340x90@2x?access_token=pk.eyJ1IjoidGhlb3RpbWUtZiIsImEiOiJja2R3d3o2YTk0MzVxMnRyb3pmNGhnY3pvIn0.gjzAi3ZyOD5rmvTbP7pBEg&logo=false"
                            };

                            Prizm.hoverview_display(href, "map");
                    } else if (path.startsWith("/search")) {
						let query = params.get("q");

							Prizm.data.cache[href] = {
								title: Prizm.prettify(query),
								type: "search",
								favicon: "https://www.google.com/images/branding/googleg/1x/googleg_standard_color_128dp.png",
                                icon: '<path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>'
                            };
					}
                break;

                default:
                    Prizm.ajax({
                        url: "https://prizm-cors.herokuapp.com/"+href,
                        async: true,
                        success(page, type) {
                            let parser = new DOMParser(),
                                doc = parser.parseFromString(page, "text/html"),
                                head = Prizm("head", doc),
                                baseURI = href,
                                favicon = Prizm("link[rel=icon], link[rel='shortcut icon']", head),
                                image = Prizm('meta[property="og:image"]', head),
                                desc = Prizm('meta[name="description"], meta[itemprop="description"]', head);
								title = Prizm('title', head);
        
                            if (!baseURI.endsWith("/")) baseURI += "/";
        
                            favicon = favicon[0] ? favicon.attr("href") : false;
                            image = image[0] ? image.attr("content") : false;
                            desc = desc[0] ? desc.attr("content") : false;
                            title = title[0] ? title.html() : false;
        
                            // complete relative paths correctly
                            let isAbsolute = new RegExp('^(?:[a-z]+:)?//', 'i');
                            
							if (favicon) {
								if (favicon.startsWith("/")) {
									favicon = protocol+"//"+host+favicon;
								} else if (!isAbsolute.test(favicon)) favicon = baseURI + favicon;
							}
							
							if (image) {
								if (image.startsWith("/")) {
									image = protocol+"//"+host+image;
								} else if (!isAbsolute.test(image)) image = baseURI + image;	
							}

                            Prizm.data.cache[href] = {
                                title: title,
								desc: desc,
								type: "default",
                                image: image,
                                favicon: favicon
                            }
        
                            Prizm.hoverview_display(href);
						},
						
						error(type) {
							Prizm.data.cache[href] = {
								error: type,
								type: "error"
                            }
						}
                    });

                break;
            }
        }
    });
};

setInterval(() => {
    Prizm.hoverview(Prizm.data.hoverview_selector);
}, 3500);

Prizm.data.hoverview_hide_timeout = null;
Prizm.data.hoverview_before_hide_timeout = null;

Prizm(Prizm.data.hoverview_selector).on("enter", function() {
	let href = this[0].href;

    Prizm.hoverview_display(href, href.type, this[0]);
});

Prizm(window).on("mousemove", function(event) {
    if (Prizm(Prizm.data.hoverview_selector).is(":hover")) {
        var eventDoc, doc, body;

        event = event || window.event; // IE-ism

		// event.clientX || event.clientY
		// to get the cursor position
    }
});

Prizm(Prizm.data.hoverview_selector).on("leave", function() {
	Prizm.hoverview_hide();
});

Prizm(window).on("scroll", function() {
	Prizm.hoverview_hide();
});

Prizm.hoverview_hide = (force) => {
	if (force) {
		Prizm(".hoverview, .hoverview-arrow").addClass("hidden");
		Prizm(".hoverview, .hoverview-arrow").css("display", "none");
	} else {
		Prizm.data.hoverview_before_hide_timeout = setTimeout(() => {
			Prizm(".hoverview, .hoverview-arrow").addClass("hidden");
	
			Prizm.data.hoverview_hide_timeout = setTimeout(() => {
				Prizm(".hoverview, .hoverview-arrow").css("display", "none");
			}, 200);
		}, 150);
	}
}

Prizm.hoverview_display = function(href, type, element) {
	if (!Prizm("[href='"+href+"']").is(":hover")) {
		return false;
	}

	if (type == "error") {
		Prizm.hoverview_hide();
		return false;
	}

    clearTimeout(Prizm.data.hoverview_hide_timeout);
    clearTimeout(Prizm.data.hoverview_before_hide_timeout);

    Prizm(".hoverview, .hoverview-arrow").css("display", "");

    setTimeout(() => {
        Prizm(".hoverview, .hoverview-arrow").removeClass("hidden");

			element = element || Prizm(Prizm.data.hoverview_selector)[0];
        let rect = element.getBoundingClientRect(),
			left = rect.left,
			width = element.offsetWidth,
			middleArrowPos = left + (width / 2) - 15,
            top = rect.top;

        if (left+340 <= window.innerWidth) {
            Prizm(".hoverview").css({
                left: left+"px",
                right: "",
                top: top+30+"px"
            }).removeClass("align-right");
        } else {
            Prizm(".hoverview").css({
                left: "",
                right: "20px",
                top: top+30+"px"
            }).addClass("align-right");
		}
		
		Prizm(".hoverview-arrow").css({
			left: middleArrowPos+"px",
			top: top+20+"px"
		});
	}, 50);

    if (new URL(href).hostname == document.location.hostname) return false;

    if (!Prizm.data.cache[href] || Prizm.data.cache[href].type == "loading") {
        Prizm(".hoverview .list > *").addClass("hidden");
        Prizm(".hoverview .list > .loading").removeClass("hidden");

        return false;
	}
	
	let data = Prizm.data.cache[href];
		type = data.type || type;

	Prizm(".hoverview, .hoverview-arrow").attr("href", href).attr("type", type);

	Prizm(".hoverview").removeClass("icon");

	switch (type) {
		case "large-picture":
			Prizm(".hoverview .list > *").addClass("hidden");
			Prizm(".hoverview .list > .large-picture").removeClass("hidden");
	
			Prizm(".hoverview .list > .large-picture").css("background-image", "url('"+data.image+"')")
		break;

		default:
			Prizm(".hoverview .list > *").addClass("hidden");
			Prizm(".hoverview .list > .default").removeClass("hidden");
		
			Prizm(".hoverview .default .text p").html(Prizm.cutty({
				str: data.desc,
				pretty: true,
				length: data.image || data.icon ? 75 : 120
			}));
		
			Prizm(".hoverview .default .text h4 span").html(Prizm.cutty({
				str: data.title,
				pretty: false,
				length: data.image || data.icon ? 23 : 33
			}));

			if (data.type == "search") {
				Prizm(".hoverview .default .text h4 span").html(Prizm.cutty({
					str: data.title,
					pretty: false,
					length: 53
				}));

				Prizm(".hoverview .default .text p").html("");
			}
		
			if (data.favicon && !["search"].includes(data.type)) {
				Prizm(".hoverview .default .text h4 .favicon").attr("src", data.favicon).removeClass("hidden");
			} else {
				Prizm(".hoverview .default .text h4 .favicon").addClass("hidden");
			}

			if (data.icon) {
				Prizm(".hoverview .default svg").html(data.icon);
				Prizm(".hoverview").addClass("icon");

				data.image = false;
			} else {
				Prizm(".hoverview .default svg");
				Prizm(".hoverview").removeClass("icon");
			}
		
			if (data.image) {
				Prizm(".hoverview .default .img").css("background-image", "url("+data.image+")").removeClass("hidden");
				Prizm(".hoverview").addClass("image");
			} else {
				Prizm(".hoverview .default .img").addClass("hidden");
				Prizm(".hoverview").removeClass("image");
			}
		
			Prizm(".hoverview .loading").addClass("hidden");
			Prizm(".hoverview .default").removeClass("hidden");
	}
}

if (["chrome"].includes(Prizm.browser())) {
    Prizm(".hoverview").addClass("blur");
}