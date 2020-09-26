if (typeof Prizm === "undefined") alert(`====== Prizm's core is missing ======\nYou have to install Prizm to continue\n>>>>>> https://bit.ly/prizm-js <<<<<<`);

Prizm.health = {
    heartrate: {
		arr: [],
		history: [],

        start() {
            document.addEventListener("keydown", this.tick);
        },

        tick: function(ev) {
            if (ev.keyCode != 32) return false;

            let arr = Prizm.health.heartrate.arr;

            arr.push(new Date().getTime());
    
            if (arr.length > 4) {
                arr.shift();
            }

            let average = 0;

            arr.forEach((timeValue, index) => {
				if (index != 0) {
					let diff = timeValue - arr[index -1];
                    average += diff;
				};
			});
			
			average /= (arr.length -1 || 1);

			console.log(Prizm.health.heartrate.toBPM(average));
		},
		
		toBPM(diff) {
			diff /= 1000; // to seconds

			let BPM = Math.floor(60 / (diff || 1));

			Prizm.health.heartrate.history.push(BPM);

			Prizm.health.heartrate.chart.data.datasets[0].data.push(BPM);

			if (Prizm.health.heartrate.chart.data.datasets[0].data.length > 30) {
				Prizm.health.heartrate.chart.data.datasets[0].data.shift();
			}

			Prizm.health.heartrate.chart.update();

			return BPM;
		},

        end() {
            document.removeEventListener("keydown", this.tick);
        }
    }
};

Prizm.health.heartrate.chart = new Chart(Prizm("canvas")[0].getContext("2d"), {
	type: 'line',
	data: {
        labels: ["-30", "-29", "-28", "-27", "-25", "-24", "-23", "-22", "-21", "-20", "-19", "-18", "-17", "-16", "-15", "-14", "-13", "-12", "-11", "-10", "-9", "-8", "-7", "6", "-5", "-4", "-3", "-2", "-1", "now"],
        datasets: [{
            label: 'My First dataset',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        }]
    },
	options: {}
});

Prizm.health.heartrate.start();