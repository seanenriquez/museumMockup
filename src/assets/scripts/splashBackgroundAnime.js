import anime from 'animejs/lib/anime';
// import * as SVG from '../svg/splash_bg.svg';

const svg = document.querySelector('.splash_bg');
const line = svg.querySelector('path');
const spacing = 80
const numberOfLines = Math.ceil(window.innerWidth / 80)

function animateLine(lineClone, CV) {
	const dValue = [{
		value: [
			`M ${CV.top.PX}, ${CV.top.PY} C ${CV.top.CX}, ${CV.top.CY}, ${CV.bottom.CX}, ${CV.bottom.CY}, ${CV.bottom.PX}, ${CV.bottom.PY}`,
			`M ${CV.top.PX}, ${CV.top.PY} C ${CV.top.CX + 1000}, ${CV.top.CY + 500}, ${CV.bottom.CX - 1000}, ${CV.bottom.CY + 400}, ${CV.bottom.PX}, ${CV.bottom.PY}`,
		],
	},
	{
		value: `M ${CV.top.PX}, ${CV.top.PY} C ${CV.top.CX - 500}, ${CV.top.CY + 400}, ${CV.bottom.CX}, ${CV.bottom.CY + 300}, ${CV.bottom.PX}, ${CV.bottom.PY}`,
	},
	];

	anime({
		targets: lineClone,
		easing: 'easeInOutSine',
		duration: 10000,
		autoplay: true,
		loop: true,
		d: dValue,
		direction: 'alternate',
	});
}

function createLines() {
	for (let i = 0; i <= numberOfLines; i += 1) {
		const lineClone = line.cloneNode();
		const shiftX = spacing * i;

		const CV = {
			top: {
				PX: shiftX,
				PY: 0,
				CX: -200 + shiftX,
				CY: 100,
			},
			bottom: {
				PX: shiftX,
				// height of whole animation
				PY: 1024,
				CX: 512 + shiftX,
				CY: 512,
			},
		}
		lineClone.setAttribute('d',
			`M ${CV.top.PX}, ${CV.top.PY} C ${CV.top.CX}, ${CV.top.CY}, ${CV.bottom.CX}, ${CV.bottom.CY}, ${CV.bottom.PX}, ${CV.bottom.PY}`);

		svg.appendChild(lineClone);

		anime({
			targets: lineClone,
			easing: 'easeInOutSine',
			duration: 1500,
			strokeDashoffset: [anime.setDashoffset, 0],
			complete: () => {
				// const line = args.animatables[0].target
				lineClone.strokeDasharray = 'none';
				animateLine(lineClone, CV)
			},
			delay: 100 * i,
		});
	}
}

createLines()

/*
 * SVG curve break down
 * 	M 300 0 (X, Y of the initial point of the Path, connected curves and points don't have this indicator)
 * 		C 200 500 (curve X and Y strength follow M )
 * 			M 300 0 C 200 500 (M X and Y coordinates defined first then curve strength )
 * 			Sequential points with curves are followed up differently (CX CY PX PY where C is curve and P is position)
 * 				M 300 0 C 200 500 CX CY PX PY
 */
