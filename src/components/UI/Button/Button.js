import React from 'react';
import './Button.css';

const button = (props) => {
  return (
    <button className={props.className + " " + props.type} 
      onClick={(e) => {
        let newValue = e.target.parentNode.children[2].value;
        if(newValue === undefined){
          newValue = 0;
        }
        props.type === 'dec' ? newValue-- : newValue++;
          if(newValue > 5){
            newValue = 5;
          }
          if(newValue < 1){
            newValue = 1;
          }
          e.target.parentNode.children[2].value = newValue; 
        props.pressCalc();
        }}>
      {props.children}
    </button>
  );
}

export default button;
