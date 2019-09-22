Prizm.ajax = ({ url, method, data, async, headers, success, error, progress, parse}) => { // url: string, method: string, async: boolean, success: function, error: function, progress: function
    method = method.toUpperCase() || "GET";
	async = async || false;
	parse = typeof parse != "undefined" ? parse : true;

    var xhr = new XMLHttpRequest();
    xhr.open(method, url, async);
    xhr.onload = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
			if (success) {
				if (xhr.getResponseHeader("content-type") != null && xhr.getResponseHeader("content-type").startsWith("application/json") && parse == true) {
					success(JSON.parse(xhr.response));
				} else {
					if (xhr.getResponseHeader("content-type") != null) {
						success(xhr.response, xhr.getResponseHeader("content-type"));
					} else {
						success(xhr.response);
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

	if (headers) {
		Object.keys(headers).forEach(el => {
			xhr.setRequestHeader(el, headers[el]);
		});
	}
	
	if (method == "POST") {
		var formData = new FormData();

		Object.keys(data).forEach(el => {
			formData.append(el, data[el]);
		});

		xhr.send(formData);
	} else {
		xhr.send(null);
	}
};