document.addEventListener('DOMContentLoaded', function () {
  CME_messenger.update();
  CME_body.setup();
});

chrome.runtime.onMessage.addListener(function(request,sender,sendResponse){
	if(request.method == "setLocalStorage"){
		//localStorage["value1"] = request.value;
		sendResponse({data: true});
	} else {
		sendResponse({});
	}
});

