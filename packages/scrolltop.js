Prizm.scrollTop = () => {
	let currentScroll = document.body.scrollTop;
	if (currentScroll > 0) {
		 window.requestAnimationFrame(Prizm.scrollTop);
		 document.body.scrollTo(0, 0);
	}
};