import React from 'react';
import { connect } from 'react-redux'
import formatMoney from '../helpers/formatMoney'

const mapStateToProps = ({ basket }) => ({ basket })

let Basket = ({ basket }) => {
  const renderItem = item => (
    <li key={item.id}>
      {item.amount} {item.product} {formatMoney(item.price)}
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
Basket = connect(mapStateToProps, null)(Basket)

export default Basket
