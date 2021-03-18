import React, { useState } from "react";

const Header = ({ text }) => <h1>{text}</h1>;

const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>
const Statistic = ({property, count}) => <p>{property} {count}</p>

const App = () => {
  const formName = "Give Feedback";
  const sectionTitle = "Statistics";
  
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const increaseGoodByOne = () => setGood(good + 1);
  const increaseBadByOne = () => setBad(bad + 1);
  const increaseNeutralByOne = () => setNeutral(neutral + 1);
  let sum = good + neutral + bad
  let positive = good / sum
  let average = (good - bad)/sum

  return (
    <div className="App">
      <Header text={formName} />
      <Button handleClick={increaseGoodByOne} text="good"/>
      <Button handleClick={increaseNeutralByOne} text="neutral"/>
      <Button handleClick={increaseBadByOne} text="bad"/>
      <Header text={sectionTitle} />
      <Statistic property="good" count={good} />
      <Statistic property="neutral" count={neutral} />
      <Statistic property="bad" count={bad} />
      <Statistic property="all" count={sum} />
      <Statistic property="average" count={average} />
      <Statistic property="positive" count={positive*100 + "%"} />
    </div>
  );
};

export default App;
