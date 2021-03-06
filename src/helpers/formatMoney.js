// Format money to two decimals, cut off any extra decimals without rounding.
export default (number) => number
  ? `£${Number(number.toString().match(/^\d+(?:\.\d{0,2})?/)).toFixed(2)}`
  : `£0.00`
