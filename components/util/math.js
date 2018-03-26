import jsep from 'jsep';

// See: https://github.com/d3/d3-format/issues/32
export const to_precision = (value, precision = 0) => 
	Math.round(
		value * (precision = Math.pow(10, precision))
	) / precision;
	

export const to_step = (value, step, precision = 0, rounding = 'round') => 
	to_precision(
		Math[rounding](value / step) * step,
		precision
	);

export const polar_scale = (x, y) => ({
	r: Math.sqrt(x * x + y * y),
	t: Math.atan2(y, x)
});

polar_scale.invert = (r, t) => ({
	x: r * Math.cos(t),
	y: r * Math.sin(t)
});

export const deg_to_radians = deg => deg * Math.PI / 180;

export const clamp = (value, start, end) =>
	Math.max(
		Math.min(
			value, 
			Math.max(start, end)
		),
		Math.min(start, end)
	);

export const cycle = (value, start, end) => {
	let min = Math.min(start, end);
	let max = Math.max(start, end);
	return value < min ? max : (value > max ? min : value)
}

const jsep_binary_operations = {
	'+': function(a, b) {
		return a + b;
	},
	'-': function(a, b) {
		return a - b;
	},
	'*': function(a, b) {
		return a * b;
	},
	'/': function(a, b) {
		return a / b;
	}
};

const jsep_unary_operations = {
	'+': function(a) {
		return a;
	},
	'-': function(a) {
		return -a;
	}
};

const jsep_evaluate = node => {
	if(node.type === "BinaryExpression") {
		return jsep_binary_operations[node.operator](jsep_evaluate(node.left), jsep_evaluate(node.right));
	} else if(node.type === "UnaryExpression") {
		return jsep_unary_operations[node.operator](jsep_evaluate(node.argument));
	} else if(node.type === "Literal") {
		return node.value;
	}
};

export const parse_expression = value => jsep_evaluate(jsep(value + ''));

export const parse_float = value => parseFloat(value);

export const valid_float = value => {
	let num = parseFloat((value + '').trim());
	return !isNaN(num) && isFinite(num);
}
