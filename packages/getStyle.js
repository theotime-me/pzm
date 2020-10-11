/* PREVENT */if (typeof Prizm === "undefined") alert(`====== Prizm's core is missing ======\nYou have to install Prizm to continue\n>>>>>> https://bit.ly/prizm-js <<<<<<`);

Prizm.getStyle = function(url, cb) {
    Prizm.ajax({
        url: url,
        async: true,
        success(obj, type) {
            var style = document.createElement("style");
                style.type = "text/css";
                style.innerHTML = obj;
                Prizm("head").append(style);

            if (cb) cb(200);
        },
        error(status) {
            if (cb) cb(status);
        }
    });
};
