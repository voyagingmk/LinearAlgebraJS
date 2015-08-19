var Matrix = require('./Matrix');

var m1 = new Matrix([
	1, 2, 3,
	4, 5, 6,
	7, 8, 9
], 3, 3);

m1.debug("m1:");

var m2 = new Matrix([
	1,
	2,
	3,
], 3, 1);

m2.debug("m2:");

var m3 = m1.multiply(m2);

m3.debug("m3:");

var m4 = m2.add(m3);

m4.debug("m4:");