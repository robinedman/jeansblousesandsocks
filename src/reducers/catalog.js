const initialState = {
  'B01': { id: 'B01', product: 'Blouse', price: 24.95 },
  'J01': { id: 'J01', product: 'Jeans', price: 32.95, offer: '2for1' },
  'S01': { id: 'S01', product: 'Socks', price: 7.95 }
}

export default (state = initialState, action) => {
  switch (action.type) {
    default:
      return state
  }
}
