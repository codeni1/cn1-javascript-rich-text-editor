/**
 * @author Code ni Juan
 * @website https://codeni1.com
 * @version 0.1
 * @year april 2019
 *
 * Thanks to https://fontawesome.com for the icons
 */
var CN1SimpleRichText = new (function () {
	var self = this;
	var contentEditable;

	/**
	 * Initialise editor
	 * 
	 * @param  {[type]} args [description]
	 * @return {[type]}      [description]
	 */
	self.init = function(args) {

		//load style sheet
		loadStyleSheet();

		var defaultElements = [
			{command: 'bold', type: 'button', innerHTML: '<i class=\'fa fa-bold\'></i>'},
			{command: 'italic', type: 'button', innerHTML: '<i class=\'fa fa-italic\'></i>'},
			{command: 'underline', type: 'button', innerHTML: '<i class=\'fa fa-underline\'></i>'},
			{command: 'strikeThrough', type: 'button', innerHTML: '<i class=\'fa fa-strikethrough\'></i>'},
			{command: 'justifyLeft', type: 'button', innerHTML: '<i class=\'fa fa-align-left\'></i>'},
			{command: 'justifyCenter', type: 'button', innerHTML: '<i class=\'fa fa-align-center\'></i>'},
			{command: 'justifyRight', type: 'button', innerHTML: '<i class=\'fa fa-align-right\'></i>'},
			{command: 'justifyFull', type: 'button', innerHTML: '<i class=\'fa fa-align-justify\'></i>'},
			{command: 'insertUnorderedList', type: 'button', innerHTML: '<i class=\'fa fa-list-ul\'></i>'},
			{command: 'insertOrderedList', type: 'button', innerHTML: '<i class=\'fa fa-list-ol\'></i>'},
			{command: 'indent', type: 'button', innerHTML: '<i class=\'fa fa-indent\'></i>'},
			{command: 'outdent', type: 'button', innerHTML: '<i class=\'fa fa-outdent\'></i>'},
			{command: 'formatBlock', type: 'select', innerHTML: '', options: ['H1', 'H2', 'H3', 'H4', 'blockquote']},
			{command: 'insertHorizontalRule', type: 'button', innerHTML: 'HR'},
			{command: 'createLink', type: 'button', innerHTML: '<i class=\'fa fa-link\'></i>'},
			{command: 'unlink', type: 'button', innerHTML: '<i class=\'fa fa-unlink\'></i>'},
			{command: 'fontName', type: 'select', innerHTML: '', options: ['Arial', 'Comic Sans MS', 'Courier', 'Georgia', 'Times New Roman', 'Verdana']},
			{command: 'fontSize', type: 'select', innerHTML: '', options: [1, 2, 3, 4, 5, 6, 7]},
			{command: 'insertImage', type: 'button', innerHTML: '<i class=\'fa fa-file-image\'></i>'},
			{command: 'viewSourceCode', type: 'button', innerHTML: '<i class=\'fa fa-code\'></i>'},
			{command: 'removeFormat', type: 'button', innerHTML: 'Clear'},
		];

		//add detection if browser support HTML5
		//if not disable color selection
		//this will not work if browser does not support html
		//also detect if IE or not, only add if not IE
		var ua = window.navigator.userAgent;
	    var isIE = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
	    if (!isIE && typeof args.color !== 'undefined' && args.color == true) {
			defaultElements.push(
				{command: 'foreColor', label: 'Fore Color: ', type: 'INPUT', innerHTML: ''},
				{command: 'hiliteColor', label: 'Background Color: ', type: 'INPUT', innerHTML: ''}
			);
		}
	
		//default 400px if the width is not defined
		var width = typeof args.width === 'undefined' ? '400px' : args.width;
		var height = typeof args.height === 'undefined' ? '300px' : args.height;

		var container = document.createElement('div');
		container.setAttribute('id', 'cn1RTFContainer');
		container.appendAfter(document.getElementById(args.selector));

		contentEditable = document.createElement('iframe');
		contentEditable.setAttribute('name', 'cn1ContentRichTextField');
		contentEditable.setAttribute('id', 'cn1ContentRichTextField');
		contentEditable.style.width = '100%';
		contentEditable.style.minWidth = width;
		contentEditable.style.minHeight = height;
		contentEditable.style.border = 'solid 1px lightgrey';
	
		contentEditable.style.display = 'block';
		contentEditable.style.margin = '5px 0 0 0';

		//append after the textarea or the args.selector
		container.appendChild(contentEditable);

		//hide the textarea
		document.getElementById(args.selector).style.display = 'none';

		for(var el = 0 in defaultElements) {

			var thisElement;		
			if (el > 0)
				thisElement = element;

			var element = document.createElement(defaultElements[el].type);
			if (isThisElement(defaultElements[el], 'foreColor') || isThisElement(defaultElements[el], 'hiliteColor')) { 
				//special type just for color
				//and only works on html 5
				element.setAttribute('type', 'color');
			} else {
				element.setAttribute('type', defaultElements[el].type);
			}

			element.setAttribute('title', defaultElements[el].command);
			element.innerHTML = defaultElements[el].innerHTML;
			element.style.margin = '0 5px 0 0';
			element.style.height = '25px';

			var command;
			var argument = null;

			if (defaultElements[el].type.indexOf('button') !== -1) {

				var showCode = false
				var isPrompt = false;

				element.onclick = function () {
					command = this.getAttribute('title');
					if (command == 'viewSourceCode') {
						showCode = execViewSourceCommand(element, contentEditable, showCode);
					} else {
						switch (command) {
							case 'insertImage':
								argument = prompt('Enter your URL: ');
								isPrompt = true;
								break;
							case 'createLink':
								argument = prompt('Enter image your URL: ');
								isPrompt = true;
								break;
						}

						if ((argument !== null && isPrompt) || !isPrompt)
							cn1ContentRichTextField.document.execCommand(command, false, argument);
					}
			
				};
			} else {

				//check if fonts or headings since those are droplists box
				if (isThisElement(defaultElements[el], 'fontName')
					|| isThisElement(defaultElements[el], 'fontSize')
					|| isThisElement(defaultElements[el], 'formatBlock')) {

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

				element.onchange = function () {
					command = this.getAttribute('title');
					cn1ContentRichTextField.document.execCommand(command, false, this.value);
				};

			}

			if (el > 0) {

				//next button should be appended after to the first button
				element.appendAfter(thisElement);

				if (isThisElement(defaultElements[el], 'foreColor')
				|| isThisElement(defaultElements[el], 'hiliteColor')) { 

					//adding 'Fore Color' and 'Background Color' label text before the element color
					var lbl = document.createElement("label");
					lbl.innerHTML = defaultElements[el].label;
					lbl.appendBefore(element);
				}
	
			} else {
				//first button append before the iframe
				//so it should be in the top left of the iframe
				element.appendBefore(contentEditable);
			}
		}

		//this two are added for Firefox
		contentEditable.contentWindow.document.open();
		// optionally write content here
		contentEditable.contentWindow.document.close();

		//set it editable
		contentEditable.contentDocument.designMode = "on";

    	var body = contentEditable.contentWindow.document.querySelector('body');
        body.style.fontSize = '15px';

        //load data from your database via your textarea
		loadData(contentEditable, document.getElementById(args.selector).textContent, args);

		//event on input load
    	loadEvent(contentEditable, args);
	};


	/**
	 * View source command
	 * 
	 * @param  {[type]} element         [description]
	 * @param  {[type]} contentEditable [description]
	 * @param  {[type]} showCode        [description]
	 * @return {[type]}                 [description]
	 */
	function execViewSourceCommand(element, contentEditable, showCode) {
		if (!showCode) {
			contentEditable.contentDocument.getElementsByTagName('body')[0].textContent = contentEditable.contentDocument.getElementsByTagName('body')[0].innerHTML;
			showCode = true;
		} else {
			contentEditable.contentDocument.getElementsByTagName('body')[0].innerHTML = contentEditable.contentDocument.getElementsByTagName('body')[0].textContent;
			showCode = false;
		}

		return showCode;
	}

	/**
	 * event on input load
	 * 
	 * @param  {[type]} contentEditable [description]
	 * @param  {[type]} args            [description]
	 * @return {[type]}                 [description]
	 */
	function loadEvent(contentEditable, args) {
		//this will get value from the edit content element or iframe
        contentEditable.contentWindow.document.querySelector('body').oninput = function(k) {
        	document.getElementById(args.selector).innerHTML = contentEditable.contentDocument.getElementsByTagName('body')[0].innerHTML;
        }
	}


	/**
	 * This will load data from textarea
	 * 
	 * @param  {[type]} contentEditable [description]
	 * @param  {[type]} data            [description]
	 * @return {[type]}                 [description]
	 */
	function loadData(contentEditable, data) {
  		 contentEditable.contentWindow.document.open();
         contentEditable.contentWindow.document.write('<html><body>'+data+'</body></html>');
         contentEditable.contentWindow.document.close();
	}


	self.setContent = function(content) {
		//to be continued
	}

	/**
	 * element checking
	 * 
	 * @param  {[type]}  defaultElements [description]
	 * @param  {[type]}  v               [description]
	 * @return {Boolean}                 [description]
	 */
	function isThisElement(defaultElements, v) {
		return defaultElements.command.indexOf(v) !== -1;
	}

	/**
	 * Load stylesheet, thanks to https://fontawesome.com for the icons
	 * 
	 * @return {[type]} [description]
	 */
	var loadStyleSheet = function() {
		var stylesheet = document.createElement('link');
		stylesheet.href='https://use.fontawesome.com/releases/v5.8.1/css/all.css?integrity=sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf';
		stylesheet.rel='stylesheet';
		stylesheet.type='text/css';
		(document.head||document.documentElement).appendChild(stylesheet);
	}

	/**
	 * append element before selected element
	 * 
	 * @param  {[type]} element [description]
	 * @return {[type]}         [description]
	 */
	Element.prototype.appendBefore = function (element) {
	    element.parentNode.insertBefore(this, element);
	}, false;
	
	/**
	 * append element after the selected element
	 * 
	 * @param  {[type]} element [description]
	 * @return {[type]}         [description]
	 */
	Element.prototype.appendAfter = function (element) {
	    element.parentNode.insertBefore(this, element.nextSibling);
	}, false;
});