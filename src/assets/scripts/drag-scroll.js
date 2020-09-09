const ele = document.querySelector('.card-carousel')

let pos = {
	// top: 0,
	left: 0,
	x: 0,
	y: 0,
};
const mouseMoveHandler = function (e) {
	// How far the mouse has been moved
	const dx = e.clientX - pos.x;
	// const dy = e.clientY - pos.y;

	// Scroll the element
	// ele.scrollTop = pos.top - dy;
	ele.scrollLeft = pos.left - dx;
};

const mouseUpHandler = function () {
		ele.style.cursor = 'grab';
		ele.style.removeProperty('user-select');
		document.removeEventListener('mousemove', mouseMoveHandler);
		document.removeEventListener('mouseup', mouseUpHandler);
};

const mouseDownHandler = function (e) {
	pos = {
		// The current scroll
		left: ele.scrollLeft,
		// top: ele.scrollTop,
		// Get the current mouse position
		x: e.clientX,
		y: e.clientY,
	};
	ele.style.cursor = 'grabbing';
	ele.style.userSelect = 'none';
	document.addEventListener('mousemove', mouseMoveHandler);
	document.addEventListener('mouseup', mouseUpHandler);
};

window.onresize = function resize() {
	if (ele.scrollWidth > ele.clientWidth) {
	ele.addEventListener('mousedown', mouseDownHandler);
	} else {
	ele.removeEventListener('mousedown', mouseDownHandler)
	ele.style.cursor = 'auto';
	ele.style.userSelect = 'text';
	}
}
