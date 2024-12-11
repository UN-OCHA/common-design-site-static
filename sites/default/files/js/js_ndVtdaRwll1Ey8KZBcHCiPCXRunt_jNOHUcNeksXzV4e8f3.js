/* @license GPL-2.0-or-later https://www.drupal.org/licensing/faq */
var Select=function(){"use strict";function s(e,t){for(var i=0;i<t.length;i++){var s=t[i];s.enumerable=s.enumerable||!1,s.configurable=!0,"value" in s&&(s.writable=!0),Object.defineProperty(e,s.key,s);}}function l(){return (l=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var i=arguments[t];for(var s in i)Object.prototype.hasOwnProperty.call(i,s)&&(e[s]=i[s]);}return e;}).apply(this,arguments);}var a={help:"Utilisez la tabulation (ou les touches flèches) pour naviguer dans la liste des suggestions",placeholder:"Rechercher dans la liste",noResult:"Aucun résultat",results:"{x} suggestion(s) disponibles",deleteItem:"Supprimer {t}",delete:"Supprimer"},i=Element.prototype.matches||Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector,o=Element.prototype.closest;return o||(o=function(e){var t=this;do{if(i.call(t,e))return t;t=t.parentElement||t.parentNode;}while(null!==t&&1===t.nodeType);return null;}),function(){function n(e,t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function");}(this,n),this.el=e,this.label=document.querySelector("label[for=".concat(e.id,"]")),this.id=e.id,this.open=!1,this.multiple=this.el.multiple,this.search="",this.suggestions=[],this.focusIndex=null;var i=l({},t),s=l(a,i.text);delete i.text,this._options=l({text:s,showSelected:!0},i),this._handleFocus=this._handleFocus.bind(this),this._handleInput=this._handleInput.bind(this),this._handleKeyboard=this._handleKeyboard.bind(this),this._handleOpener=this._handleOpener.bind(this),this._handleReset=this._handleReset.bind(this),this._handleSuggestionClick=this._handleSuggestionClick.bind(this),this._positionCursor=this._positionCursor.bind(this),this._removeOption=this._removeOption.bind(this),this._disable(),this.button=this._createButton(),this.liveZone=this._createLiveZone(),this.overlay=this._createOverlay(),this.wrap=this._wrap(),this.multiple&&this._options.showSelected&&(this.selectedList=this._createSelectedList(),this._updateSelectedList(),this.selectedList.addEventListener("click",this._removeOption)),this.button.addEventListener("click",this._handleOpener),this.input.addEventListener("input",this._handleInput),this.input.addEventListener("focus",this._positionCursor,!0),this.list.addEventListener("click",this._handleSuggestionClick),this.wrap.addEventListener("keydown",this._handleKeyboard),document.addEventListener("blur",this._handleFocus,!0),this.el.form&&this.el.form.addEventListener("reset",this._handleReset);}return function(e,t,i){t&&s(e.prototype,t),i&&s(e,i);}(n,[{key:"_createButton",value:function(){var e=document.createElement("button");e.setAttribute("type","button"),e.setAttribute("aria-expanded",this.open),e.className="btn btn-select-a11y";var t=document.createElement("span");if(this.multiple)t.innerText=this.label.innerText;else{var i=this.el.item(this.el.selectedIndex);t.innerText=i.label||i.value,this.label.id||(this.label.id="".concat(this.el.id,"-label")),e.setAttribute("id",this.el.id+"-button"),e.setAttribute("aria-labelledby",this.label.id+" "+e.id);}return e.appendChild(t),e.insertAdjacentHTML("beforeend",'<span class="icon-select" aria-hidden="true"></span>'),e;}},{key:"_createLiveZone",value:function(){var e=document.createElement("p");return e.setAttribute("aria-live","polite"),e.classList.add("sr-only"),e;}},{key:"_createOverlay",value:function(){var e=document.createElement("div");e.classList.add("a11y-container");var t=document.createElement("div");return t.classList.add("a11y-suggestions"),t.id="a11y-".concat(this.id,"-suggestions"),e.innerHTML='\n      <p id="a11y-usage-'.concat(this.id,'-js" class="sr-only">').concat(this._options.text.help,'</p>\n      <label for="a11y-').concat(this.id,'-js" class="sr-only">').concat(this._options.text.placeholder,'</label>\n      <input type="text" id="a11y-').concat(this.id,'-js" class="').concat(this.el.className,'" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="').concat(this._options.text.placeholder,'" aria-describedby="a11y-usage-').concat(this.id,'-js">\n    '),e.appendChild(t),this.list=t,this.input=e.querySelector("input"),e;}},{key:"_createSelectedList",value:function(){var e=document.createElement("ul");return e.className="list-inline list-selected",e;}},{key:"_disable",value:function(){this.el.setAttribute("tabindex",-1);}},{key:"_fillSuggestions",value:function(){var s=this.search.toLowerCase();if(this.suggestions=Array.prototype.map.call(this.el.options,function(e,t){if(-1!==(e.label||e.value).toLowerCase().indexOf(s)){var i=document.createElement("div");return i.setAttribute("role","option"),i.setAttribute("tabindex",0),i.setAttribute("data-index",t),i.classList.add("a11y-suggestion"),e.selected&&i.setAttribute("aria-selected","true"),i.innerText=e.label||e.value,i;}}.bind(this)).filter(Boolean),this.suggestions.length){var t=document.createElement("div");t.setAttribute("role","listbox"),this.multiple&&t.setAttribute("aria-multiselectable","true"),this.suggestions.forEach(function(e){t.appendChild(e);}.bind(this)),this.list.innerHTML="",this.list.appendChild(t);}else this.list.innerHTML='<p class="a11y-no-suggestion">'.concat(this._options.text.noResult,"</p>");this._setLiveZone();}},{key:"_handleOpener",value:function(e){this._toggleOverlay();}},{key:"_handleFocus",value:function(){this.open&&(clearTimeout(this._focusTimeout),this._focusTimeout=setTimeout(function(){if(this.overlay.contains(document.activeElement)||this.button===document.activeElement)if(document.activeElement===this.input)this.focusIndex=null;else{var e=this.suggestions.indexOf(document.activeElement);-1!==e&&(this.focusIndex=e);}else this._toggleOverlay(!1,document.activeElement===document.body);}.bind(this),10));}},{key:"_handleReset",value:function(){clearTimeout(this._resetTimeout),this._resetTimeout=setTimeout(function(){if(this._fillSuggestions(),this.multiple&&this._options.showSelected)this._updateSelectedList();else{if(!this.multiple){var e=this.el.item(this.el.selectedIndex);this._setButtonText(e.label||e.value);}}}.bind(this),10);}},{key:"_handleSuggestionClick",value:function(e){var t=o.call(e.target,'[role="option"]');if(t){var i=parseInt(t.getAttribute("data-index"),10),s=!this.multiple||!e.metaKey;this._toggleSelection(i,s);}}},{key:"_handleInput",value:function(){this.search!==this.input.value&&(this.search=this.input.value,this._fillSuggestions());}},{key:"_handleKeyboard",value:function(e){var t=o.call(e.target,'[role="option"]'),i=o.call(e.target,"input");if(27!==e.keyCode)if(i&&13===e.keyCode)e.preventDefault();else{if(40===e.keyCode)return e.preventDefault(),void this._moveIndex(1);if(t){if(39===e.keyCode)return e.preventDefault(),void this._moveIndex(1);if(37===e.keyCode||38===e.keyCode)return e.preventDefault(),void this._moveIndex(-1);(!this.multiple&&13===e.keyCode||32===e.keyCode)&&(e.preventDefault(),this._toggleSelection(parseInt(t.getAttribute("data-index"),10),!this.multiple)),this.multiple&&13===e.keyCode&&this._toggleOverlay();}}else this._toggleOverlay();}},{key:"_moveIndex",value:function(e){if(null===this.focusIndex)this.focusIndex=0;else{var t=this.focusIndex+e,i=this.suggestions.length-1;this.focusIndex=i<t?0:t<0?i:t;}this.suggestions[this.focusIndex].focus();}},{key:"_positionCursor",value:function(){setTimeout(function(){this.input.selectionStart=this.input.selectionEnd=this.input.value.length;}.bind(this));}},{key:"_removeOption",value:function(e){var t=o.call(e.target,"button");if(t){var i=this.selectedList.querySelectorAll("button"),s=Array.prototype.indexOf.call(i,t)-1,n=parseInt(t.getAttribute("data-index"),10);if(this._toggleSelection(n),this.selectedList.parentElement){var l=this.selectedList.querySelectorAll("button");l[s]?l[s].focus():l[0].focus();}else this.button.focus();}}},{key:"_setButtonText",value:function(e){this.button.firstElementChild.innerText=e;}},{key:"_setLiveZone",value:function(){var e=this.suggestions.length,t="";this.open&&(t=e?this._options.text.results.replace("{x}",e):this._options.text.noResult),this.liveZone.innerText=t;}},{key:"_toggleOverlay",value:function(e,t){this.open=void 0!==e?e:!this.open,this.button.setAttribute("aria-expanded",this.open),this.open?(this._fillSuggestions(),this.button.insertAdjacentElement("afterend",this.overlay),this.input.focus()):this.wrap.contains(this.overlay)&&(this.wrap.removeChild(this.overlay),this.focusIndex=null,this.input.value="",this.search="",this._setLiveZone(),(void 0===e||t)&&setTimeout(function(){this.button.focus();}.bind(this)));}},{key:"_toggleSelection",value:function(e){var t=!(1<arguments.length&&void 0!==arguments[1])||arguments[1],i=this.el.item(e);this.multiple?this.el.item(e).selected=!this.el.item(e).selected:this.el.selectedIndex=e,this.suggestions.forEach(function(e){var t=parseInt(e.getAttribute("data-index"),10);this.el.item(t).selected?e.setAttribute("aria-selected","true"):e.removeAttribute("aria-selected");}.bind(this)),this.multiple?this._options.showSelected&&this._updateSelectedList():this._setButtonText(i.label||i.value),t&&this.open&&this._toggleOverlay(),window.setTimeout(function(e){this.el.dispatchEvent(new CustomEvent("change",{detail:e}));}.bind(this,e),100);}},{key:"_updateSelectedList",value:function(){var e=Array.prototype.map.call(this.el.options,function(e,t){if(e.selected){var i=e.label||e.value;return '\n        <li class="tag-item">\n          <span>'.concat(i,'</span>\n          <button class="tag-item-supp" title="').concat(this._options.text.deleteItem.replace("{t}",i),'" type="button" data-index="').concat(t,'">\n            <span class="sr-only">').concat(this._options.text.delete,'</span>\n            <span class="icon-delete" aria-hidden="true"></span>\n          </button>\n        </li>');}}.bind(this)).filter(Boolean);this.selectedList.innerHTML=e.join(""),e.length?this.selectedList.parentElement||this.wrap.appendChild(this.selectedList):this.selectedList.parentElement&&this.wrap.removeChild(this.selectedList);}},{key:"_wrap",value:function(){var e=document.createElement("div");e.classList.add("select-a11y"),this.el.parentElement.appendChild(e);var t=document.createElement("div");return t.classList.add("tag-hidden"),t.setAttribute("aria-hidden",!0),this.multiple&&t.appendChild(this.label),t.appendChild(this.el),e.appendChild(t),e.appendChild(this.liveZone),e.appendChild(this.button),e;}}]),n;}();}();;
(function($,Drupal){'use strict';Drupal.behaviors.selectA11yFacet={attach:function(context,settings){window.setTimeout(function(context,settings){once('facets-dropdown-select-a11y','select.js-facets-select-a11ywidget',context).forEach(function(element){$(element).on('change',function(e){var url=element.options[e.detail].value;window.location=url;});var id=$(element).data('drupal-facet-id');if(settings.facets.dropdown_widget[id]['show-only-one-result'])element.removeAttribute('multiple');new Select(element,{text:{help:Drupal.t('Navigate the list to find what you are looking for'),placeholder:settings.facets.dropdown_widget[id]['facet-default-option-label']||Drupal.t('Choose'),noResult:Drupal.t('Nothing found'),results:Drupal.t('{x} suggestion(s) found'),deleteItem:Drupal.t('Remove {t}'),delete:Drupal.t('Remove')}});});}.bind(this,context,settings),200);}};})(jQuery,Drupal);;
