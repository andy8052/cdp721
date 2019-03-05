import React, { Component } from 'react';
import './App.css';
import Web3Provider, { Connectors } from 'web3-react'
import MyComponent from './MyComponent';

const { MetaMaskConnector } = Connectors
const metamask = new MetaMaskConnector({ supportedNetworks: [42] })
const connectors = { metamask }
class App extends Component {
  render() {
    return (
      <Web3Provider connectors={connectors} libraryName="web3.js">
        <MyComponent />
      </Web3Provider>
    );
  }
}

export default App;
