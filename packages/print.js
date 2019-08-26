Prizm.print = () => {
	if (window.print){ // Si "window.print" existe
		window.print(); // Alors on affiche la boîte de dialogue pour imprimer la page
	}
};