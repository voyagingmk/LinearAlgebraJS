var Class = require("./class");

var Matrix = Class.extend({
	init: function(data, row, col) {
		this.m_Type = 1; //elem type, 1: Int 2: Float
		this.m_data = data;
		this.m_row = row;
		this.m_col = col;
		this.m_Len = row * col; //preprocess
	},
	data: function() {
		return this.m_data;
	},
	row: function() {
		return this.m_row;
	},
	col: function() {
		return this.m_col;
	},
	at: function(r, c) {
		return this.m_data[r * this.m_col + c];
	},
	isSquare: function() {
		return this.m_row == this.m_col;
	},
	isSameOrder: function(m) {
		return this.m_row == m.m_row && this.m_col == m.m_col;
	},
	clone: function() {
		return new Matrix(this.m_data.slice(), this.m_row, this.m_col);
	},
	add: function(m) {
		if (!this.isSameOrder(m)) {
			console.error("[Matrix.add] inconsistent order.");
			return;
		}
		var data1 = this.m_data,
			data2 = m.m_data;
		for (var i = 0, len = this.m_Len; i < len; i++) {
			data1[i] += data2[i];
		}
		return this;
	},
	mimus: function(m) {
		if (!this.isSameOrder(m)) {
			console.error("[Matrix.mimus] inconsistent order.");
			return;
		}
		var data1 = this.m_data,
			data2 = m.m_data;
		for (var i = 0, len = this.m_Len; i < len; i++) {
			data1[i] -= data2[i];
		}
	},
	divide: function() {
		if (typeof m == "number") {
			if (m !== 0) {
				return this.multiply(1 / m);
			}
		}
	},
	multiply: function(m) {
		if (typeof m == "number") {
			var data = this.m_data;
			for (var i = 0, len = this.m_Len; i < len; i++) {
				data[i] *= m;
			}
			return this;
		} else {
			if (this.m_col != m.m_row) {
				console.error("[Matrix.multiply] can't multiply.");
				return;
			}
			var result = new Matrix([], this.m_row, m.m_col);
			var K = this.m_col,
				data1 = this.m_data,
				data2 = m.m_data;
			for (var r = 0; r < result.m_row; r++) {
				for (var c = 0; c < result.m_col; c++) {
					var total = 0;
					for (var k = 0; k < K; k++) {
						total += data1[r * this.m_col + k] * data2[k * m.m_col + c];
					}
					result.m_data[r * m.m_col + c] = total;
				}
			}
			return result;
		}
	},
	isEqual: function(m) {
		if (!this.isSameOrder(m)) {
			return false;
		}
		var data1 = this.m_data,
			data2 = m.m_data;
		for (var i = 0, len = this.m_Len; i < len; i++) {
			if (data1[i] == data2[i])
				continue;
			if (this.m_Type == 2) {
				if (Math.abs(data1[i] - data2[i]) < 1e-6)
					continue;
			}
			return false;
		}
		return true;
	},
	transpose: function() {
		var result = new Matrix([], this.m_col, this.m_row);
		for (var r = 0; r < this.m_row; r++) {
			for (var c = 0; c < this.m_col; c++) {
				result.m_data[c * result.m_col + r] = this.m_data[r * this.m_col + c];
			}
		}
		return result;
	},
	power: function(n) {
		if (!this.isSquare()) {
			console.error("[Matrix.power] not Square.");
			return;
		}
		//TODO: below is simple algorithm
		var result = this.clone();
		for (var i = 0; i < n - 1; i++) {
			result = result.multiply(this);
		}
		return result;
	},
	newIdentity: function(n) {
		var m = this.newZeroMatrix(n);
		for (var i = 0; i < n; i++) {
			m.m_data[i * n + i] = 1;
		}
		return m;
	},
	newZeroMatrix: function(n) {
		var m = new Matrix([], n, n);
		var size = n * n;
		while (size--) m.m_data[size] = 0;
		return m;
	},
	inverse: function() {
		if (!this.isSquare()) {
			console.error("[Matrix.inverse] not Square.");
			return;
		}
	},
	pivotSwapNum: function(m) {
		if (!m)
			m = this;
		m = m.clone();
		var n = m.m_col;
		var data = m.m_data;
		var num = 0;
		for (var r = 0; r < n;) {
			if (data[r * (n + 1)] != 0) {
				r++;
				continue;
			} else {
				while (data[r * (n + 1)] == 0) {
					var c1, c2;
					for (var c = 0; c < n; c++) {
						if (data[r * n + c] > 0) {
							data[r * n + c] = 0;
							c1 = c;
							break;
						}
					}
					for (var c = 0; c < n; c++) {
						if (data[c1 * n + c] > 0) {
							data[c1 * n + c] = 0;
							c2 = c;
							break;
						}
					}
					//exchage c1 and c2 column (just the two number 1)
					data[c1 * n + c1] = 1;
					data[r * n + c2] = 1;
					num++;
				}
			}
		}
		return num;
	},
	pivotize: function() {
		if (!this.isSquare()) {
			console.error("[Matrix.pivotize] not Square.");
			return;
		}
		var n = this.m_col;
		var ID = this.newIdentity(n);
		for (var cur_row = 0; cur_row < n; cur_row++) {
			var row_with_max_elem = cur_row;
			var max_elem = this.m_data[cur_row * n + cur_row];
			for (var r = row_with_max_elem; r < n; r++) {
				if (max_elem < this.m_data[r * n + cur_row]) {
					max_elem = this.m_data[r * n + cur_row];
					row_with_max_elem = r;
				}
			}
			if (cur_row != row_with_max_elem) {
				for (var c = 0; c < n; c++) {
					var tmp = ID.m_data[cur_row * n + c];
					ID.m_data[cur_row * n + c] = ID.m_data[row_with_max_elem * n + c];
					ID.m_data[row_with_max_elem * n + c] = tmp;
				}
			}
		}
		return ID;

	},
	LUP: function() { //LUP Decomposition
		if (!this.isSquare()) {
			console.error("[Matrix.pivotize] not Square.");
			return;
		}
		var n = this.m_col;
		var L = this.newZeroMatrix(n);
		var U = this.newZeroMatrix(n);
		var A = this;
		var P = A.pivotize();
		var PA = P.multiply(A);
		var Ud = U.m_data;
		var Ld = L.m_data;
		var PAd = PA.m_data;

		for (var j = 0; j < n; j++) {
			Ld[j * n + j] = 1;
			for (var i = 0; i < j + 1; i++) {
				var s1 = 0;
				for (var k = 0; k < j; k++)
					s1 += Ud[k * n + j] * Ld[i * n + k];
				Ud[i * n + j] = PAd[i * n + j] - s1;
			}
			for (var i = j; i < n; i++) {
				var s2 = 0;
				for (var k = 0; k < j; k++)
					s2 += Ud[k * n + j] * Ld[i * n + k];
				Ld[i * n + j] = (PAd[i * n + j] - s2) / Ud[j * n + j];
			}
		}
		return {
			P: P,
			L: L,
			U: U
		};
	},
	det: function() { //determinant
		if (!this.isSquare()) {
			console.error("[Matrix.det] not Square.");
			return;
		}
		// A => 
		// PA=LU => 
		// det(A)=det(P^-1)*det(L)*det(U) =>
		// det(A)=det(Pt)*det(L)*det(U) =>
		// det(A)=((-1)^(swapsNum))*det(L)*det(U)
		var A = this;
		var result = A.LUP();
		var P = result.P,
			L = result.L,
			U = result.U;
		var Pt = P.transpose();
		var detPt = Pt.pivotSwapNum() % 2 == 0 ? 1 : -1;
		var detL = L.diagonalMul();
		var detU = U.diagonalMul();
		var detA = detPt * detL * detU;
		return detA;
	},
	diagonalMul: function() {
		var n = this.m_col;
		var total = 1;
		for (var r = 0; r < n; r++) {
			total *= this.m_data[r * (n + 1)];
		}
		return total;
	},
	debug: function(msg) {
		msg = (msg && msg + "\n") || "";
		for (var r = 0; r < this.m_row; r++) {
			for (var c = 0; c < this.m_col; c++) {
				msg += this.at(r, c) + " ";
			}
			msg += "\n";
		}
		console.log(msg);
	},
});



module.exports = Matrix;