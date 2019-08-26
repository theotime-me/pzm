/*
	 _____      _
	|  __ \    (_)
	| |__) | __ _ _____ __ ___
	|  ___/ '__| |_  / '_ ` _ \
	| |   | |  | |/ /| | | | | |
	|_|   |_|  |_/___|_| |_| |_|
______________________________________________
--- Prizm Framework © MIT 2019 theotime.me ---
""""""""""""""""""""""""""""""""""""""""""""""

	v2.0 - Editing

""""""""""""""""""""""""""""""""""""""""""""""

// 00 / CORE - selector engine
================================== */

Element.prototype.isNodeList = function() {return false;};
NodeList.prototype.isNodeList = HTMLCollection.prototype.isNodeList = function(){return true;};

/**
 * @function Prizm
 * @description Prizm framework
 * @param {string} q CSS Selector
 * @param {string} ctx Context of selector
 * @return Prizm object
 */

function Prizm(q, ctx) {
    if (!(this instanceof Prizm)) return new Prizm(q, ctx);

    if (typeof q == "function") {
        Prizm.ready(q);
    } else if (typeof q != "undefined") {

            // Check si le sélecteur est un string ou un élément DOM
        if (typeof q==="object" && q.nodeType===1 && typeof q.style === "object" && (typeof q.ownerDocument ==="object")) {
            this.selector = [q];
        } else if (q.isNodeList) {
            this.selector = q;
        } else if ((typeof q === "object") && q instanceof Prizm) {
            this.selector = q.selector;
        } else {

			if (ctx instanceof Prizm) {
				ctx = ctx.first();
			}

			if (typeof ctx === "string") {
				ctx = document.querySelector(ctx);
			}

			if (ctx && ((ctx.querySelector && ctx.charset && ctx.cookie) || (ctx.document && ctx.location && ctx.alert && ctx.setInterval))) {
				ctx = undefined;
			}

			if (q && ((q.querySelector && q.charset && q.cookie) || (q.document && q.location && q.alert && q.setInterval))) {
				this.selector = q;
				this.win_doc = true;
			} else {
				this.selector = (ctx || document).querySelectorAll(q);
				this.win_doc = false;
			}
        }
    } else {
        return false;
	}

/* 01 / DOM
===============

- each
-

*/

/**
 * @param {function} cb Will be call for each HTML element
 */

    this.each = cb =>{
        return this.selector.forEach(el => {
            return cb(el);
        });
	};

/**
 * @param {string} html Append html to node(s)
 */

	this.append = html => {
		this.each(el => {
			el.innerHTML += html;
		});
	};

/**
 * @param {function} cb called with the first node
 */

    this.first = cb =>{
		if (cb) {
			return cb(this.selector[0]);
		}

        return this.selector[0];
	};

/**
 * @param {function} cb called with the last node
 */
	
	this.last = cb =>{
		if (cb) {
			return cb(this.selector[this.selector.length -1]);
		}

        return this.selector[this.selector.length -1];
    };

    this.array = cb => {
        let val = [];

        this.each(el => {
            if (cb) {
                val.push(cb(el));
            } else {
                val.push(el.innerHTML);
            }
        });

        return val;
	};
	
	this.sleep = ms => {
		let now = new Date().getTime();

		while (new Date().getTime() < now + ms){}
		return this;
	};

    this.addClass = (className) => {
        this.each(el => {
			if (Array.isArray(className)) {
				for (let i = 0; i< className.length; i++) {
					el.classList.add(className[i]);
				}
			} else {
				el.classList.add(className);
			}
		});
		
		return this;
    };

    this.removeClass = (className) => {
        this.each(el => {
			if (Array.isArray(className)) {
				for (let i = 0; i< className.length; i++) {
					el.classList.remove(className[i]);
				}
			} else {
				el.classList.remove(className);
			}
		});
		
		return this;
	};

	this.toggleClass = (className) => {
		if (this.hasClass(className)){
			this.removeClass(className);
		} else {
			this.addClass(className);
		}

		return this;
	};

    this.hasClass = (className) => {
        return this.first(el => {
            return el.classList.contains(className);
        });
    };

    this.remove = () => {
        this.each(function (node) {
            if (node.parentNode) {
                node.parentNode.removeChild(node);
            }
		});
		
		return this;
    };

    this.attr = (name, value, data) => {
        data = data ? 'data-' : '';

        if (value != undefined) {
            this.each(el => {
                if (value) {
                    el.setAttribute(data + name, value);
                }
            });
        } else {
			return this.first().getAttribute(data + name);
		}

        return this;
	};

	this.removeAttr = attr => {
		return this.each(el => {
			if (Array.isArray(el)) {
				el.forEach(attrEl => {
					el.removeAttribute(attrEl);
				});
			} else {
				el.removeAttribute(attr);				
			}
		});
	};

    this.data = (name, value) => {
        return this.attr(name, value, true);
    };

    this.on = (event, cb) => {
        switch(event){
            case "leave": event = "mouseleave"; break;
            case "down": event = "mousedown"; break;
            case "enter": event = "mouseenter"; break;
            case "hover": event = "mouseover"; break;
        }

		this.each(el => {
			el.addEventListener(event, (e) => {
				cb(el, e);
			});
		});

		return this;
    };

    this.hover = (fn) => { return this.on('hover', fn); };
    this.click = (fn) => { return this.on('click', fn); };
    this.enter = (fn) => { return this.on('enter', fn); };
    this.leave = (fn) => { return this.on('leave', fn); };
    this.focus = (fn) => { return this.on('focus', fn); };
    this.blur = (fn) =>{ return this.on('blur', fn); };

    this.off = (event) => {
		if (event != undefined) {
			this.each(el => {
				el.removeEventListener(event);
			});
		} else {
			let oldNode = this.first();
			var newNode = oldNode.cloneNode(true);
			oldNode.parentNode.insertBefore(newNode, oldNode);
			oldNode.parentNode.removeChild(oldNode);
		}

		return this;
    };

    this.html = (str) => {
        if (typeof str != "undefined") {
            this.each(el => {
                el.innerHTML = str;
			});
			
			return this;
        } else {
			return this.first(el => {
				return el.innerHTML;
			});
		}
    };

    this.css = (property, value) => {
        if (typeof property === "object") {
            let keys = Object.keys(property);
			this.each(el => {
                for (let i = 0; i<keys.length; i++) {
                    el.style.setProperty(keys[i], property[keys[i]]);
                }
			});
			
			return this;
        }

        if (typeof property === "string") {
        	if (typeof value === "undefined") {
				let a;
                this.first(el => {
        		    a = el.style[property];
                }); return a;
        	} else if (typeof value === "string"){
            	this.each(function(node) {
            		node.style[property] = value;
				});

				return this;
        	}
        }
	};
	
	this.scrollTo = () => {
		this.first().scrollIntoView({ behavior: 'smooth' }); // Essaie le Scroll adouci si il est disponible

		return this;
	};

    this.val = (value) => { // value: string || boolean
        if (value != undefined) {
            this.each(el => {
                el.value = value;
			});
			
			return this;
        } else {
            let a;
            this.first(el => {
                a = el.value;
            });

            return a;
		}
	};

	this.is = (selector) => {
		return this.filter(selector).length > 0;
	};

	this.filter = (selector) => {

		var callback = (node) => {
			node.matches = node.matches || node.msMatchesSelector || node.webkitMatchesSelector; // Make it compatible with some other browsers

			// Check if it's the same element (or any element if no selector was passed)
			return node.matches(selector || '*');
		}, out = [];

		if (selector instanceof Prizm) {
			return this.first() == selector.first();
		} else if (typeof selector === "function") {
			callback = selector;
		}

		for (var i = 0; i < this.selector.length; i++) {
			if (callback(this.selector[i]) == true) {
				out.push(this.selector[i]);
			}
		}

		return out;
	};

/* 01.1 / DEV
================= */ 

	this.log = () => {
		if (!this.win_doc) {
			if (this.selector.length == 1) {
				console.log(this.selector[0]);
			} else {
				console.log(this.selector);
			}
		} else {
			console.log(this.selector);
		}

		return this;
	};
}

