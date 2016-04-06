import { combineReducers } from 'redux'
import basket  from './basket'
import catalog  from './catalog'

const rootReducer = combineReducers({
  catalog,
  basket
})

export default rootReducer
