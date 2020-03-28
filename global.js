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

// zooming in and out using analogs
window.addEventListener( "rightanaloghorizontalpoll", function( e ) {
	let rightValue = e.detail.current;
	let leftValue = e.detail.controller.axes[0];
	let avg = ( rightValue * -1 + leftValue ) / 2;

	if ( rightValue > 0.2 && leftValue < -0.2 ) {
		console.log( avg );
		chrome.runtime.sendMessage( {eventType: "requestzoom", factor: avg} );
	} else if ( rightValue < -0.2 && leftValue > 0.2 ) {
		console.log( avg );
		chrome.runtime.sendMessage( {eventType: "requestzoom", factor: avg} );
	}
} );
