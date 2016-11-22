// import the libs we need
import React, { Component } from 'react';
import Style from './App.css';
import Bing from './bing/Bing.jsx';
import Vision from './vision/Vision.jsx';
import Rover from './rover/Rover.jsx';



// create a React Component called _App_
class App extends Component {
  constructor() {
    super();

    this.state = {
    }
  }

  render(){
    return (
      <div className={Style["app-container"]}>
        <h1>Hello Mars</h1>
        <div className={Style["image-container"]}>
          <Rover />
          <Bing />
        </div>
        <Vision />
      </div>
    );
  }
}

export default App;
