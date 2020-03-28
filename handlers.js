let scrollMultiplier = 10;
let sprintScrollMultiplier = 2.5;
let currentElement = {
	index: 0,
	element: null
};
let holdStatus = {};

function handleRightThumbstick( horizontalAxis, verticalAxis, controller ) {
	if ( verticalAxis > 0.2 || verticalAxis < 0.2 ) {
		let m = controller.buttons[11].pressed ? scrollMultiplier * sprintScrollMultiplier : scrollMultiplier;
		window.scrollBy( 0, verticalAxis * m );
	}
}

function handleLeftThumbstick( horizontalAxis, verticalAxis, controller ) {
	switch( horizontalAxis ) {
		case 1:
			if ( holdStatus.leftThumbstick == "right" ) {
				// console.log( "held right" );
				return;
			}
			// console.log( "pressed right" );
			holdStatus.leftThumbstick = "right";
			currentElement.index++;
			break;
		case -1:
			if ( holdStatus.leftThumbstick == "left" ) {
				// console.log( "held left" );
				return;
			}
			// console.log( "pressed left" );
			holdStatus.leftThumbstick = "left";
			currentElement.index--;
			break;
		default:
			delete holdStatus.leftThumbstick;
			// console.log( "released" );
			return;
	}

	let previous = currentElement.element;
	deAnimateSelector( previous, 5 );
	currentElement.element = document.getElementsByClassName( "style-scope ytd-grid-renderer" )[currentElement.index];
	animateSelector( currentElement.element, 5 );
}
