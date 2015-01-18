
chrome.runtime.onMessage.addListener(function(request,sender,sendResponse){
	if(request.method == "setLocalStorage"){
		//localStorage["value1"] = request.value;
		//console.log("Recieved message");
		sendResponse({data: true});
	} else {
		sendResponse({});
	}
});

