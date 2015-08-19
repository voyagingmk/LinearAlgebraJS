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
			if (m != 0)
				return this.multiply(1 / m);
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
		if (this.m_row != this.m_col)
			return;
		//TODO: below is simple algorithm
		var result = this.clone();
		for(var i = 0; i < n - 1; i++){
			result = result.multiply(this);
		}
		return result;
	},
	det: function(){ //determinant
		
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