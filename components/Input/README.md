# Input

`TextInput` and `NumericInput`.

## Design

`TextInput` gets its initial value from the `value` props, and subsequently reflects whatever the user is typing in the input (its `transient_value`).

If, in the process of typing, the input's value conforms to a certain `format`, emit the `onChange` event.

If the `value` is `undefined`, display an empty string in the input.

### Numeric input

<TextInput 
	valid={
		value => {
			let num = parseFloat(value);
			return !isNaN(num) & isFinite(num);
		}
	}	
	format={
		value => {
			return format(parseFloat(value));
		}
	}
/>