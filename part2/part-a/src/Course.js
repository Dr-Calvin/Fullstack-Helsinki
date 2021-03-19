import React from "react";

const Header = ({ course }) => {
  return <h1>{course.name}</h1>;
};

const Total = ({ course }) => {
  const sum = course.parts.reduce(
    (currentTotal, c) => (currentTotal += c.exercises),
    0
  );
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

const Course = ({ course }) => (
  <div>
    <Header course={course} />
    <Content course={course} />
    <Total course={course} />
  </div>
);

export default Course;
