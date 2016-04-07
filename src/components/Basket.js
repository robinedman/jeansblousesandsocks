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
    <li className="Basket-item" key={item.id}>
      {item.amount} {item.product} {formatMoney(item.price)}
      <button className="Basket-item-remove" onClick={() => removeItem(item)}>x</button>
    </li>
  )

  const renderItems = items => (
    <ul>
      { Object.keys(items).map(itemKey => renderItem(items[itemKey])) }
    </ul>
  )

  return (
    <div className="Basket">
      <h2>Basket</h2>
      <ul className="Basket-items">
        {renderItems(basket.items)}
      </ul>

      <div className="Basket-cost">
        <p>Total excluding shipping: <strong>{formatMoney(basket.totalExcludingShipping)}</strong></p>
        <p>Shipping: <strong>{formatMoney(basket.shipping)}</strong></p>
        <p>Total: <strong>{formatMoney(basket.total)}</strong></p>
      </div>
    </div>
  )
}
Basket = connect(mapStateToProps, mapDispatchToProps)(Basket)

export default Basket
