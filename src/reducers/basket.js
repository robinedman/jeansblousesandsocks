const initialState = {
  items: [],
  total: 0
}

const calculateTotal = (items) => items.reduce((sum, item) => sum + item.price, 0)

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      const newBasketItemsState = [
        ...state.items,
        action.item
      ]
      return {
        ...state,
        items: newBasketItemsState,
        total: calculateTotal(newBasketItemsState)
      }
    default:
      return state
  }
}
