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

const getTotalExcludingShipping = (items) => {
  return Object.keys(items).reduce((sum, itemKey) => sum + items[itemKey].price * items[itemKey].amount, 0)
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
