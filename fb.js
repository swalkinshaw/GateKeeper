var liked;
var unliked;

var interval = setInterval(function () {
	if (document.getElementsByClassName('fb_protected_wrapper').length > 0) {
		clearInterval(interval);
		chrome.extension.sendRequest({}, function(response) {});
		removeGate(document.getElementsByClassName('fb_protected_wrapper')[0]);
	}
}, 200);

function removeGate(node) {
	var screens = node.childNodes[0].childNodes;
	liked = screens[0];
	unliked = screens[1];
	toggle(liked, unliked);
}

function toggle(liked, unliked) {
	if (unliked.style.visibility === 'visible') {
		unliked.style.visibility = 'hidden';
		liked.style.visibility = 'visible';
	} else {
		liked.style.visibility = 'hidden';
		unliked.style.visibility = 'visible';
	}
}

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
	if (request.action == "toggle") {
		toggle(liked, unliked);
		sendResponse({status: "toggled"});
	} else {
		sendResponse({});
	}
});
