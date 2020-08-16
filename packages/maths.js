if (typeof Prizm === "undefined") alert(`====== Prizm's core is missing ======\nYou have to install Prizm to continue\n>>>>>> https://bit.ly/prizm-js <<<<<<`);

Prizm.maths = {
    calculatePI: function(iterations) {
        iterations = iterations || 100;
    
        let pi = 0,
            i = 0,
            odd = 1,
            cb = false,
            balance = true;

        if (typeof iterations === "function") {
            cb = iterations;
            iterations = true;
        }

        function loop() {
            pi += 4 / odd;
            odd += 2;
            pi -= 4 / odd;
            odd += 2;

            pi += 4 / odd;
            odd += 2;
            pi -= 4 / odd;
            odd += 2;

            pi += 4 / odd;
            odd += 2;
            pi -= 4 / odd;
            odd += 2;

            pi += 4 / odd;
            odd += 2;
            pi -= 4 / odd;
            odd += 2;

            pi += 4 / odd;
            odd += 2;
            pi -= 4 / odd;
            odd += 2;

            cb(pi);

            requestAnimationFrame(loop);
        }

        loop();
    }
}

Prizm.maths.calculatePI(pi => {
    $("h4").html(pi);
});