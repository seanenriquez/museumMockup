/* src/app.js */

// Styles
import 'styles/_app.scss';

// Libraries
// import 'bootstrap';
import 'slick-carousel';

// Scripts
$(document).ready(() => {
	console.log('Frontend Boilerplate is ready!');
	require('scripts/nav');
	require('scripts/carousel');
	require('scripts/splashBackgroundAnime');
	require('scripts/googlemap.js');
	require('scripts/drag-scroll.js')
});
