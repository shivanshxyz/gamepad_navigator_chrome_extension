//	Contains all features that are not site-specific.

let scrollMultiplier = 13;
let scrollSprintMultiplier = 2;

// Scrolling
window.addEventListener( "rightanalogverticalpoll", function( e ) {
	let val = e.detail.current;
	if ( val < 0.15 && val > -0.15 ) {
		return;
	}

	let m = e.detail.controller.buttons[11].pressed ? scrollMultiplier * scrollSprintMultiplier : scrollMultiplier;
	window.scrollBy( 0, val * m );
} );

// browsing backward
window.addEventListener( "leftbumperpressed", function() {
	window.history.back();
} );

// browsing forward
window.addEventListener( "rightbumperpressed", function() {
	window.history.forward();
} );

window.addEventListener( "startbuttonpressed", function() {
	chrome.runtime.sendMessage( { eventType: "newtabrequested" }  );
} );

window.addEventListener( "selectbuttonpressed", function() {
	chrome.runtime.sendMessage( { eventType: "closecurrenttabrequested" }  );
} );
