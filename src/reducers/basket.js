/*
Example basket:
{
  items: {
    "B01": { "id":"B01","product":"Blouse","price":24.95,"amount":2 }
  },
  total: 49.9
}
*/
const initialState = {
  items: {},
  total: 0
}

const twoForOne = item => (
  item.amount % 2 === 0
    ? item.amount / 2 * item.price
    : ((item.amount - 1) / 2 * item.price) + item.price
)
const regular = item => item.price * item.amount

const getTotalExcludingShipping = (items) => {
  return Object.keys(items).reduce((sum, itemKey) => {
    const item = items[itemKey]
    const itemCost = item.offer === '2for1' ? twoForOne(item) : regular(item)

    return sum + itemCost
  }, 0)
}

// Note: Spec doesn't specify what happens for orders of exactly £90.
// Making it free.
const getShipping = (cost) => {
  if (cost < 50) return 4.95
  if (cost < 90) return 2.95
  return 0
}

const getTotal = (items) => {
  const totalExcludingShipping = getTotalExcludingShipping(items)
  const shipping = getShipping(totalExcludingShipping)
}


export default (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      let newItemsState = { ...state.items }
      newItemsState[action.item.id] = {
        ...action.item,
        amount: (state.items[action.item.id] && state.items[action.item.id].amount || 0) + 1
      }

      const totalExcludingShipping = getTotalExcludingShipping(newItemsState)
      const shipping = getShipping(totalExcludingShipping)
      const total = totalExcludingShipping + shipping

      return {
        ...state,
        items: newItemsState,
        totalExcludingShipping,
        shipping,
        total,
      }
    default:
      return state
  }
}
