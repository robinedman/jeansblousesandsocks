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

const calculateTotal = (items) => {
  return Object.keys(items).reduce((sum, itemKey) => sum + items[itemKey].price * items[itemKey].amount, 0)
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      let newBasketItemsState = { ...state.items }
      newBasketItemsState[action.item.id] = {
        ...action.item,
        amount: (state.items[action.item.id] && state.items[action.item.id].amount || 0) + 1

      }
      return {
        ...state,
        items: newBasketItemsState,
        total: calculateTotal(newBasketItemsState)
      }
    default:
      return state
  }
}
