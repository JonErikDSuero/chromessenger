
chrome.runtime.onMessage.addListener(function(request,sender,sendResponse){
	if(request.method == "setLocalStorage"){
		//localStorage["value1"] = request.value;
		console.log("Recieved message");
		localStorage[request.key]=request.data;
		console.log(localStorage);
		sendResponse(localStorage[request.key]);
	} else {
		sendResponse({});
	}
});

