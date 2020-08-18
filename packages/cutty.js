/* PREVENT */ if (typeof Prizm === "undefined") alert(`====== Prizm's core is missing ======\nYou have to install Prizm to continue\n>>>>>> https://bit.ly/prizm-js <<<<<<`);

Prizm.cutty = function(param, length, pretty, dots) {
    let str, cut = "";
    if (typeof param === "object") {
        length = param.length || length || true;
        pretty = param.pretty || pretty || false;
        dots = param.dots != undefined ? param.dots : dots != undefined ? dots : true;
        str = param.str || "Nothing here !";
    } else {
        str = param;
        length = length || true;
        pretty = pretty || false;
        dots = dots != undefined ? dots : true;
    }

    cut = str;

    if (typeof length === "number" && length < str.length) {
        if (pretty) {
            let words = str.split(" "),
                output = [];
                total_length = 0;

            for (let [index, word] of words.entries()) {
                if (index > 0) total_length += 1; // do not forget the space beween the words !!!

                total_length += word.length;

                output.push(word);

                if (total_length > length) {
                    output.pop();
                    cut = output.join(" ");

                    if (dots) {
                        cut = cut.substring(0, cut.length);
                        cut = cut.trim();

                        if (/[^A-z éèàôîûù]|_/.test(cut.slice(-1))) {
							cut = cut.slice(0, -1);
						}

                        cut = cut += "...";
                    }

                    break;
                }
            }
        } else {
            cut = str.substring(0, length);

            if (dots) {
                cut = cut.substring(0, cut.length-3);
                cut = cut.trim();
                cut = cut += "...";
            }
        }
    }

    return cut;
}