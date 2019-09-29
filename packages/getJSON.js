Prizm.getJSON = (url, cb) => {
    Prizm.ajax({
        url: url,
        async: true,
        success(res, type) {
            if (type && type.startsWith("application/json")) {
                cb(res);
            } else {
                try {
                    cb(JSON.parse(res));
                } catch (err) {
                    cb(res, "bad json");
                }
            }
        },

        error(status) {
            cb(false, "HTTP error: "+status);
        }
    });
};