Prizm.scrollTop = () => {
	let currentScroll = document.querySelector("html").scrollTop;
	if (currentScroll > 0) {
		 window.requestAnimationFrame(Prizm.scrollTop);
		 document.querySelector("html").scrollTo(0, 0);
	}
};