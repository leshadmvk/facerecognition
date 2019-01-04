import React, { Component } from 'react';
//COMPONENTS
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import Rank from './Components/Rank/Rank';
import SignIn from './Components/SignIn/SignIn';
import Register from './Components/Register/Register';
//API's
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
//CSS
import './App.css';

const app = new Clarifai.App({
 apiKey: '3aea2099fdc54eb08639bd02310995b2'
});


const particlesOptions = {
      particles: {
        number: {
          value: 100,
          density: {
            enable: true,
          value_area: 800,
        }
      }
    }
  }
class App extends Component {
  constructor(){
    super();
    this.state = {
      input: '',
      imageUrl:'',
      box: {},
      route: 'signin',
      isSignedIn: false
    }
  }

  calculateFaceLocation = (data) => {
   const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
   const image = document.getElementById('inputImage');
   const width = Number(image.width);
   const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input})
    app.models.predict(
      Clarifai.FACE_DETECT_MODEL, 
      this.state.input)
    .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))// do something wi  th response
    .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if(route === 'signout'){
      this.setState({isSignedIn:false})
    }else{
      this.setState({isSignedIn:true})
    }
    this.setState({route: route});
  }

  render() {
    const {isSignedIn, imageUrl, route, box} = this.state;
    return (
      <div className="App">
        <Particles className='particles'
          params={particlesOptions}
        />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
      {route === 'home' 
          ? <div>
              <Logo />
              <Rank />
              <ImageLinkForm 
                onInputChange={this.onInputChange} 
                onButtonSubmit={this.onButtonSubmit}
              />
              <FaceRecognition box={box} imageUrl={imageUrl}  />
            </div>
          : route === 'signin'
              ? <SignIn onRouteChange={this.onRouteChange}/>
              : <Register onRouteChange={this.onRouteChange}/>
          
          
      }
      </div>
    );
  }
}

export default App;
