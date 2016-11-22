import React, { Component } from 'react';
import Style from './Rover.css';

export default class Rover extends Component{
  render(){
    console.log(this.props)

    return (
      <div className="rover-container">
        <img src="http://mars.jpl.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/01000/opgs/edr/fcam/FLB_486265257EDR_F0481570FHAZ00323M_.JPG" alt=""/>
      </div>
    );
  }
}
