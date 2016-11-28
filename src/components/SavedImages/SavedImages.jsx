import React, { Component } from 'react';
import './SavedImages.css';
import '../App.css';
import SavedImagesItem from '../SavedImagesItem/SavedImagesItem.jsx';

export default class SavedImages extends Component{
  
  renderSavedImages() {
    console.log('saved images.............', this.props);
    return this.props.savedImages.map((result, i) => 
      <SavedImagesItem 
        DeleteButton={this.props.DeleteButton}
        username={this.props.username}
        getSavedImages={this.props.getSavedImages}
        deleteSaved={this.props.deleteSaved}
        roverurl={result.roverurl}
        bingurl={result.bingurl}
        visiontext={result.visiontext}
        key={i}
        id={result.search_id}
      />
    )
  }

  render(){
    return (
      <div className="saved-image-container">
        
        {this.renderSavedImages()}

      </div>
    );
  }
}
