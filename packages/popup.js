Prizm.popup = (url, name, height, width) => { // url: string, name: string, height: number || string, width: number || string
	if (url && name && height && width){ // Si tous les paramètres sont présents
		window.open(url, name,+"menubar=no, status=no, scrollbars=no, menubar=no, width="+width+", height="+height); // Alors lancement de la fenêtre popup
	}
};