import { expect } from '../test_helper';
import basket from '../../src/reducers/basket'
import formatMoney from '../../src/helpers/formatMoney'

const catalog = {
  'B01': { id: 'B01', product: 'Blouse', price: 24.95 },
  'J01': { id: 'J01', product: 'Jeans', price: 32.95, offer: 'secondHalfPrice' },
  'S01': { id: 'S01', product: 'Socks', price: 7.95 }
}

describe('basket reducer', () => {
  it('returns the initial state', () => {
    expect(
      basket(undefined, {})
    ).to.eql(
      {
        items: {},
        total: 0
      }
    )
  })

  it('ADD_ITEM correctly adds 1 item', () => {
    const oneItemBasket = basket(undefined, {
      type: 'ADD_ITEM',
      item: catalog['S01']
    })

    expect(oneItemBasket.items).to.eql({
      'S01': {
        ...catalog['S01'],
        amount: 1
      }
    })
    expect(formatMoney(oneItemBasket.total)).to.eql('£12.90')
  })

  it('ADD_ITEM S01, B01', () => {
    const socksAndBlouseBasket = basket({
      items: {
        'S01': {
          ...catalog['S01'],
          amount: 1
        }
      }
    }, {
      type: 'ADD_ITEM',
      item: catalog['B01']
    })

    expect(socksAndBlouseBasket.items).to.eql({
      'S01': {
        amount: 1,
        id: 'S01',
        price: 7.95,
        product: 'Socks'
      },
      'B01': {
        ...catalog['B01'],
        amount: 1
      }
    })
    expect(formatMoney(socksAndBlouseBasket.total)).to.eql('£37.85')
  })

  it('ADD_ITEM J01, J01', () => {
    const jeansBasket = basket({
      items: {
        'J01': {
          ...catalog['J01'],
          amount: 1
        }
      }
    }, {
      type: 'ADD_ITEM',
      item: catalog['J01']
    })

    expect(jeansBasket.items).to.eql({
      'J01': {
        ...catalog['J01'],
        amount: 2
      }
    })
    expect(formatMoney(jeansBasket.total)).to.eql('£54.37')
  })

  it('ADD_ITEM J01, B01', () => {
    // J01, B01
    const jeansAndBlouseBasket = basket({
      items: {
        'J01': {
          ...catalog['J01'],
          amount: 1
        }
      },
    }, {
      type: 'ADD_ITEM',
      item: catalog['B01']
    })

    expect(jeansAndBlouseBasket.items).to.eql({
      'J01': {
        ...catalog['J01'],
        amount: 1
      },
      'B01': {
        ...catalog['B01'],
        amount: 1
      },
    })
    expect(formatMoney(jeansAndBlouseBasket.total)).to.eql('£60.85')
  })

  it('ADD_ITEM S01, S01, J01, J01, J01', () => {
    const doubleSocksTripleJeansBasket = basket({
      items: {
        'S01': {
          ...catalog['S01'],
          amount: 2
        },
        'J01': {
          ...catalog['J01'],
          amount: 2
        }
      }
    }, {
      type: 'ADD_ITEM',
      item: catalog['J01']
    })

    expect(doubleSocksTripleJeansBasket.items).to.eql({
      'S01': {
        ...catalog['S01'],
        amount: 2
      },
      'J01': {
        ...catalog['J01'],
        amount: 3
      },
    })
    expect(formatMoney(doubleSocksTripleJeansBasket.total)).to.eql('£98.27')
  })

})
