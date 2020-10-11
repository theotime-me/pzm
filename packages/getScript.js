Prizm.getScript = (url, cb) => {
    Prizm.ajax({
        url: url,
        async: true,
        success(res, type) {
            if (type && type.includes("javascript")) {
                eval(res);
            } else if (type.startsWith("text/css")) {
                $("head").append("<style prizm>"+res+"</style>");
            }

            if (cb) cb(200);
        },

        error(status) {
            if (cb) cb(status);
        }
    });
};