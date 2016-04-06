import React from 'react';
import { Component } from 'react';
import Basket from './Basket'
import Catalog from './Catalog'

export default class App extends Component {
  render() {
    return (
      <div>
        <h1>jeansblousesandsocks</h1>
        <Catalog />
        <Basket />
      </div>
    );
  }
}
