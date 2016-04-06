import React from 'react';
import { connect } from 'react-redux'

const mapStateToProps = ({ basket }) => ({ basket })

let Basket = ({ basket }) => (
  <div>
    <b>Basket</b>
    <div>{JSON.stringify(basket)}</div>
  </div>
)
Basket = connect(mapStateToProps, null)(Basket)

export default Basket