/* 02 / METHODS
=================== */

Prizm.log = (message, state) => { // message: string, state: string (success || error)
	if (typeof message === "string") {
		switch (state){
			case 'error': console.log("%c  • "+message+"    ", "font-family: 'Arial', sans-serif; color: #fff; background-color: #e54e4e; font-size: 1.8em;"); break;
			case 'success': console.log("%c  • "+message+"    ", "font-family: 'Arial', sans-serif; color: #fff; background-color: #37c667; font-size: 1.7em;"); break;
			default: console.log("%c  • "+message+"    ", "font-family: 'Arial', sans-serif; color: #111; background-color: #fff; border-radius: 4px; font-size: 1.7em;"); break;
		}
	} else if (typeof message === "number") {
		switch (state){
			case 'error': console.log("%c  • "+message+"    ", "font-family: 'Arial', sans-serif; color: #fff; background-color: #e54e4e; font-size: 1.8em;"); break;
			case 'success': console.log("%c  • "+message+"    ", "font-family: 'Arial', sans-serif; color: #fff; background-color: #37c667; font-size: 1.7em;"); break;
			default: console.log("%c  • "+message+"    ", "font-family: 'Arial', sans-serif; color: #017a3d; background-color: #abfcc1; border-radius: 4px; font-size: 1.7em;"); break;
		}
	} else {
	  switch (state){
		case 'error': console.error(message); break;
		case 'success': console.log(message); break;
		default:
		
			if (typeof message == "object") {
				if (message instanceof Prizm) {
					message.log();
					return;
				} else if ((typeof message==="object") && (message.nodeType===1) && (typeof message.style === "object") && (typeof message.ownerDocument ==="object")) {
					if (message.length == 1) {
						console.log(message[0]);
					} else {
						console.log(message);
					}
				}
			}

			console.log(message);
		break;
	  }
	}
},

Prizm.ready = cb => { // cb: function
	document.addEventListener('DOMContentLoaded', cb); // Quand la page est chargée, lance le callback "cb()"
};

Prizm.init = ({alias}) => {
	if (typeof alias === "string") {
		window[alias] = Prizm;
	}
};

console.log("%cPRIZM.js", "color: #333; font-size: 30px; padding: 5px 20px; line-height: 50px; background-color: #fff; border-radius: 6px; border: 2px solid rgba(0, 0, 0, .2);");