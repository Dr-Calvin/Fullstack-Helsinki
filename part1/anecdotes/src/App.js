import React, { useState } from "react";

const Anecdote = ({ anecdote, votes }) => {
  return (
    <div>
      <p className="anecdote">{anecdote}</p>
      <style>{`.anecdote{min-height: 30px}`}</style>
      <p>has {votes} votes</p>
    </div>
  );
};

const Popular = ({ sourceMaterial, stats }) => {
  const mostPopular = Math.max(...stats);
  return (
    <div>
      <Anecdote
        anecdote={sourceMaterial[stats.indexOf(mostPopular)]}
        votes={mostPopular}
      />
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
    let ranNum = anNum;
    while (ranNum === anNum)
      ranNum = Math.floor(Math.random() * anecdotes.length);
    setAnNum(ranNum);
  };
  const initialScore = new Array(anecdotes.length).fill(0);
  const [points, updatePoints] = useState(initialScore);
  const addPoint = () => {
    let copy = [...points];
    copy[anNum] += 1;
    updatePoints(copy);
  };

  return (
    <div className="App">
      <h1>Anecdote of the day</h1>
      <Anecdote anecdote={anecdotes[anNum]} votes={points[anNum]} />
      <button onClick={addPoint}>Vote</button>
      <button onClick={shuffleMessage} >Next Anecdote</button>
      <h1>Anecdote with the most votes</h1>
      <Popular sourceMaterial={anecdotes} stats={points} />
    </div>
  );
};

export default App;
