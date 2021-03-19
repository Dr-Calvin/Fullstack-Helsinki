import React, { useState } from "react";

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const Message = ({ text }) => {
  return (
    <div>
      <p className="anecdote">{text}</p>
      <style>{`.anecdote{height: 60px}`}</style>
    </div>
  );
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
  ];
  const [anNum, setAnNum] = useState(0);
  const shuffleMessage = () => {
    let ranNum = Math.floor(Math.random() * anecdotes.length);
    if (ranNum !== anNum) setAnNum(ranNum);
    else setAnNum(anNum + 1);
  };
  const initialScore = new Array(anecdotes.length).fill(0)
  const [points, updatePoints] = useState(initialScore)
  const addPoint = () => {
    let copy = [...points]
    copy[anNum] +=1
    updatePoints(copy)
  }
  // console.log(points)
  return (
    <div className="App">
      <Message text={anecdotes[anNum]} />
      <Message text={"has " + points[anNum] + " points"} />
      <Button handleClick={addPoint} text="Vote" />
      <Button handleClick={shuffleMessage} text="Next Anecdote" />
    </div>
  );
};

export default App;
