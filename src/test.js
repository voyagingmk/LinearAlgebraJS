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

m33 = m1.multiply(m1);
m33.debug("m33:");

var m4 = m2.clone().add(m3);

m4.debug("m4:");

console.log("m3 and m4 is equal:", m3.isEqual(m4), "\n");


var m5 = new Matrix([
	1, 4,
	2, 5,
	3, 6,
], 3, 2);
var m5t = m5.transpose();
m5.debug("m5:");
m5t.debug("m5t:");

var m6 = new Matrix([
	1,
	2,
	3,
	4,
], 4, 1);
var m6t = m6.transpose();
var m6tt = m6t.transpose();
m6.debug("m6:");
m6t.debug("m6t:");
m6tt.debug("m6tt:");

console.log("[k(M)T] and [(kM)T] is equal:\n", m6.clone().multiply(3).transpose().isEqual(m6.clone().transpose().multiply(3)));

var m7 = new Matrix([
	1, 2,
	3, 4,
], 2, 2);
var m8 = new Matrix([-2, -1, -4, -3, ], 2, 2);
console.log("[(AB)T] and [(B)T*(A)T] is equal:\n", m7.clone().multiply(m8.clone()).transpose().isEqual(m7.clone().transpose().multiply(m8.clone().transpose())));

console.log("AB and BA is equal:\n", m7.clone().multiply(m8.clone()).isEqual(m8.clone().multiply(m7.clone())));

m7 = new Matrix([
	1, 1,
	0, 1,
], 2, 2);
var m7power2 = m7.power(2);
m7power2.debug("m7power2:");
var m7_power2_mul_power2 = m7.power(2).multiply(m7.power(2));
m7_power2_mul_power2.debug("m7_power2_mul_power2:");
var m7power4 = m7.power(4);
m7power4.debug("m7power4:");
var m7power20 = m7.power(20);
m7power20.debug("m7power20:");


m44 = new Matrix([
	1, 2, 3, 4,
	5, 6, 7, 8,
	9, 10, 11, 12,
	13, 14, 15, 16,
], 4, 4);

permutate44 = new Matrix([
	1, 0, 0, 0,
	0, 0, 0, 1,
	0, 1, 0, 0,
	0, 0, 1, 0,
], 4, 4);

var result = m44.multiply(permutate44);
result.debug("m44.multiply(permutate44) :");

result = permutate44.multiply(m44);
result.debug("permutate44.multiply(m44) :");

var m8 = new Matrix([
	3, 0, 3,
	9, 1, 2,
	6, 4, 3,
], 3, 3);

m8.debug("m8:");

var pivot = m8.pivotize();
pivot.debug("m8.pivot:");

pivot.multiply(m8).debug("pivot * m8:");

result = m8.PLU();
result.P.debug("PLU of m8, P:");
result.L.debug("PLU of m8, L:");
result.U.debug("PLU of m8, U:");
