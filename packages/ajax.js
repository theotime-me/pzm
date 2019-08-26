Prizm.ajax = ({ url, method, async, success, error, progress, parse}) => { // url: string, method: string, async: boolean, success: function, error: function, progress: function
    method = method || "GET";
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
					success(xhr.response);
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

	xhr.send(null);
};