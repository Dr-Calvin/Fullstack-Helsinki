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
    console.log(props),
    <div>
      <Part part={props.p1[0]} ex={props.p1[1]} />
      <Part part={props.p2[0]} ex={props.p2[1]} />
      <Part part={props.p3[0]} ex={props.p3[1]} />
    </div>
  );
};
const Total = (props) => {
  return <p>Number of exercises {props.sum}</p>;
};

const App = () => {
  const course = "Half Stack application development";
  const part1 = {
    name: "Fundamentals of React",
    exercises: 10,
  };
  const part2 = {
    name: "Using props to pass data",
    exercises: 7,
  };
  const part3 = {
    name: "State of a component",
    exercises: 14,
  };


  return (
    <div>
      <Header course={course} />
      <Content
        p1={[part1.name, part1.exercises]}
        p2={[part2.name, part2.exercises]}
        p3={[part3.name, part3.exercises]}
      />
      <Total sum={part1.exercises + part2.exercises + part3.exercises} />
    </div>
  );
};

export default App;
