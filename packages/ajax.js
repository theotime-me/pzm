/* PREVENT */if (typeof Prizm === "undefined") alert(`====== Prizm's core is missing ======\nYou have to install Prizm to continue\n>>>>>> https://bit.ly/prizm-js <<<<<<`);

Prizm.data.ajax = {};

Prizm.ajax = ({ url, urls, method, callback, cb, data, async, headers, success, error, progress, parse, id}) => { // url: string, method: string, async: boolean, success: function, error: function, progress: function
    method = method != undefined ? method.toUpperCase() : "GET";
	async = async || false;
	parse = parse != undefined ? parse : true;

	if (Array.isArray(url) || urls != undefined) {
		let id = Math.floor(Math.random() * 99999999).toString(16);


		let list = urls || url;

		Prizm.data.ajax[id] = {
			done: 0,
			total: list.length,
			error: false
		};
	
		list.forEach((el, index) => {
			Prizm.ajax({
				url: el,
				method: method,
				data: data,
				async: async,
				headers: headers,
				success(response, type) {
					Prizm.data.ajax[id].done++;

					if (typeof success == "function") {
						if (Prizm.data.ajax[id].done / Prizm.data.ajax[id].total == 1 && !Prizm.data.ajax[id].error) {
							success(response, type);
						}
					} else if (Array.isArray(success) && typeof success[index] == "function") {
						success[index](response, type);
					}
				}, error(err) {
					Prizm.data.ajax[id].error = true;
					error(err);
				}, progress: progress,
				parse: parse,
				id: id
			});
		});

		return false;
	}

    var xhr = new XMLHttpRequest();
    xhr.open(method, url, async);
    xhr.onload = function () {
      if (xhr.readyState === 4) {
		if (callback) callback();
		if (cb) cb();

        if (xhr.status === 200) {
			if (success) {
				if (xhr.getResponseHeader("content-type") != null && xhr.getResponseHeader("content-type").startsWith("application/json") && parse == true) {
					success(JSON.parse(xhr.response), xhr.getResponseHeader("content-type"));
				} else {
					if (xhr.getResponseHeader("content-type")) {
						success(xhr.response, xhr.getResponseHeader("content-type"));
					} else {
						success(xhr.response, null);
					}
				}
			}
        } else {
			if (error) {
				error(xhr.status);
			}
		}
      }
	};

    xhr.onerror = function () {
      error(xhr.status);
    };

    if (progress) {
        xhr.addEventListener('progress', function(e) {
			if (e.lengthComputable) {
				progress((e.loaded / e.total)*100);
			}
        });
	}

	if (headers != undefined) {
		Object.keys(headers).forEach(el => {
			xhr.setRequestHeader(el, headers[el]);
		});
	}
	
	if (method == "POST" && data != undefined) {
		var formData = new FormData();

		Object.keys(data).forEach(el => {
			formData.append(el, data[el]);
		});

		xhr.send(formData);
	} else {
		xhr.send(null);
	}
};