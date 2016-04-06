// Format money to two decimals, cut off any extra decimals without rounding.
export default (number) => Number(number.toString().match(/^\d+(?:\.\d{0,2})?/))
