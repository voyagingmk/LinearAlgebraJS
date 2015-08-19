var Class = require("./class");

var Matrix = Class.extend({
	init: function(data, row, col) {
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
	multiply: function(m) {
		if (typeof m == "number") {
			var data = this.m_data;
			for (var i = 0, len = this.m_Len; i < len; i++) {
				data[i] *= m;
			}
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
						total += data1[r * this.m_col + k] * data1[k * m.m_col + c];
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