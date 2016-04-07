import React from 'react'
import { connect } from 'react-redux'
import { removeItem } from '../actions/basketActions'
import formatMoney from '../helpers/formatMoney'

const mapStateToProps = ({ basket }) => ({ basket })
const mapDispatchToProps = (dispatch) => ({
  removeItem: (...args) => dispatch(removeItem(...args)),
})

let Basket = ({ basket, removeItem }) => {
  const renderItem = item => (
    <li key={item.id}>
      {item.amount} {item.product} {formatMoney(item.price)}
      <button onClick={() => removeItem(item)}>Remove</button>
    </li>
  )

  const renderItems = items => (
    <ul>
      { Object.keys(items).map(itemKey => renderItem(items[itemKey])) }
    </ul>
  )

  return (
    <div>
      <b>Basket</b>
      <ul>
        {renderItems(basket.items)}
      </ul>

      <p>Total excluding shipping: <strong>{formatMoney(basket.totalExcludingShipping)}</strong></p>
      <p>Shipping: <strong>{formatMoney(basket.shipping)}</strong></p>
      <p>Total: <strong>{formatMoney(basket.total)}</strong></p>
    </div>
  )
}
Basket = connect(mapStateToProps, mapDispatchToProps)(Basket)

export default Basket
