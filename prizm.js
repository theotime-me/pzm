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
        return Prizm.ready(q);
    } else if (Array.isArray(q)) {
        return Prizm(Prizm.toNodeList(q));
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
				ctx = ctx[0];
			}

			if (typeof ctx === "string") {
				ctx = document.querySelector(ctx);
			}

			if (ctx && ((ctx.querySelector && ctx.charset && ctx.cookie) || (ctx.document && ctx.location && ctx.alert && ctx.setInterval))) {
				ctx = undefined;
			}

			if (q && ((q.querySelector && q.charset && q.cookie) || (q.document && q.location && q.alert && q.setInterval))) {
				this.selector = [q];
				this.win_doc = true;
			} else {
				this.selector = (ctx || document).querySelectorAll(q);
				this.win_doc = false;
			}
        }
    } else {
        return false;
	}

this.selector.forEach((el, index) => {
	this[index] = el;
});

/* 01 / DOM
===============

- each
- first
- last

- append
- prepend
- html
- after
- before

- addClass
- removeClass
- toggleClass
- hasClass

- attr
- removeAttr
- data
- prop

- on
- off
- hover
- click
- enter
- leave

- focus
- blur

- is
- filter

- show
- hide

- css
- scrollTo
- remove
- val
- log

- log
- toNodeList
- isElement
- parse
- ready
- info

*/

/**
 * @param {function} id Node to retrieve
 */

this.getNode = id =>{
	if (this.selector[id]) {
		return this.selector[id];
	}
};

/**
 * @param {function} cb Will be call for each HTML element
 */

this.each = cb =>{
	this.selector.forEach(el => {
        return cb.call(Prizm(el), Prizm(el));
	});
};

/**
 * @param {function} cb called with the first node
 */

this.first = cb =>{
	if (cb) {
		return cb(Prizm(this[0]));
	}

    return Prizm(this[0]);
};

/**
 * @param {function} cb called with the last node
 */
	
this.last = cb =>{
	if (cb) {
		return cb(Prizm(this.selector[this.selector.length -1]));
	}

	return Prizm(this.selector[this.selector.length -1]);
};

/**
 * @param {function} cb called with the parent node
 */

this.parent = cb =>{
	if (cb) {
		return cb(Prizm(this[0].parentElement));
	}

	return Prizm(this[0].parentElement);
};

/**
 * @param {function} selector to find a node which is a child from the original selector
 */

this.find = selector =>{
	if (data instanceof Prizm) data = data[0];

	if (Prizm.isElement(selector)) {
		return Prizm(selector.cloneNode(true));
	} else {
		return Prizm(selector, this);
	}
};

/**
 * @param {string} data Append html to node(s)
 */

this.append = data => {
	if (data instanceof Prizm) data = data[0];

	this.each(el => {
		if (Prizm.isElement(data)) {
			el[0].appendChild(data.cloneNode(true));
		} else {
			el[0].innerHTML += data;
		}
	});
};

/**
 * @param {string} data Prepend html to node(s)
 */

this.prepend = data => {
	if (data instanceof Prizm) data = data[0];

	this.each(el => {
		if (Prizm.isElement(data)) {
			el[0].insertBefore(data.cloneNode(true), el[0].firstChild);
		} else {
			el[0].innerHTML = data+el.innerHTML;
		}
	});
};

/**
 * @param {string} data Fill node(s) with a string or a DOM element
 */

this.html = data => {
	if (data instanceof Prizm) data = data[0].cloneNode(true);

	if (typeof data === "function") {
		this.each(el => {
			el[0].innerHTML = data(el.innerHTML);
		});

		return this;
	} else if (Prizm.isElement(data)) {
		this.each(el => {
			el.html("");
			el.append(data);
		});
	} else if (typeof data != "undefined") {
		this.each(el => {
			el[0].innerHTML = data;
		});

		return this;
	} else {
		return this.getNode(0).innerHTML;
	}
};

/**
 * @param {string} after Insert html after node(s)
 */

this.after = data => {
	if (data instanceof Prizm) data = data[0];

	if (Prizm.isElement(data)) {
		this.each(el => {
			el[0].insertAdjacentElement('afterend', data.cloneNode(true));
		});
	} else {
		this.each(el => {
			el[0].insertAdjacentElement('afterend', Prizm.parse(data));
		});
	}

	return this;
};

 /**
 * @param {string} before Insert before after node(s)
 */

this.before = data => {
	if (data instanceof Prizm) data = data[0];

	if (Prizm.isElement(data)) {
		this.each(el => {
			el[0].insertAdjacentElement('beforebegin', data.cloneNode(true));
		});
	} else {
		this.each(el => {
			el[0].insertAdjacentElement('beforebegin', Prizm.parse(data));
		});
	}

	return this;
};

