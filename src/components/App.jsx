// import the libs we need
import React, { Component } from 'react';
import './App.css';
import Bing from './bing/Bing.jsx';
import Vision from './vision/Vision.jsx';
import Rover from './rover/Rover.jsx';
import SignUpForm from './SignUp/SignUpForm.jsx';
import LogInForm from './Login/LogInForm.jsx';
import SavedImages from './SavedImages/SavedImages.jsx';
import Refresh from '../images/Refresh.png';
import Crosshair from '../images/inverse.png';
import Save from '../images/save.png';
import User from '../images/user.png';
import DeleteButton from '../images/deleteicon.png';
import SavedImagesItem from './SavedImagesItem/SavedImagesItem.jsx';

// create a React Component called _App_
class App extends Component {

  constructor() {
    super();

    this.state = {
      DeleteButton: DeleteButton,
      Save: Save,
      roverImage: Crosshair,
      searchImages: false,
      bingImage: Crosshair,
      visionText: '',
      Refresh: Refresh,
      User: User,
      counter: 0,
      roverBox: 'hidden',
      bingBox: '',
      roverContainer: 'rover-container',
      bingContainer: '',
      signUpFormDisplay: 'signup-form',
      logInFormDisplay: 'form-container',
      userInfo: 'hidden',
      refreshButton: 'hidden',
      saveButton: 'hidden',
      signup: {
        username: '',
        password: ''
      },
      login: {
        loggedIn: false,
        username: '',
        password: ''
      },
      username: '',
      savedImages: []
    };
   }

  // POST sends our mars imageUrl to Microsoft vision image scanner. It creates a description of the image as a string.
  getVisionData(url) {
    fetch('/vision', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      },
      body: JSON.stringify({ 'url': url }),
    })
    .then(r => r.json())
    .then((data) => {
      console.log(data)
      this.setState({
        counter: 2,
        visionText: data.description.captions[0].text,
        CrosshairHover: '',
        bingContainer: 'bing-container',
        bingBox: 'boxcrosshair'
      })
    })
    .catch(err => console.log(err))
  }

  // Fetch call to our rover route. This initiates an API fetch call to NASA's Mars Rover images api. 
  getRoverImages(){
    fetch(`/rover`)
    .then(r => r.json())
    .then((data) => {
      // console.log('$$$$$$', data.photos[1].img_src)
      this.setState({
        roverBox: 'large-images',
        roverContainer: 'large-images-container',
        counter: 1,
        roverImage: data.photos[1].img_src,
        RoverImageHover: '',
        visionText: <img className="brighten" className="crosshair" src={Crosshair} alt="Click"/>
      })
    })
    .catch(err => console.log(err))
  }

  refreshPage(){
    this.setState({
      Save: Save,
      roverImage: Crosshair,
      searchImages: false,
      bingImage: Crosshair,
      visionText: '',
      Refresh: Refresh,
      User: User,
      counter: 0,
      roverBox: 'boxcrosshair',
      bingBox: '',
      roverContainer: 'rover-container',
      bingContainer: 'hidden',
      refreshButton: 'hidden',
      saveButton: 'hidden'
    })
  }

  // Retrieve and updates the state of our Vision Text, the data from Microsoft image scanner.
  getVision(){
    fetch(`/vision`)
    .then(r => r.json())
    .then((data) => {
      console.log('$$$$$$', data)
      this.setState({
        visionText: data
      })
    })
    .catch(err => console.log(err))
  }

  // A POST of Microsoft Vision Data to our 3rd API, Bing image search.
  getBingImage(string){
    fetch(`/bing`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      },
      body: JSON.stringify({ 'string': string }),
    })
    .then(r => r.json())
    .then((data) => {
      this.setState({
        bingBox: 'large-images',
        bingContainer: 'large-images-container',
        bingImage: data.value[2].contentUrl,
        searchImages: true,
        saveButton: 'save-searches',
        refreshButton: 'refreshButton'
      })
    })
    .catch(err => console.log(err))
  }

  // Lines 152-248 were taken from Rafa's User Auth Code in React_Puppies Lab 

updateFormSignUpUsername(e) {
    console.log(e.target.value);
    this.setState({
      signup: {
        username: e.target.value,
        password: this.state.signup.password
      }
    });
  }

  updateFormSignUpPassword(e) {
    console.log(e.target.value);
    this.setState({
      signup: {
        username: this.state.signup.username,
        password: e.target.value
      }
    });
  }

  updateFormLogInUsername(e) {
    this.setState({
      login: {
        username: e.target.value,
        password: this.state.login.password
      }
    });
  }

  updateFormLogInPassword(e) {
    this.setState({
      login: {
        username: this.state.login.username,
        password: e.target.value
      }
    });
  }

  // Add set state to make signup box disappear on signup
  handleSignUp() {
    fetch('/api/users', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        username: this.state.signup.username,
        password: this.state.signup.password
      })
    })
    .then(this.setState({
      username: this.state.login.username,
      signup: {
        username: '',
        password: ''
      },
      signUpFormDisplay: 'hidden'
    }))
    .catch(err => console.log(err));
  }

  // Add set state to make login box disappear on login 
  handleLogIn() {
    fetch('/api/auth', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        username: this.state.login.username,
        password: this.state.login.password
      })
    })
    .then(this.setState({
      username: this.state.login.username,
      login: {
        username: '',
        password: ''
      },
      signUpFormDisplay: 'hidden',
      logInFormDisplay: 'hidden',
      userInfo: 'userInfo',
      roverBox: 'boxcrosshair'
    }))
    .then(this.onSuccessfulLogIn)
    .catch(err => console.log(err));
  }

  onSuccessfulLogIn(a,b) {
    console.log(a,b);
  }

  alertInfo(msg) {
    alert(msg);
  }

