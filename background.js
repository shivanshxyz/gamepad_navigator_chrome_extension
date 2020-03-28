let lastInputs = {};

chrome.runtime.onMessage.addListener( function( message, sender, sendResponse ) {
	let type = message.eventType;

	if ( type === "lefttriggerpoll" ) {
		if ( message.current == 1 && lastInputs.leftTriggerLast != message.current ) {
			moveTabBy( -1 );
		}

		lastInputs.leftTriggerLast = message.current;
		return;
	}

	if ( type === "righttriggerpoll" ) {
		if ( message.current == 1 && lastInputs.rightTriggerLast != message.current ) {
			moveTabBy( 1 );
		}

		lastInputs.rightTriggerLast = message.current;
		return;
	}

	if ( type === "selectbuttonpoll" ) {
		if ( message.current == 1 && lastInputs.selectButtonLast != message.current ) {
			closeCurrentTab();
		}

		lastInputs.selectButtonLast = message.current;
		return;
	}
} );

function moveTabBy( amount ) {
	chrome.tabs.query( {}, function( s ) {
		let activeIndex = -1;

		for( let i = 0; i < s.length; i++ ) {
			if ( s[i].active ) {
				activeIndex = i;
				break;
			}
		}

		if ( activeIndex >= 0 ) {
			chrome.tabs.highlight( { tabs: activeIndex + amount }, function() {} );
		}
	} );
}

function closeCurrentTab() {
	effectCurrent( function( tab, index, id ) {
		chrome.tabs.remove( id, function() {} );
	} );
}

function effectCurrent( func ) {
	chrome.tabs.query( {}, function( s ) {
		let activeIndex = -1;

		for( let i = 0; i < s.length; i++ ) {
			if ( s[i].active ) {
				activeIndex = i;
				break;
			}
		}

		if ( activeIndex >= 0 ) {
			func( s[activeIndex], activeIndex, s[activeIndex].id );
		}
	} );
}