this.addClass = (className) => {
	this.each(el => {
		if (Array.isArray(className)) {
			for (let i = 0; i< className.length; i++) {
				el[0].classList.add(className[i]);
			}
		} else {
			el[0].classList.add(className);
		}
	});
	
	return this;
};

this.removeClass = (className) => {
	this.each(el => {
		if (Array.isArray(className)) {
			for (let i = 0; i< className.length; i++) {
				el[0].classList.remove(className[i]);
			}
		} else {
			el[0].classList.remove(className);
		}
	});
	
	return this;
};

this.toggleClass = (className) => {
	if (Array.isArray(className)) {
		className.forEach(el => {
			if (this.hasClass(el)){
				this.removeClass(el);
			} else {
				this.addClass(el);
			}
		});
	} else {
		if (this.hasClass(className)){
			this.removeClass(className);
		} else {
			this.addClass(className);
		}
	}

	return this;
};

this.hasClass = (className) => {
	let hasClass = false;

	this.each(el => {
		if (el[0].classList.contains(className)) hasClass = true;
	});

	return hasClass;
};

this.attr = (name, value, data) => {
	data = data ? 'data-' : '';

	if (typeof value === "function") {
		this.each(el => {
			el[0].setAttribute(data+name, value(el.innerHTML));
		});
	} else if (value != undefined) {
		this.each(el => {
			if (value) {
				el[0].setAttribute(data + name, value);
			}
		});
	} else {
		return this[0].getAttribute(data + name);
	}

	return this;
};

this.removeAttr = attr => {
	this.each(el => {
		if (Array.isArray(el)) {
			el[0].forEach(attrEl => {
				el[0].removeAttribute(attrEl);
			});
		} else {
			el[0].removeAttribute(attr);				
		}
	});

	return this;
};

this.data = (name, value) => {
	return this.attr(name, value, true);
};

this.prop = (prop, value) => {
	if (value != undefined) {
		this.each(el => {
			el[0][prop] = value;
		});

		return this;
	}

	return this.getNode(0)[prop];
};

this.on = function(_event, cb, preventDefault) {
	let events = [];

	if (typeof _event === "string") {
		events = _event.split(" ");
	} else if (Array.isArray(_event)) {
		events = _event;
	}

	events.forEach(event => {
		switch(event){
			case "leave": event = "mouseleave"; break;
			case "down": event = "mousedown"; break;
			case "enter": event = "mouseenter"; break;
			case "hover": event = "mouseover"; break;
		}
	
		(this.win_doc ? this.first : this.each)(el => {
			if (preventDefault) {
				el.[0].addEventListener(event, e => { e.preventDefault(); cb.call(el, e); });
			} else {
				el.[0].addEventListener(event, e => cb.call(el, e));
			}
		});
	});

	return this;
};

this.handle = (event, cb) => {
	this.on(event, cb, true);
};

this.off = event => {
	if (event != undefined) {
		this.each(el => {
			el[0].removeEventListener(event);
		});
	} else {
		let oldNode = this[0];
		var newNode = oldNode.cloneNode(true);
		oldNode.parentNode.insertBefore(newNode, oldNode);
		oldNode.parentNode.removeChild(oldNode);
	}

	return this;
};

this.hover = fn => typeof fn === "function" ? this.on('hover', fn) : this.trigger("hover");
this.click = fn => typeof fn === "function" ? this.on('click', fn) : this.trigger("click");
this.enter = fn => typeof fn === "function" ? this.on('enter', fn) : this.trigger("enter");
this.leave = fn => typeof fn === "function" ? this.on('leave', fn) : this.trigger("leave");
this.focus = fn => typeof fn === "function" ? this.on('focus', fn) : this.trigger("focus");
this.blur  = fn => typeof fn === "function" ? this.on('blur', fn)  : this.trigger("blur");

this.trigger = eventName => {
	this.each(el => {
		let event = document.createEvent('HTMLEvents');
			event.initEvent(eventName, true, false);

		el[0].dispatchEvent(event);
	});
};

this.is = selector => {
	return this.filter(selector).length > 0;
};

this.filter = selector => {

	var callback = (node) => {
		node.matches = node.matches || node.msMatchesSelector || node.webkitMatchesSelector; // Make it compatible with some other browsers

		switch (typeof selector) {
			case "function": return selector(node); // Check if it's the same element (or any element if no selector was passed)
			case "string": return node.matches(selector || '*');
			default:
				if (Prizm.isElement(selector)) {
					return this.getNode(0) === selector;
				} else if (selector instanceof Prizm) {
					return this.getNode(0) === selector[0];
				}
		}
	}, out = [];

	for (var i = 0; i < this.selector.length; i++) {
		if (callback(this.selector[i]) == true) {
			out.push(this.selector[i]);
		}
	}

	return out;
};

