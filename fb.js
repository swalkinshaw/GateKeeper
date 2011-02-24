var liked;
var unliked;

var tabLoaded = function () {
	if (document.getElementsByClassName('fb_protected_wrapper').length > 0) {
		chrome.extension.sendRequest({}, function(response) {});
		removeGate(document.getElementsByClassName('fb_protected_wrapper')[0]);
	} else {
		setTimeout(tabLoaded, 100);
	}
};

tabLoaded();

function removeGate(node) {
	var screens = node.childNodes[0].childNodes;
	liked = screens[0];
	unliked = screens[1];
	toggle(liked, unliked);
}

function toggle(liked, unliked) {
	var tmp = liked.style.visibility;
	liked.style.visibility = unliked.style.visibility;
    unliked.style.visibility = tmp;
}

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
	if (request.action == "toggle") {
		toggle(liked, unliked);
		sendResponse({status: "toggled"});
	} else {
		sendResponse({});
	}
});
