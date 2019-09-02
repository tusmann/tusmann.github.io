import {parseArticle} from "./article-parser"
import {addArticle} from "./addArticle.js"
import {addSpecialArticle} from "./addArticle.js"
import {articlesSidebarSelection} from "./articlesSelectionButtons"
import {specialArticleSidebarSelection} from "./articlesSelectionButtons"

// polyfill needed for using for loop on a dictionary
  /*
 * Object.prototype.forEach() polyfill
 * https://gomakethings.com/looping-through-objects-with-es6/
 * @author Chris Ferdinandi
 * @license MIT
 */
if (!Object.prototype.forEach) {
	Object.defineProperty(Object.prototype, 'forEach', {
		value: function (callback, thisArg) {
			if (this == null) {
				throw new TypeError('Not an object');
			}
			thisArg = thisArg || window;
			for (var key in this) {
				if (this.hasOwnProperty(key)) {
					callback.call(thisArg, this[key], key, this);
				}
			}
		}
	});
}

//creation of article, buttons and links
articlesSidebarSelection()
specialArticleSidebarSelection("EUR-Lex", "./articles/EUDirective/L125-75.html", "./articles/EUDirective/EUDirectiveItalian.html")

//const readerActivation = document.querySelector('.reader-activator');
//readerActivation.addEventListener('click', addArticle);

//selezione stili
//funzione stile 1
document.querySelector('.style-selector-first').onclick = function () { 
    document.querySelector("link.secondSheet").href = './styles/first/first.css';
};

document.querySelector('.style-selector-second').onclick = function () { 
    document.querySelector("link.secondSheet").href = './styles/second/second.css';
};

document.querySelector('.style-selector-third').onclick = function () { 
    document.querySelector("link.secondSheet").href = './styles/third.css';
};

document.querySelector('.style-selector-fourth').onclick = function () { 
    document.querySelector("link.secondSheet").href = './styles/fourth.css';
};

document.querySelector('.style-selector-fifth').onclick = function () { 
    document.querySelector("link.secondSheet").href = './styles/fifth.css';
};

document.querySelector('.style-selector-sixth').onclick = function () { 
    document.querySelector("link.secondSheet").href = './styles/sixth.css';
};

// Script lista documenti
/* docs selection script: quando clicchi l'elemento con classe .doc-sel ti rivela togliendo 'hidden' la nav-list, 
dove è contenuta la lista documenti. */

function docsList() {
    document.querySelector(".nav-list").className = document.querySelector(".nav-list").className.replace(/(?:^|\s)hidden(?!\S)/g, '');
}

const docsSelection = document.querySelectorAll('.doc-sel');
docsSelection.forEach(node => {
    node.addEventListener('click', docsList);
}) 

// Script chiusura lista documenti
/*stessa cosa di sopra ma nasconde i documenti quando si richiude la sidebar*/
function closeDocs() {
    var v = document.querySelector(".nav-list"); 
    v.classList.add("hidden"); 
}

const docsHidden = document.querySelector('.doc-close');
docsHidden.addEventListener('click', closeDocs);

/*stessa cosa di sopra ma si attiva quando clicchi un documento */
const docsHiddenFromMenu = document.querySelectorAll('.close-menu-doc');
docsHiddenFromMenu.forEach(node => {
    node.addEventListener('click', closeDocs);
})

/* sidebar drawer script */
const mainElement = document.querySelector('.container');
const openMenu = document.querySelectorAll('.opened-doc-list');
const closeMenu = document.querySelector('.close-menu');
const closeDocMenu = document.querySelectorAll('.close-menu-doc');
const toggleNavBar = () => {
    mainElement.classList.toggle('opened-nav');
};
        
openMenu.forEach(node => {
    node.addEventListener('click', toggleNavBar, false);
}) 


closeMenu.addEventListener('click', toggleNavBar, false);

closeDocMenu.forEach(node => {
    node.addEventListener('click', toggleNavBar, false);
}) 
