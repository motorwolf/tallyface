import React from 'react';
import './Input.css';
import Button from '../Button/Button.js';

const input = (props) => {
  let defaultValue = 0; 
  return (
    <label>
      {props.question}
      <Button className="count" type="dec" pressCalc={props.calc}>
        -</Button>
      <input className="surveyVal" type="text" 
        onInput={(e) => {
        if(isNaN(e.target.value)){
          console.log("This is not a number.");
          e.target.value = 1;
        }
        else{
          e.target.value = Math.ceil(e.target.value);
           if(e.target.value > 5){
              console.log("Too much");
              e.target.value = 5;
           }
           if(e.target.value < 1){
             console.log("Too few");
            e.target.value = 1;
           }
        }
          {props.calc()}
      }
        }
      /><Button className="count" type="inc" pressCalc={props.calc}>+</Button>
    </label>
  );

  }

export default input;
