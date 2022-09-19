import Header from "./Header";
import Content from "./Content";
import Total from "./Total";

const App = () => {
  const course = 'Half Stack application development'
  
  const courseProgram = {
    part1: 'Fundamentals of React',
    part2: 'Using props to pass data',
    part3: 'State of a component',
    exercises1: 10,
    exercises2: 7,
    exercises3: 14
  }

  return (
    <div>
      <Header course={course} />
      <Content program={courseProgram} />
      <Total total={courseProgram.exercises1 + courseProgram.exercises2 + courseProgram.exercises3} />
    </div>
  )
}

export default App;
