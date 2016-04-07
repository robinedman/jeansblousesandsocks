import React from 'react';
import { connect } from 'react-redux'
import { addItem } from '../actions/basketActions'
import formatMoney from '../helpers/formatMoney'

const mapStateToProps = ({ catalog }) => ({ catalog })
const mapDispatchToProps = (dispatch) => ({
  addItem: (...args) => dispatch(addItem(...args)),
})

let Catalog = ({ catalog, addItem }) => {
  const renderItem = (item) => (
    <div key={item.id}
         onClick={() => addItem(item)}
         className={`Catalog-item-${item.product.toLowerCase()}`}>
        <span className="Catalog-item-price">{formatMoney(item.price)}</span>
    </div>
  )

  const renderItems = () => Object.keys(catalog).map(itemId => renderItem(catalog[itemId]))

  return (
    <div className="Catalog">
      {renderItems()}
    </div>
  )
}
Catalog = connect(mapStateToProps, mapDispatchToProps)(Catalog)

export default Catalog
