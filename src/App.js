import React, { Component } from 'react';
import './App.css';
import Input from './components/UI/Input/Input.js';

  const moodKey = {
    1: 'miserable',
    2: 'sad',
    3: 'neutral',
    4: 'happy',
    5: 'ecstatic'
  }
class App extends Component {
  state = {
    tally: 0,
    mood: 'neutral'
  };
  
  calculator = () => {
    // calculates all of the fields to determine overall 'mood'
    let surveyValues = document.getElementsByClassName("surveyVal");
    let newTotal = 0;
    let validFields = 0;
    // this counter ensures that only fields with values will be factored in the overall score.
    for(let field in surveyValues){
      if(surveyValues[field].value){
        validFields++;
        newTotal += parseInt(surveyValues[field].value);
      }
    }
    let moodValue = Math.floor(newTotal/validFields);
    this.setState({
      tally: newTotal,
      mood: moodKey[moodValue]
    })
  }

  render() {
    return (
      <div className="App">
        <header>
          <h1>SATISFACTION SURVEY</h1>
          <p>How did we do? Please rate on a scale of 1-5.</p>
        </header>
        <div className="subheader">
              <h3>CURRENT SCORE : {this.state.tally}</h3>
              <h3>CURRENT MOOD : {this.state.mood}</h3>
              <img src="https://picsum.photos/200/200"/>
        </div>
        <main>
          <h2> SERVICE </h2>
          <Input question="How friendly was your server?" calc={this.calculator} section="service"/>
          <Input question="How quickly was your order served?" calc={this.calculator} section="service"/>
          <Input question="How knowledgeable was your server?" calc={this.calculator} section="service"/>
          <h2> FOOD </h2>
          <Input question="How was the quality of your meal?" calc={this.calculator} section="food"/>
          <Input question="How was the appearance of your food?" calc={this.calculator} section="food"/>
          <Input question="How was the flavor of your food?" calc={this.calculator} section="food"/>
          <h2> SETTING </h2>
          <Input question="How clean was the dining room?" calc={this.calculator}section="setting"/>
            <Input question="How comfortable was your seating?" calc={this.calculator} section="setting"/>
            <Input question="How was the ambiance of the dining room?" calc={this.calculator} section="setting"/>
          <textarea></textarea>
        </main>
        <footer>
          WHAT'S THE DAMAGE?
          <button>CLICKY,CLICKY</button>
          <div id="resultsBox">
            This is where the results will go.
          </div>
        </footer>
      </div>
      );
  }
}

export default App;
