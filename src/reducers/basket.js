import {
  getTotalExcludingShipping,
  getShipping,
  getTotal } from '../basketRules'

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

export default (state = initialState, action) => {
  const newItemsState = { ...state.items }
  let totalExcludingShipping, shipping, total

  switch (action.type) {
    case 'ADD_ITEM':
      newItemsState[action.item.id] = {
        ...action.item,
        amount: (state.items[action.item.id] && state.items[action.item.id].amount || 0) + 1
      }

      totalExcludingShipping = getTotalExcludingShipping(newItemsState)
      shipping = getShipping(totalExcludingShipping)
      total = totalExcludingShipping + shipping

      return {
        ...state,
        items: newItemsState,
        totalExcludingShipping,
        shipping,
        total,
      }
    case 'REMOVE_ITEM':
      newItemsState[action.item.id] && newItemsState[action.item.id].amount > 1
        ? newItemsState[action.item.id].amount = newItemsState[action.item.id].amount - 1
        : delete newItemsState[action.item.id]

        totalExcludingShipping = getTotalExcludingShipping(newItemsState)
        shipping = getShipping(totalExcludingShipping)
        total = totalExcludingShipping + shipping

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
