import React from 'react';

export const Controls = ({titleID, titleValue, buttonDown, onClick, lengthID, breakLength, buttonUp}) => (
  <div className='control-container'>
    <h1 id={titleID}>
      {titleValue}</h1>
    <h1 id={lengthID}>
      {breakLength} minutes</h1>
    <button id={buttonUp} onClick={onClick} value='+'>
      <i className="fa fa-angle-up fa-2x" value='+'/></button>
    <button id={buttonDown} onClick={onClick} value='-'>
      <i className="fa fa-angle-down fa-2x"/></button>
  </div>
)
