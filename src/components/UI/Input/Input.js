import React from 'react';
import './Input.css';
import Button from '../Button/Button.js';

const input = (props) => {
  return (
    <div className="questionBlock">
    <label htmlFor={props.name}>
      {props.question}
    </label>
      <Button className="count" type="dec" pressCalc={props.calc}>
        -</Button>
      <input className={"surveyVal " + props.section + " "} type="text" name={props.name} 
        onChange={(e) => {
          if(e.target.className.indexOf("problem") !== -1){
            const newClassName = e.target.className.split(" ").filter(cla => {
              if(cla !== "problem"){
                return cla;
              } else {
                return null;
              }
            }).join(" ");
            e.target.className = newClassName;
          };
        if(isNaN(e.target.value)){
          console.log("This is not a number.");
          e.target.value = 1;
        }
        else{
          e.target.value = Math.ceil(e.target.value);
          if(e.target.value > 9){
            //if user tries to manually change the value, it was computing it as too much, so I took the computed value, changed to string, and then split it to get the entered value. the entered value is now subjected to the same tests and.
            e.target.value = e.target.value.toString().split("")[1];
          }
          if(e.target.value > 5){
            e.target.value = 5;
          }
          if(e.target.value < 1){
              e.target.value = 1;
            }
        }
          props.calc();
      }
        }
      /><Button className="count" type="inc" pressCalc={props.calc}>+</Button>
  </div>
  );

  }

export default input;
