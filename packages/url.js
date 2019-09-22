Prizm.url = url => { // url: string
	if (url != undefined){ // Si le paramètre "url" est défini
		document.location.href = url; // Alors on redirige vers l'url précisée
	}
		// De toute façon
	return document.location.href; // On retourne l'url actuelle
};