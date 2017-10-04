$(document).ready(function() {

	var url;

	$('.homepage').click(function(e) {

		url = "https://motormoney.org/";
		// var ref = window.open('https://motormoney.org/', '_blank', 'location=yes');
		// ref.addEventListener('loadstart', loadstartCallback);
		// ref.addEventListener('loadstop', loadstopCallback);
		// ref.addEventListener('loadloaderror', loaderrorCallback);
		// ref.addEventListener('exit', exitCallback);

		// function loadstartCallback(event) {
		//   console.log('Loading started: '  + event.url)
		// }

		// function loadstopCallback(event) {
		//   console.log('Loading finished: ' + event.url)
		// }

		// function loaderrorCallback(error) {
		//   console.log('Loading error: ' + error.message)
		// }

		// function exitCallback() {
		//   console.log('Browser is closed...')
		// }

		showHelp(url);

	});

	$('.login').click(function(e) {

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
