/**
 * @author Code ni Juan
 * @website https://codeni1.com
 *
 * Thanks to https://fontawesome.com for the icons
 */
var cnjSimpleRichText = function () {
	var self = this;
	self.init = function(args) {

		//load style sheet
		loadStyleSheet();

		var defaultElements = [
			{name: 'bold', type: 'button', innerHTML: '<i class=\'fa fa-bold\'></i>'},
			{name: 'italic', type: 'button', innerHTML: '<i class=\'fa fa-italic\'></i>'},
			{name: 'underline', type: 'button', innerHTML: '<i class=\'fa fa-underline\'></i>'},
			{name: 'strikethrough', type: 'button', innerHTML: '<i class=\'fa fa-strikethrough\'></i>'},
			{name: 'alignleft', type: 'button', innerHTML: '<i class=\'fa fa-align-left\'></i>'},
			{name: 'aligncenter', type: 'button', innerHTML: '<i class=\'fa fa-align-center\'></i>'},
			{name: 'alignright', type: 'button', innerHTML: '<i class=\'fa fa-align-right\'></i>'},
			{name: 'alignjustify', type: 'button', innerHTML: '<i class=\'fa fa-align-justify\'></i>'},
			{name: 'listul', type: 'button', innerHTML: '<i class=\'fa fa-list-ul\'></i>'},
			{name: 'listol', type: 'button', innerHTML: '<i class=\'fa fa-list-ol\'></i>'},
			{name: 'indent', type: 'button', innerHTML: '<i class=\'fa fa-indent\'></i>'},
			{name: 'outdent', type: 'button', innerHTML: '<i class=\'fa fa-outdent\'></i>'},
			{name: 'headings', type: 'select', innerHTML: '', options: ['H1', 'H2', 'H3', 'H4']},
			{name: 'hr', type: 'button', innerHTML: 'HR'},
			{name: 'link', type: 'button', innerHTML: '<i class=\'fa fa-link\'></i>'},
			{name: 'unlink', type: 'button', innerHTML: '<i class=\'fa fa-unlink\'></i>'},
			{name: 'code', type: 'button', innerHTML: '<i class=\'fa fa-code\'></i>'},
			{name: 'fonts', type: 'select', innerHTML: '', options: ['Arial', 'Comic Sans MS', 'Courier', 'Georgia', 'Times New Roman', 'Verdana']},
			{name: 'image', type: 'button', innerHTML: '<i class=\'fa fa-file-image\'></i>'}
		];

		//default 400px if the width is not defined
		var width = typeof args.width === 'undefined' ? '400px' : args.width;

		var iframe = document.createElement('iframe');
		iframe.setAttribute('name', 'cnjIframeRichTextField');
		iframe.setAttribute('width', args.width);
		iframe.style.border = 'solid 1px lightgrey';
		iframe.style.display = 'block';
		iframe.style.margin = '5px 0 0 0';

		//append after the textarea or the args.selector
		iframe.appendAfter(document.getElementById(args.selector));

		//set it editable
		iframe.contentDocument.designMode = 'on';

		//hide the textarea
		document.getElementById(args.selector).style.display = 'none';

		for(var el = 0 in defaultElements) {

			var thisElement;		
			if (el > 0)
				thisElement = element;

			var element = document.createElement(defaultElements[el].type);
			element.innerHTML = defaultElements[el].innerHTML;
			element.setAttribute('type', 'button');
			element.style.margin = '0 5px 0 0';
			element.style.height = '25px';

			if (defaultElements[el].name.indexOf('fonts') !== -1 || defaultElements[el].name.indexOf('headings') !== -1) {
				for(var o = 0 in defaultElements[el].options) {
					// create new option element
					var opt = document.createElement('option');

					// create text node to add to option element (opt)
					opt.appendChild( document.createTextNode(defaultElements[el].options[o]) );

					// set value property of opt
					opt.value = defaultElements[el].options[o]; 

					// add opt to end of select box (sel)
					element.appendChild(opt); 
				}
			}

			if (el > 0) {
				//next button should be appended after to the first button
				element.appendAfter(thisElement);
			} else {
				//first button append before the iframe
				//so it should be in the top left of the iframe
				element.appendBefore(iframe);
			}
		}
	};

	/**
	 * Load stylesheet, thanks to https://fontawesome.com for the icons
	 */
	var loadStyleSheet = function() {
		var stylesheet = document.createElement('link');
		stylesheet.href='https://use.fontawesome.com/releases/v5.8.1/css/all.css?integrity=sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf';
		stylesheet.rel='stylesheet';
		stylesheet.type='text/css';
		(document.head||document.documentElement).appendChild(stylesheet);
	}

	//append element before selected element
	Element.prototype.appendBefore = function (element) {
	    element.parentNode.insertBefore(this, element);
	}, false;
	
	//append element after the selected element
	Element.prototype.appendAfter = function (element) {
	    element.parentNode.insertBefore(this, element.nextSibling);
	}, false;
};
