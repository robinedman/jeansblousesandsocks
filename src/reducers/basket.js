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
  let newItemsState
  switch (action.type) {
    case 'ADD_ITEM':
      newItemsState = { ...state.items }
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
    case 'REMOVE_ITEM':
      newItemsState = { ...state.items }
      newItemsState[action.item.id] && newItemsState[action.item.id].amount > 1
        ? newItemsState[action.item.id].amount = newItemsState[action.item.id].amount - 1
        : delete newItemsState[action.item.id]

      return {
        ...state,
        items: newItemsState,
      }
    default:
      return state
  }
}
