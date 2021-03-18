import React, { useState } from "react";

const Header = ({ text }) => <h1>{text}</h1>;

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);
const Statistic = ({ text, count }) => (
  <table>
    <tbody>
      <tr>
        <td>{text}</td>
        <td>{count}</td>
        <style>{`td {width:200px;}`}</style>
      </tr>
    </tbody>
  </table>
);
const Statistics = ({ good, neutral, bad, altText = "No feedback given" }) => {
  let sum = good + neutral + bad;
  let positive = good / sum;
  let average = (good - bad) / sum;
  return sum > 0 ? (
    <div>
      <Statistic text="good" count={good} />
      <Statistic text="neutral" count={neutral} />
      <Statistic text="bad" count={bad} />
      <Statistic text="all" count={sum} />
      <Statistic text="average" count={average} />
      <Statistic text="positive" count={positive * 100 + "%"} />{" "}
    </div>
  ) : (
    <div>
      <p>{altText}</p>
    </div>
  );
};

const App = () => {
  const formName = "Give Feedback";
  const sectionTitle = "Statistics";

  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const increaseGoodByOne = () => setGood(good + 1);
  const increaseBadByOne = () => setBad(bad + 1);
  const increaseNeutralByOne = () => setNeutral(neutral + 1);

  return (
    <div className="App">
      <Header text={formName} />
      <Button handleClick={increaseGoodByOne} text="good" />
      <Button handleClick={increaseNeutralByOne} text="neutral" />
      <Button handleClick={increaseBadByOne} text="bad" />
      <Header text={sectionTitle} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
