import React from "react";

const Header = (props) => {
  return <h1>{props.course}</h1>;
};
const Part = (props) => {
  return (
    <p>
      {props.part} {props.ex}
    </p>
  );
};
const Content = (props) => {
  return (
    <div>
      <Part part={props.p1} ex={props.e1} />
      <Part part={props.p2} ex={props.e2} />
      <Part part={props.p3} ex={props.e3} />
    </div>
  );
};
const Total = (props) => {
  return <p>Number of exercises {props.sum}</p>;
};

const App = () => {
  const course = "Half Stack application development";
  const part1 = "Fundamentals of React";
  const exercises1 = 10;
  const part2 = "Using props to pass data";
  const exercises2 = 7;
  const part3 = "State of a component";
  const exercises3 = 14;

  return (
    <div>
      <Header course={course} />
      <Content
        p1={part1}
        e1={exercises1}
        p2={part2}
        e2={exercises2}
        p3={part3}
        e3={exercises3}
      />
      <Total sum={exercises1 + exercises2 + exercises3} />
    </div>
  );
};

export default App;
