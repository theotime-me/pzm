Prizm.history = go => { // go: number || string
	if (go == 'back'){ // Si le paramètre go est égal à "back"
		window.history.back(); // On recule dans l'historique
	} else if (go == 'forward'){ // Sinon si le paramètre go est égal à "forward"
		window.history.forward(); // On avance dans l'historique
	} else if (typeof go === "number"){ // Sinon si le paramètre go est un nombre
		window.history.go(go); // On se déplace dans l'historique de "go" fois
	}
};