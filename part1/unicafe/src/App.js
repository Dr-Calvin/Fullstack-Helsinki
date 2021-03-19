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

const Message = ({text}) => {
  return <div><p>{text}</p></div>
}

const App = () => {
  const formName = "Give Feedback";
  const sectionTitle = "Statistics";

  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const increaseGoodByOne = () => setGood(good + 1);
  const increaseBadByOne = () => setBad(bad + 1);
  const increaseNeutralByOne = () => setNeutral(neutral + 1);
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
  ];
  const [anNum, setAnNum] = useState(0);
  const shuffleMessage = () => setAnNum(Math.floor(Math.random() * Math.floor(anecdotes.length)));

  return (
    <div className="App">
      <Message text={anecdotes[anNum]} />
      <Button handleClick={shuffleMessage} text="Next Anecdote" />
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
