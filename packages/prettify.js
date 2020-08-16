/* PREVENT */if (typeof Prizm === "undefined") alert(`====== Prizm's core is missing ======\nYou have to install Prizm to continue\n>>>>>> https://bit.ly/prizm-js <<<<<<`);

Prizm.prettify = function(str) {
    str = str.trim();
    str = str.replace(/\s{2,}/g, " ");
    str = str.replace(/\?{4,}/g, "???");
    str = str.replace(/\!{4,}/g, "!!!");
    str = str.replace(/\.{2,}/g, "...");
    str = str.replace(/,,/g, ",");

    let words = str.split(" "),
        newWords = [];

    words.forEach(word => {
        let letters = word.split(""),
            newLetters = [];

        letters.forEach((letter, index) => {
            if (letter == letter.toUpperCase() && ![0, letters.length -1].includes(index)) {
                newLetters.push(letter.toLowerCase());
            } else {
                newLetters.push(letter);
            }
        });

        newWords.push(newLetters.join(""));
    });

    str = newWords.join(" ");

    str = str.charAt(0).toUpperCase() + str.slice(1);

    return str;
};

console.log(Prizm.prettify(" euh     au fait    tu viEns quand ????"))