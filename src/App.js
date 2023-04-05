  import { Component } from 'react';
  import './App.css';
  import Navigation from './components/Navigation/Navigation';
  import Logo from './components/Logo/Logo'
  import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
  import Rank from './components/Rank/Rank'
  import ParticlesBg from 'particles-bg'
  import FaceRecognition from './components/FaceRecognition/FaceRecognition';
  import { useState, useEffect } from 'react';
  import SignIn from './components/SignIn/SignIn';
  import Register from './components/Register/Register';




  function App() {

  
    
    const [input, setInput] = useState('');
    const [imageURL, setImageURL] = useState('');
    const [data, setData] = useState({});
    const [box,setBox] = useState({})
    const [route, setRoute] = useState('SignIn')
    const [isSignedIn, setSignedIn] = useState(false)
    const [user, setUser] = useState({
      id: '',
      name: '',
      email: '',
      entries: 0,
      joined: ''

    })


     const loadUser = (user) =>{
       setUser({
  id:user.id,
  name:user.name,
  email: user.email,
  entries: user.entries,
  joined: user.joined
})
    }


    
    const onRouteChange = (route) =>{
      if(route === 'signout'){
        setSignedIn(false)
      } else if ( route === 'home'){
        setSignedIn(true)
      }
          setRoute(route)
      
    }

    const calculateFaceLocation = (data) =>{

      const clarifaiFace = data
      const image = document.getElementById('inputImage')
      const width = Number(image?.width || 0)
      const height = Number(image?.height || 0)
      return{
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - (clarifaiFace.right_col * width),
        bottomRow: height - (clarifaiFace.bottom_row * height)

      }
    }
    const onInputChange = (event) => {
      setInput(event.target.value);
    }

    useEffect(() => {
    }, []);

    const onButtonSubmit = () =>{

      setImageURL(input);
      
  const raw = JSON.stringify({
    "user_app_id": {
      "user_id": "clarifai",
      "app_id": "main"
    },
    "inputs": [
        {
            "data": {
                "image": {
                    "url": input
                }
            }
        }
    ]
  });

  const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Authorization': 'Key 19b06bbe708d4333b9be4d16c09759ef'
      },
      body: raw
  };

  // NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
  // https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
  // this will default to the latest version_id

    fetch(`https://api.clarifai.com/v2/models/face-detection/versions/6dc7e46bc9124c5c8824be4822abe105/outputs`, requestOptions)
    

    .then(response => response.json()) 
    
  
    

    .then(result => {
      const boundingBox = result.outputs[0].data.regions[0].region_info.bounding_box;
      setData(boundingBox);
    })

    
 
    .catch(error => console.log('error', error))
  }




  useEffect(() => {
    if(data){
      fetch('http://localhost:3000/image', {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            id:user.id
        })
    })
    .then(response => response.json())
    .then(count => {
      setUser(prevState => ({
        ...prevState,
        entries: count
      }));
    })
    .catch(error => console.log('error', error));
  } else {
    console.log('error');
  }

    
  setBox(calculateFaceLocation(data))
  }, [data]);

  return (
    <div className='App'>
      <Navigation onRouteChange={onRouteChange} isSignedIn={isSignedIn} />



      {route === 'home' ? (
        <div>
          <Logo/> 
          <Rank name={user.name} entries={user.entries} user={user} />
          <ImageLinkForm onInputChange={onInputChange} onButtonSubmit={onButtonSubmit}/>
          <FaceRecognition box={box} imageURL={imageURL}/> 
        </div>
      ):(
        route === 'SignIn' ?
          <SignIn onRouteChange={onRouteChange} loadUser={loadUser}/>
          : <Register onRouteChange={onRouteChange} loadUser = {loadUser} />



        
      )}



      
      <ParticlesBg type="circle" bg={true} />
    </div>
  );

  }

  export default App;
