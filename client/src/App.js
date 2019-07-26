import React, { useState, useContext, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Web3 from 'web3';
import GlobalState from './contexts/GlobalState';

function App() {
  const [state, setState] = useState({});

  useEffect(() => {
    setState(state => ({...state, web3: new Web3(Web3.givenProvider)}))
  }, [])

  return (
    <GlobalState.Provider value={[state, setState]}>
      <ChildElement/>
    </GlobalState.Provider>
  );
}

function ChildElement() {
  const [state, setState] = useContext(GlobalState);

  const handleLogin = async () => {
    const accounts = await window.ethereum.enable();
    const account = accounts[0];
    setState(state => ({ ...state, account }))
  }

  console.log(state);

  console.log(state.web3);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={handleLogin} type="button">Login with Metamask</button>
        <Child2 />
      </header>
    </div>
  );
}


function Child2() {
  const [state, setState] = useContext(GlobalState);

  console.log(state.address);

  return (
    <div>
      {state.account}
    </div>
  );
}



export default App;
