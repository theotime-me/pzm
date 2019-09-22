Prizm.getScript = (url, cb) => {
    Prizm.ajax({
        url: url,
        async: true,
        success(res, type) {
            if (type.includes("javascript")) {
                eval(res);
            } else if (type.startsWith("text/css")) {
                $("head").append("<style prizm>"+res+"</style>");
            }
            cb();
        },

        error(status) {
            cb(status);
        }
    });
};