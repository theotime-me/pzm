/* PREVENT */if (typeof Prizm === "undefined") alert(`====== Prizm's core is missing ======\nYou have to install Prizm to continue\n>>>>>> https://bit.ly/prizm-js <<<<<<`);

Prizm.getStyle("https://raw.githubusercontent.com/theotime-me/pzm/master/packages/ultralink.css");

Prizm.ultralink = function() {
    Prizm("[ultralink]").each(el => {
        let title = el.html(),
            link = new URL(el[0].href).pathname,
            icon = "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z";

        el.html(`<svg viewBox="0 0 24 24"><path d="${icon}"/></svg>
<h4>${title}</h4>
<p>${link}</p>`)
    });
};

Prizm.ultralink();