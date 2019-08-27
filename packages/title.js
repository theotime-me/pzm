Prizm.title = title => { // title: string || number
	if (title){ // Si le paramètre "title" existe
		document.title = title; // Modification du titre de la fenêtre
	}

		// De toute façon
	return document.title; // On retourne la titre actuel
};