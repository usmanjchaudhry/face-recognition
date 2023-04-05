import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageURL, box }) => {
  const { topRow = 0, rightCol = 0, bottomRow = 0, leftCol = 0 } = box || {};
  
  const boundingBoxStyle = {
    top: `${topRow}px`,
    right: `${rightCol}px`,
    bottom: `${bottomRow}px`,
    left: `${leftCol}px`,
  };
  
  return (
    <div className="center ma">
      <div className="absolute mt2">
        <img id="inputImage" src={imageURL} width="500px" height="auto" alt="input" />
        <div className="bounding-box" style={boundingBoxStyle}></div>
      </div>
    </div>
  );
};

export default FaceRecognition;
