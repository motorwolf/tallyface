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
const questions = {
  service: ['How friendly was your server?','How quickly was your order served?', 'How knowledgeable was your server?'],
  food: ['How was the quality of your meal?','How was the appearance of your food?', 'How was the flavor of your food?'],
  setting: ['How clean was the dining room?',"How comfortable was your seating?","How was the ambiance of the dining room?"]
};

class App extends Component {
  state = {
    tally: 0,
    mood: 'neutral'
  };
  
  questionCategoryOutput = () => {
  let jsxy = [];
  for(let category in questions){
    jsxy.push(<h2> {category.toUpperCase()} </h2>);
    jsxy.push(questions[category].map((q,i) => {
    return <Input question={q} calc={this.calculator} section={category} key={category + (i+1)} name={category + (i+1)}/>;
  }));
  }
  return jsxy;
  }


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

  getMood = (currentMood) => {
    return `./assets/${currentMood}.PNG`;
  }
  
  render() {
    return (
      <div className="App">
        <header>
          <div>
          <h1>SATISFACTION SURVEY</h1>
          <p>Please rate on a scale of 1-5.</p>
        </div>
        </header>
        <div id="subheader">
            <div className="score">
            <h3>SCORE : {this.state.tally}</h3>
            <h3>MOOD : {this.state.mood}</h3>
        </div>
        <div id="floatingHead"><img src={require(`./assets/${this.state.mood}.PNG`)}/></div>
        </div>
        <main>
          {this.questionCategoryOutput()}
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
