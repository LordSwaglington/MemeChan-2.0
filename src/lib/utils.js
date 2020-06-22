'use strict';

/**
 * returns random int between 0 and max
 * @param {Number} max - max number to returns
 */
const randomRange = (max) => {
	return Math.floor(Math.random() * max);
};

/**
 * creates a date string (mmdd) from today
 */
const date = () => {
	let today = new Date();
	let dd = String(today.getDate()).padStart(2, '0');
	let mm = String(today.getMonth() + 1).padStart(2, '0');

	return `${mm}-${dd}`;
};

module.exports = {
	randomRange: randomRange,
	date: date
};