this.show = function(data, cb) {
	let time = 0,
		unit = "ms";

	if (( typeof data == "number" && !isNaN(parseFloat(data)) )) {
		time = data;
	} else if (typeof data == "string" && ["ms", "s"].includes(data.replace(/\d|\./g, ""))) {
		time = parseFloat(data.replace(/[A-z]/g, ""));
		unit = data.replace(/\d|\./g, "")[0];
	}

	this.each(el => {
		el.css({
			transition: "opacity "+time+unit+" ease",
			display: "",
			opacity: "0",
		});
	});

	let t = this;

	setTimeout(function() {
		t.css({
			opacity: "1",
		});
	}, 10);

	setTimeout(function() {
		if (cb) cb.apply(this);
	}, unit == "ms" ? time : time * 1000);

	return this;
};

this.hide = function(data, cb) {
	let time = 0,
		unit = "ms";

	if (( typeof data == "number" && !isNaN(parseFloat(data)) )) {
		time = data;
	} else if (typeof data == "string" && ["ms", "s"].includes(data.replace(/\d|\./g, ""))) {
		time = parseFloat(data.replace(/[A-z]/g, ""));
		unit = data.replace(/\d|\./g, "")[0];
	}

	if (time != 0) {
		this.css({
			transition: "opacity "+time+unit+" ease",
			opacity: "0",
		});
	}

	let _this = this;

	setTimeout(function() {
		_this.css({
			display: "none",
			transition: "",
			opacity: ""
		});

		if (cb) cb.apply(this);
	}, unit == "ms" ? time : time * 1000);

	return this;
};

    this.remove = () => {
        this.each(el => {
            if (el[0].parentNode) {
                el[0].parentNode.removeChild(el[0]);
            }
		});
		
		return this;
    };

    this.css = (property, value) => {
        if (typeof property === "object") {
            let keys = Object.keys(property);
			this.each(el => {
                for (let i = 0; i<keys.length; i++) {
					if (property[keys[i]] == "") {
						el[0].style.removeProperty(keys[i]);
					} else {
						el[0].style.setProperty(keys[i], property[keys[i]]);
					}
                }
			});
			
			return this;
        }

        if (typeof property === "string") {
        	if (typeof value === "undefined") {
                return this[0].style[property];
        	} else if (typeof value === "string"){
            	this.each(node => {
            		node[0].style[property] = value;
				});

				return this;
        	}
        }
	};
	
	this.scrollTo = () => {
		this.getNode(0).scrollIntoView({ behavior: 'smooth' }); // Essaie le Scroll adouci si il est disponible

		return this;
	};

    this.val = value => { // value: string || boolean
        if (value != undefined) {
            this.each(el => {
                el[0].value = value;
			});
			
			return this;
        } else {
            return this[0].value;
		}
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
				} else if (Prizm.isElement(message)) {
					if (message.length == 1) {
						console.log(message[0]);
					} else {
						console.log(message);
					}
				}
			} else {
				console.log(message);
			}

		break;
	  }
	}
};

Prizm.toNodeList = function(arrayOfNodes){
	let fragment = document.createDocumentFragment();
	arrayOfNodes.forEach(function(item){
	  fragment.appendChild(item.cloneNode());
	});

	return fragment.childNodes;
};

Prizm.isElement = function(obj) {
	try {
	  //Using W3 DOM2 (works for FF, Opera and Chrome)
	  return obj instanceof HTMLElement;
	}
	catch(e){
	  //Browsers not supporting W3 DOM2 don't have HTMLElement and
	  //an exception is thrown and we end up here. Testing some
	  //properties that all elements have (works on IE7)
	  return (typeof obj==="object") &&
		(obj.nodeType===1) && (typeof obj.style === "object") &&
		(typeof obj.ownerDocument ==="object");
	}
};

Prizm.parse = function(str) {
	let a = document.createElement("div");
		a.innerHTML = str;

	return a.firstChild;
};

Prizm.createNode = name => {
	return document.createElement(name);
};

Prizm.ready = cb => { // cb: function
	document.addEventListener('DOMContentLoaded', cb.call(this)); // Quand la page est chargée, lance le callback "cb()"

	return cb;
};

Prizm.info = () => {
	return {
		packages: Prizm.packages || [],
		alias: Prizm.alias
	};
};

Prizm.config = () => {
	return "http://pzm.rf.gd/c/"+Prizm.alias+"/"+Prizm.packages.join("|");
};

if (window.pzm == undefined) window.pzm = {};

console.log("%cPRIZM.js", "color: #333; font-size: 30px; padding: 5px 20px; line-height: 50px; background-color: #fff; border-radius: 6px; border: 2px solid rgba(0, 0, 0, .2);");
