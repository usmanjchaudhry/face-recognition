import { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Rank from './components/Rank/Rank'
import ParticlesBg from 'particles-bg'
import { useState } from 'react';
import { click } from '@testing-library/user-event/dist/click';
const Clarifai = require('clarifai');



function App() {
  const app = new Clarifai.App({
    apiKey: 'YOUR_API_KEY'
   });
   
  const [input, setInput] = useState('');

  const onInputChange = (event) => {
    console.log(event.target.value );
  }

  const onButtonSubmit = () =>{

const raw = JSON.stringify({
  "user_app_id": {
    "user_id": "clarifai",
    "app_id": "main"
  },
  "inputs": [
      {
          "data": {
              "image": {
                  "url": "IMAGE_URL"
              }
          }
      }
  ]
});

const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Authorization': 'Key ' + 'YOUR_PERSONAL_ACCESS_TOKEN'
    },
    body: raw
};

// NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
// https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
// this will default to the latest version_id

fetch(`https://api.clarifai.com/v2/models/face-detection/versions/6dc7e46bc9124c5c8824be4822abe105/outputs`, requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
  
    console.log('click')
  }

  return (
    <div className='App'>
      <Navigation/>
      <Logo/> 
      <Rank/>

      <ImageLinkForm onInputChange = {onInputChange} onButtonSubmit = {onButtonSubmit}/>
      <ParticlesBg type="circle" bg={true} />

    </div>
  );
}

export default App;
