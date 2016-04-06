import React from 'react';
import { connect } from 'react-redux'
import formatMoney from '../helpers/formatMoney'

const mapStateToProps = ({ basket }) => ({ basket })

let Basket = ({ basket }) => (
  <div>
    <b>Basket</b>

    <p>£{formatMoney(basket.total)}</p>
    <div>{JSON.stringify(basket)}</div>
  </div>
)
Basket = connect(mapStateToProps, null)(Basket)

export default Basket
