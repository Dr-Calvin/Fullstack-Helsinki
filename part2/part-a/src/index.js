import React from "react";
import ReactDOM from "react-dom";

const Header = ({ course }) => {
  return <h1>{course.name}</h1>;
};

const Total = ({ course }) => {
  const sum = course.parts.reduce((currentTotal, c) =>currentTotal += c.exercises,0);
  return (
    <div>
      <strong>Total of {sum} exercises</strong>
    </div>
  );
};

const Part = ({ name, count }) => {
  return (
    <p>
      {name} {count}
    </p>
  );
};

const Content = ({ course }) => {
  return (
    <div>
      {course.parts.map((c) => (
        <Part key={c.id} name={c.name} count={c.exercises} />
      ))}
    </div>
  );
};

const App = () => {
  const course = {
    id: 1,
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
        id: 1,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
        id: 2,
      },
      {
        name: "State of a component",
        exercises: 14,
        id: 3,
      },
      {
        name: "Redux",
        exercises: 11,
        id: 4,
      },
    ],
  };

  return <Course course={course} />;
};

const Course = ({ course }) => (
  <div>
    <Header course={course} />
    <Content course={course} />
    <Total course={course} />
  </div>
);

ReactDOM.render(<App />, document.getElementById("root"));
