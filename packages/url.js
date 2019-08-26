Prizm.get = param => { // param: string
    var vars = {};
	window.location.href.replace( location.hash, '' ).replace( 
		/[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
		function( m, key, value ) { // callback
			vars[key] = value !== undefined ? value : '';
		}
	);

	if ( param ) {
		return vars[param] ? vars[param] : null;	
	}
	return vars;
};

Prizm.url = url => { // url: string
	if (url){ // Si le paramètre "url" est défini
		document.location.href = url; // Alors on redirige vers l'url précisée
	}
		// De toute façon
	return document.location.href; // On retourne l'url actuelle
};
