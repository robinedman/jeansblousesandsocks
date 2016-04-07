/*
  Ways to calculate item price.
*/
const twoForOne = item => (
  item.amount % 2 === 0
    ? item.amount / 2 * item.price
    : ((item.amount - 1) / 2 * item.price) + item.price
)
const secondHalfPrice = item => (
  item.amount % 2 === 0
    ? ((item.amount / 2) * item.price) + ((item.amount / 2) * (item.price / 2))
    : (((item.amount - 1) / 2) * item.price) + (((item.amount - 1) / 2) * (item.price / 2)) + item.price
)
const regular = item => item.price * item.amount


export const getTotalExcludingShipping = items => Object.keys(items).reduce((sum, itemKey) => {
  const item = items[itemKey]
  const itemCost = item.offer === 'secondHalfPrice' ? secondHalfPrice(item) : regular(item)

  return sum + itemCost
}, 0)

// Note: Spec doesn't specify what happens for orders of exactly £90.
// Making it free.
export const getShipping = cost => {
  if (!cost) return 0
  if (cost < 50) return 4.95
  if (cost < 90) return 2.95
  return 0
}

export const getTotal = items => {
  const totalExcludingShipping = getTotalExcludingShipping(items)
  const shipping = getShipping(totalExcludingShipping)
}