// Save search results to database
saveSearch(url, url2, text, username) {
  console.log('^^^^^^the username is:',username)
  return fetch(`/images`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        'url': url,
        'url2': url2,
        'text': text,
        'username': username
       })
    })
  .catch(err => console.log(err));
}

// Pass username so user can save collections
getSavedImages(username) {
  console.log('hey i am fetching images for', username)
  return fetch(`/images/${username}`, {
    method: 'GET'
  })
  .then(r => r.json())
  .then((data) => {
    console.log('$$$ THE DATA IS', data)
    this.setState({
      savedImages: data
    });
  })
  .catch(err => console.log(err));
}

// Add setTimeout to render saved images, it was breaking because images took too long to load.
handleSaveClick(url, url2, text, username) {
  this.saveSearch(url, url2, text, username);
  setTimeout(() => {this.getSavedImages(username)}, 300);
}

// Combine two functions on login click.
loginFunctions(username) {
  this.getSavedImages(username);
  this.handleLogIn();
}

// Pass saved search id allowing user to delete from their collection. Then reload the saved images.
deleteSaved(id) {
  fetch(`/images/${id}`, {
    method: 'delete'
  })
  .then(() => {
    const savedImages = this.state.savedImages.filter((image) => {
      return image.id !== id;
    });
      this.setState({ savedImages });
    })
    .catch(err => console.log(err));
}

  render(){
    return (
      <div className="app-container">
        <header>
          <div className={this.state.userInfo}>
            <img className="userIcon" src={this.state.User} alt="user"/>
            <p className="userName">{this.state.username}</p>
          </div>
        </header>
          <div className="image-container">
            <div className="login-container">
              <SignUpForm
                signUpFormDisplay={this.state.signUpFormDisplay}
                signUpUsername={this.state.signup.username}
                signUpPassword={this.state.signup.password}
                updateFormUsername={event => this.updateFormSignUpUsername(event)}
                updateFormPassword={event => this.updateFormSignUpPassword(event)}
                handleFormSubmit={() => this.handleSignUp()}
              />
              <LogInForm
                logInFormDisplay={this.state.logInFormDisplay}
                loginFunctions={() => this.loginFunctions(this.state.login.username)}
                className={this.state.login.loggedIn ? 'hidden' : ''}
                logInUsername={this.state.login.username}
                logInPassword={this.state.login.password}
                updateFormUsername={event => this.updateFormLogInUsername(event)}
                updateFormPassword={event => this.updateFormLogInPassword(event)}
                handleFormSubmit={() => this.handleLogIn()}
                getSavedImages={() => this.getSavedImages()}
              />
          </div>
          <Rover
            roverContainer={this.state.roverContainer}
            roverBox={this.state.roverBox}
            counter={this.state.counter}
            roverData={this.state.roverImage}
            getRoverImages={this.getRoverImages.bind(this)}
          />
          <Bing
            bingContainer={this.state.bingContainer}
            bingBox={this.state.bingBox}
            counter={this.state.counter}
            visionText={this.state.visionText}
            bingImage={this.state.bingImage}
            getBingImage={this.getBingImage.bind(this)}
          />
          <div className="vision-container">
            <Vision
              counter={this.state.counter}
              visionText={this.state.visionText}
              roverImage={this.state.roverImage}
              getVisionData={this.getVisionData.bind(this)}
            />
          </div>
        <div className={this.state.saveButton} onClick={() => this.handleSaveClick(this.state.roverImage, this.state.bingImage, this.state.visionText, this.state.username)}>
          <img className="saveImage" src={this.state.Save} alt="Save"/>
        </div>
        <div className={this.state.refreshButton} onClick={() => {this.refreshPage()}}>
          <img className="refreshImage" src={this.state.Refresh} alt="Refresh"/>
        </div>
      </div>
        <SavedImages
          DeleteButton={this.state.DeleteButton}
          username={this.state.username}
          getSavedImages={this.getSavedImages.bind(this)}
          deleteSaved={this.deleteSaved.bind(this)}
          savedImages={this.state.savedImages}
        />
     </div>
   );
 }
}

export default App;
