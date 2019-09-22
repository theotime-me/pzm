Prizm.getScript = (url, cb) => {
    Prizm.ajax({
        url: url,
        async: true,
        success(res) {
            eval(res);
            cb();
        },

        error(status) {
            cb(status);
        }
    });
};