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
  validator = () => {
    let surveyValues = document.getElementsByClassName("surveyVal");
    let validated = true;
     for(let value in surveyValues){
       if(!surveyValues[value].value && surveyValues[value].tagName === 'INPUT'){
         surveyValues[value].className += " problem";
        let resultText = document.getElementById("resultText");
         resultText.textContent ="Oops, you may have missed a few fields. To calculate the results, fill in the missing data.";
         validated = false;
       }
     }
    if(validated){
      this.results();
    }
  }

results = () => {
    let statement = "";
    let categoryStatement = "";
    let score = this.state.tally;
    let mood = this.state.mood;
    let categoryScores = Object.keys(questions)
    .map(cat => {
      return [this.htmlElementValueExtractor(document.getElementsByClassName(cat),true),cat];
    })
    .sort((a,b) => {return b[0] - a[0]});
    
    const valuesTheSame = categoryScores.every((scoreArr,_,a) => scoreArr[0] === a[0][0]);
    if(valuesTheSame){
       categoryStatement = "We did equally well on all categories."
      } else {
      if(categoryScores[0][0] === categoryScores[1][0]){
         categoryStatement = `Our top two categories were ${categoryScores[0][1]} and ${categoryScores[1][1]}.`;
      }
      else {
         categoryStatement = `Our top category was ${categoryScores[0][1]}.`
      }
      if(categoryScores[categoryScores.length-1][0] === categoryScores[categoryScores.length-2][0]){
         categoryStatement += ` Our two worst categories were ${categoryScores[categoryScores.length-1][1]} and ${categoryScores[categoryScores.length-2][1]}`;
      }
      else {
         categoryStatement += ` Our worst category was ${categoryScores[categoryScores.length-1][1]}.`;
      }
    }
    
    switch(mood){
       case "ecstatic":
        statement = "It looks like we did an outstanding job. We are extremely pleased.";
        break;
      case "happy":
        statement = "It looks like we did an excellent job. We will try to keep it up!";
        break;
      case "neutral":
        statement = "It looks like we did a satisfactory job. We will try to do even better next time.";
        break;
      case "sad":
        statement = "Uh oh. It looks like we didn't do a good job this time. We will take your notes and work on them as best we can to improve for next time.";
        break;
      case "miserable":
        statement = "Oh no! We really dropped the ball this time. We will take your suggestions and do our best to make a complete turn around.";
        break;
      default:
        break;
    }
    let resultHTML = document.getElementById("resultText");
    resultHTML.innerHTML = `<p>${statement}</p> <p>${categoryStatement}</p>`
  }
  htmlElementValueExtractor = (htmlEl,avg) => {
    let total = 0;
    let numberOfQuestions = 0;
    for(let field in htmlEl){
       if(htmlEl[field].value && htmlEl[field].tagName === "INPUT"){
         total += parseInt(htmlEl[field].value);
         numberOfQuestions++;
       }
    }
    return avg ? Math.round(total/numberOfQuestions) : total;
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
    });
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
        <div id="floatingHead"><img src={require(`./assets/${this.state.mood}.PNG`)} alt={this.state.mood + " face"} /></div>
        </div>
        <main>
          {this.questionCategoryOutput()}
        </main>
        <footer>
          <p>
          WHAT'S THE DAMAGE?
          </p>
          <button id="results" onClick={() => this.validator()}>GET RESULTS</button>
          <div id="resultsBox">
            <p id="resultText">
            </p>
          </div>
        </footer>
      </div>
      );
  }
}

export default App;
