import React from 'react';
import { connect } from 'react-redux'
import { addItem } from '../actions/basketActions'

const mapStateToProps = ({ catalog }) => ({ catalog })
const mapDispatchToProps = (dispatch) => ({
  addItem: (...args) => dispatch(addItem(...args)),
})

let Catalog = ({ catalog, addItem }) => {
  const renderItem = (item) => (
    <li key={item.id}>
      <button onClick={() => addItem(item)}>
        <strong>{item.product}</strong> £{item.price}
      </button>
    </li>
  )

  const renderItems = () => (
    <ul>
      {
        Object.keys(catalog).map(itemId => {
          const item = catalog[itemId]
          return renderItem(item)
        })
      }
    </ul>
  )

  return (
    <div>
      <b>Catalog</b>
      {renderItems()}
    </div>
  )
}
Catalog = connect(mapStateToProps, mapDispatchToProps)(Catalog)

export default Catalog
