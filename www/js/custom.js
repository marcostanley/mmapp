$(document).ready(function() {

	var url;

	$('.homepage').on('click', function(e) {

		url = "https://motormoney.org/";

		showHelp(url);

	});

	$('.login').on('click', function(e) {

		url = "https://motormoney.org/user/";

		showHelp(url);

	});

	function showHelp(url) {

	    var target = "_blank";

	    var options = "location=yes,hidden=yes";

	    inAppBrowserRef = window.open(url, target, options);

	    inAppBrowserRef.addEventListener('loadstart', loadStartCallBack);

	    inAppBrowserRef.addEventListener('loadstop', loadStopCallBack);

	    inAppBrowserRef.addEventListener('loaderror', loadErrorCallBack);

	}

	function loadStartCallBack() {

	    $('#loaders').append('<div class="loading">'+
			'<span>Loading</span>'+
			'<div class="loader"></div>'+
			'</div>');

	}

	function loadStopCallBack() {

	    if (inAppBrowserRef != undefined) {

	        inAppBrowserRef.insertCSS({ code: "body{font-size: 25px;}" });

	        $('.loading').remove();

	        inAppBrowserRef.show();
	    }

	}

	function loadErrorCallBack(params) {

	    $('#status-message').text("");

	    var scriptErrorMesssage = '<div class="error-msg"><i class="fa fa-times-circle"></i>\n' + 
	    'Sorry we cannot open that page. Message from the server is : '+ params.message +'</div>';

	    inAppBrowserRef.executeScript({ code: scriptErrorMesssage }, executeScriptCallBack);

	    inAppBrowserRef.close();

	    inAppBrowserRef = undefined;

	}

	function executeScriptCallBack(params) {

	    if (params[0] == null) {

	        $('#loaders').append(
	           '<div class="error-msg"><i class="fa fa-times-circle"></i>\n' + 
	    		'Sorry we cannot open that page. Message from the server is : '+ params.message +'</div>');
	    }

	}

});
