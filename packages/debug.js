/* PREVENT */if (typeof Prizm === "undefined") alert(`====== Prizm's core is missing ======\nYou have to install Prizm to continue\n>>>>>> https://bit.ly/prizm-js <<<<<<`);

Prizm.debug = { // request: string
    os_list: [
        "unknown",
        "windows",
        "macos",
        "linux",
        "unix",
        "ios",
        "android",
        "windows_phone"
    ],

    browser_list: [
        "unknown",
        "firefox",
        "chrome",
        "opera",
        "ie",
        "edge",
        "safari"
    ],

    compression_char: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",

    toBase62(n) {
        if (n === 0) {
            return '0';
        }

        var digits = this.compression_char,
            result = ''; 

        while (n > 0) {
            result = digits[n % digits.length] + result;
            n = parseInt(n / digits.length, 10);
        }
          
        return result;
    },

    toBase10(s) {
        var digits = this.compression_char,
            result = 0;
        for (var i=0 ; i<s.length ; i++) {
          var p = digits.indexOf(s[i]);
          if (p < 0) {
            return NaN;
          }
          result += p * Math.pow(digits.length, s.length - i - 1);
        }
        return result;
    },

    get() {
        let OUTPUT = "";

        /* OS & BROWSER
        =================== */
        let os = Prizm.os(),
            browser = Prizm.browser();

        if (this.os_list.includes(os)) {
            os = this.os_list.indexOf(os);
        } else {
            os = "unknown";
        }

        if (this.browser_list.includes(browser)) {
            browser = this.browser_list.indexOf(browser);
        } else {
            browser = "unknown";
        }

        os = this.toBase62(os);
        browser = this.toBase62(browser);

        OUTPUT += os+browser+".";

        /* DATE
        =========== */
        let d = Prizm.date("now"),
            year = d.year(),
            month = d.MONTH() < 10 ? "0"+d.MONTH() : d.MONTH(),
            date = d.date() < 10 ? "0"+d.date() : d.date(),
            hours = d.hr() < 10 ? "0"+d.hr() : d.hr(),
            minutes = d.mn() < 10 ? "0"+d.mn() : d.mn(),
            seconds = d.sec() < 10 ? "0"+d.sec() : d.sec(),
            miliseconds = d.ms() < 10 ? "0"+d.ms() : d.ms(),

            compressed_date = this.toBase62(""+year+month+date+hours+minutes+seconds+miliseconds)

            OUTPUT += compressed_date+".";

        /* PRIZM METADATA
        ===================== */
        Prizm.platform.ready(() => {
            let alias = Prizm.alias,
                packages = Prizm.packages,
                registry = Object.keys(Prizm.platform.registry.packages),
                pkg_list = [];

            packages.forEach(pkg => {
                if (registry.includes(pkg)) {
                    pkg_list.push(this.toBase62(registry.indexOf(pkg)));
                }
            });

            let compressed_packages = pkg_list.join("-") || "-";

            OUTPUT += alias+"."+compressed_packages+".";

        /* USER NAVIGATION
        ===================== */
        let scroll = this.toBase62(Prizm("html")[0].scrollTop),
            posX = this.toBase62(this.pos.x),
            posY = this.toBase62(this.pos.y);

            OUTPUT += scroll+"."+posX+"."+posY+".";

        /* WEBSITE UPTIME
        ===================== */
        let start_time = this.start_time,
            diff = Prizm.date().time() - start_time.time();
 
            diff = Math.floor(diff/1000);

            console.log(diff);
        });
    },

    pos: {
        x: 0,
        y: 0
    },
    
    start_time: Prizm.date(),

    mouseUpdate(e) {
        Prizm.debug.pos.x = e.pageX;
        Prizm.debug.pos.y = e.pageY;
    },

    encode() {
        this.get();
    }
};

window.addEventListener('mousemove', Prizm.debug.mouseUpdate, false);

